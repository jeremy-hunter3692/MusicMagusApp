import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
} from 'react-native'
import DronePlayer from './DronePlayer.js'
import QuestionCards from './QuestionCards.js'
import DisplayCardsGrid from './DisplayCardsGrid.js'
import QuestionIconButtons from './QuestionTypeIconButtons.js'
import PickShape from './PickShape.js'
import Circle from './Circle.js'
import { SynthDrones, DoubleBassDrones } from '../data/DroneAudioSources.js'
import { noteAudioSrc } from '../data/NotesAudiosSrc.js'
import {
  getIntervalCardsAsNotes,
  getAltOctaveNotes,
  findNoteEquivalent,
  cardReducer,
  returnAnswerType,
  returnRandomCard,
} from '../functions/functions.js'

import { keys } from '../data/KeyCards.js'

const newAnswerDelay = 1500
const groupedNavMargin = 0
const scoreCirclesInit = Array(12).fill(null)
let isRandomisedKey = false
let annotatedDisplayGridSizeChangeFactor = 0.5
let annotatedQCardsSizeChangeFactor = 1.2
let questionNumber = 0
let attemptCount = 0
let userScore = 0
let droneType = true

let isReloading = false
let globalQuestionTimeOutID

const MainQuestionPage = ({
  bgColor,
  secondaryColor,
  setShowOptions,
  setAnnotatedMode,
  setAnnotatedCard,
  annotatedCard,
  annotated,
  isRandomAllQuestionTypes,
  isAnimated,
  dimensions,
}) => {
  //questionType will refer to what the first card is
  //TO DO go over all this state and cut down what we need/don't need
  const { width, height } = dimensions
  // const [firstCard, setFirstCard] = useState()
  // const [secondCard, setSecondCard] = useState()
  // const [correctAnswer, setCorrectAnswer] = useState()
  const [questionCards, setQuestionCards] = useState({
    firstCard: null,
    secondCard: null,
    answerCard: null,
  })
  const [displayInputCardArray, setDisplayInputCardArray] = useState()
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)
  const [abBool, setabBool] = useState(true)
  const [reloadBool, setReloadBool] = useState(false)
  const [questionType, setQuestionType] = useState('Key')
  const [userAnswer, setUserAnswer] = useState()
  const [scoreCardDisplay, setScoreCardDisplay] = useState(null)
  const [scoreCircles, setScoreSircle] = useState(scoreCirclesInit)
  const [choosingKey, setChoosingKey] = useState(false)
  const [fontScale, setFontScale] = useState(height / 50)
  const [resultDisplay, setResultDisplay] = useState(false)
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(false)
  ///
  const scoreCirclesSize = height / 20
  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5
  // console.log('attmptCount', attemptCount, 'questionNumber', questionNumber)
  useEffect(() => {
    // let questionCard = returnRandomCard(keys)
    // setFirstCard(questionCard)
    loadNewQuestionCards(false, keys[0])
  }, [questionType, isRandomAllQuestionTypes])

  function loadNewQuestionCards(randomiseKey, firstCardStart) {
    // console.log('setQuestionCard', firstCardStart)
    if (!firstCardStart || isRandomisedKey) {
      let newFirstCard = returnRandomCard(keys)
      setQuestionCards((x) => ({ ...x, firstCard: newFirstCard }))
      firstCardStart = newFirstCard
    }
    if (firstCardStart?.idx === undefined) {
      let idx = keys.findIndex((x) => x.name === firstCardStart.name)
      firstCardStart = { value: firstCardStart, idx: idx }
    }

    let tempPrevCard = questionCards.secondCard
    let count = 0
    let questionCardsReturnObj

    do {
      count++
      questionCardsReturnObj = isRandomAllQuestionTypes
        ? randomiseQuestion()
        : cardReducer(questionType, !abBool, randomiseKey, firstCardStart)
    } while (
      (tempPrevCard != undefined &&
        tempPrevCard.value.name ===
          questionCardsReturnObj.secondCardFromReducer.value.name) ||
      count > 10
    )

    const { firstCardFromReducer, secondCardFromReducer, array, answerIdx } =
      questionCardsReturnObj
    setUserAnswer(null)
    getAndSetDroneAudioSource(firstCardFromReducer.value)
    setDisplayInputCardArray(array)
    setQuestionCards((x) => ({
      firstCard: firstCardFromReducer,
      secondCard: secondCardFromReducer,
      answerCard: array[answerIdx],
    }))
  }

  function changeQuestionType(inpt) {
    let type =
      inpt === 1
        ? 'Key'
        : inpt === 2
        ? 'Interval'
        : inpt === 3
        ? 'Note'
        : 'Random'
    setQuestionType(type)
  }

  function selectDroneAudio() {
    droneType = !droneType
    getAndSetDroneAudioSource(questionCards.firstCard.value)
  }

  function getAndSetDroneAudioSource(card) {
    let droneAudioType = droneType ? DoubleBassDrones : SynthDrones
    //TO DO  double check what findNoteEquivalent is for and rename it better
    let source = findNoteEquivalent(card, droneAudioType)
    setDroneAudioSrc(source?.audioSrc)
  }

  function droneOnOff() {
    dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
  }

  function questionAB(bool) {
    //TO DO clear timeout/question change here
    clearTimeout(globalQuestionTimeOutID)
    setabBool(bool)
    resetForNewGame()
    // reloadTimeOut(true)
  }

  //TO DO CHECK THIS
  function randomiseQuestion() {
    let questionType = Math.floor(Math.random() * 3) + 1
    questionType =
      questionType === 0 ? 'Key' : questionType === 1 ? 'Key' : 'Interval'
    return cardReducer(questionType, abBool)
  }

  function getAudioSrcIdxFromCardReducer(cardAny) {
    return
    //TO DO check these names and uses/RENAME them better
    if (choosingKey) {
      // console.log(choosingKey, 'getAudioSrcIdxFromCardReducer', cardAny)
      return
    }
    // console.log('getAudioSrcIdxFromCardReducer CONTINUED', choosingKey)
    let audioSrcIdx =
      questionType === 'Key'
        ? getAudioSrcInterval(cardAny)
        : findNoteEquivalent(cardAny, noteAudioSrc)
    audioSrcIdx = getAltOctaveNotes(audioSrcIdx, firstCard)
    return audioSrcIdx
  }

  function getAudioSrcInterval(intervalCard) {
    //TO DO check these names and uses/RENAME them better
    let audioSrc = getIntervalCardsAsNotes(
      intervalCard,
      questionCards.firstCard
    )
    return audioSrc
  }

  function answerCardOnPress() {
    let answer = getAudioSrcIdxFromCardReducer(questionCards.correctAnswer)
    return answer
  }

  //TO DO Think this isn't needed?
  function droneReload() {
    console.log('make this funciton/check if I actually need it')
  }

  function questionCardPress(inpt) {
    // console.log('questionCardPress', inpt, annotatedDisplayGridSizeChangeFactor)
    if (choosingKey) {
      annotatedDisplayGridSizeChangeFactor = 0.5
      annotatedQCardsSizeChangeFactor = 1.2
    }
    setChoosingKey(true)
    setDroneAudioSrc(null)
    annotatedDisplayGridSizeChangeFactor = 0.9
    annotatedQCardsSizeChangeFactor = 0.9

    setDisplayInputCardArray(keys)
    // reload()
  }

  function userInputCardPress(inpt) {
    if (!choosingKey) {
      userAnswerSetter(inpt)
      return
    }
    setQuestionCards((x) => ({ ...x, firstCard: inpt }))
    loadNewQuestionCards(false, inpt)
    resetForNewGame(inpt)
    setChoosingKey((x) => false)
  }

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
    if (isReloading) {
      return
    } else {
      console.log(inpt, questionCards.answerCard?.name)
      if (inpt.name === questionCards.answerCard?.name) {
        console.log('correct')
        setResultDisplay(true)
      }
      const {
        incrementAttemptCount,
        incrementQuestionNo,
        shouldReload,
        whichCircle,
      } = returnAnswerType(inpt, questionCards.answerCard, attemptCount)
      setScoreSircle((prevArry) => {
        const updatedArr = [...prevArry]
        if (whichCircle !== null) {
          updatedArr[questionNumber - 1] = whichCircle
        }
        return updatedArr
      })

      attemptCount = incrementAttemptCount ? ++attemptCount : 0
      incrementQuestionNo ? ++questionNumber : ''

      globalQuestionTimeOutID =
        shouldReload && questionNumber < 12
          ? nextQuestionReloadTimeOut(false)
          : null
      whichCircle ? userScore++ : ''
      checkForGameOver()
    }
  }

  function checkForGameOver() {
    if (questionNumber > 11) {
      setScoreCardDisplay(userScore)
      isReloading = true
      return true
    }
    return false
  }

  function skipQuestion() {
    questionNumber++
    attemptCount = 0
    reload()
    checkForGameOver() ? ' ' : reload()
  }

  function reload(newFirstCard = questionCards.firstCard) {
    console.log('reload', newFirstCard)
    loadNewQuestionCards(isRandomisedKey, newFirstCard)
  }

  function nextQuestionReloadTimeOut(fastReload = false) {
    console.log('should reload')

    let delaySpeed = fastReload ? 200 : newAnswerDelay
    setDroneAudioSrc(null)
    isReloading = true
    let questionChangingTimeOut = setTimeout(() => {
      reload()
      isReloading = false
    }, delaySpeed)
    return questionChangingTimeOut
  }

  function resetForNewGame(inpt = questionCards.firstCard) {
    setDroneAudioSrc(null)
    userScore = 0
    attemptCount = 0
    questionNumber = 0
    inpt = isRandomisedKey ? returnRandomCard(keys) : inpt
    isReloading = false
    reload(inpt)
    setScoreSircle(scoreCirclesInit)
    setScoreCardDisplay(0)
  }

  function setRandom() {
    isRandomisedKey = true
    setChoosingKey(false)
    resetForNewGame()
  }

  const styles = StyleSheet.create({
    scoreCircles: {
      margin: 0,
      fontWeight: 'bold',
      flex: 0.1,
      color: 'white',
      flexDirection: 'row',
      backgroundColor: '#19af59',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    topRowCards: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
      padding: 0,
    },
    questionCardsCont: {
      flexDirection: 'row',
      margin: 0,
      padding: 0,
    },
    displayCardsGrid: {
      flex: 2,
      margin: 2,
      padding: 0,
    },
    annotatedText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: fontScale,
    },
  })

  return (
    <>
      <View
        style={{
          flex: 0.3,
          padding: 0,
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          // alignItems: 'center',

          backgroundColor: secondaryColor,
          margin: groupedNavMargin,
        }}
      >
        <View
          style={{
            margin: groupedNavMargin,
            padding: 0,
            flex: 0.3,
            fontWeight: 'bold',
            color: 'white',
            flexDirection: 'row',
            backgroundColor: secondaryColor,
            justifyContent: 'flex-end',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <View
            style={{
              margin: groupedNavMargin,
              padding: 0,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              margin: groupedNavMargin,
            }}
          >
            {!annotatedCard ? (
              <Pressable onPress={() => setShowOptions()}>
                <Text style={styles.optionText}>Options </Text>
              </Pressable>
            ) : (
              ''
            )}
            <Pressable
              onPress={() => setAnnotatedMode()}
              style={[
                {},
                !annotatedCard && {
                  backgroundColor: 'white',
                  width: scoreCirclesSize,
                  height: scoreCirclesSize,
                  borderRadius: scoreCirclesSize,
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Text style={{ color: bgColor }}>?</Text>
            </Pressable>
          </View>
        </View>
        <View
          testID="scoreTempTest"
          style={[
            styles.scoreCircles,
            {
              backgroundColor: secondaryColor,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              margin: groupedNavMargin,
              padding: 0,
            },
          ]}
        >
          {scoreCircles.map((x, idx) => {
            let questionNo = idx === questionNumber ? true : false
            return (
              <Circle
                fillBool={x}
                scoreCircleRadius={scoreCirclesSize}
                key={idx}
                underLine={questionNo}
                circlesInsideColor={secondaryColor}
              />
            )
          })}
        </View>
        <View
          style={{
            flex: 0.3,
            margin: groupedNavMargin,
            padding: 0,
            justifyContent: 'center',
          }}
        >
          {!isRandomAllQuestionTypes ? (
            <QuestionIconButtons
              changeQuestionType={changeQuestionType}
              bgColor={secondaryColor}
              groupedNavMargin={groupedNavMargin}
              // annotated={annotatedCardDisplay}
            />
          ) : (
            <Text>Randomised Questions</Text>
          )}
        </View>
      </View>

      {droneAudioSrc && dronePlaying ? (
        <DronePlayer
          rootValue={droneAudioSrc}
          dronePlaying={dronePlaying}
          reload={droneReload}
          style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
        />
      ) : (
        ''
      )}
      {annotated && (
        <View
          style={{
            flex: 0.75,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <View>
            <Text style={styles.annotatedText}>
              ↑ Change question type here
            </Text>
          </View>
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.annotatedText}>Score tracker ↑</Text>
            <Text
              style={[
                styles.annotatedText,
                { fontStyle: 'italic', fontSize: fontScale },
              ]}
            >
              Full circle for a correct answer and a dot if you got it on your
              second go
            </Text>
          </View>
          <View>
            <Text style={styles.annotatedText}>Options here ↑ </Text>
          </View>
        </View>
      )}
      <View style={styles.topRowCards}>
        {!annotated && (
          <View
            style={{
              width: cardWidth,
              height: cardHeight,
              margin: 0,
              padding: 0,
            }}
          ></View>
        )}
        <View
          style={{
            width: cardWidth,
            height: cardHeight,
            margin: 0,
            padding: 0,
          }}
        ></View>

        {/* THIS HERE IS FOR THE AB BOOL VERSION <View
          style={{
            width: cardWidth,
            height: cardHeight,

            margin: 0,
          }}
        >
          {!isRandom ? (
            <PickShape questionAB={questionAB} width={cardWidth} />
          ) : (
            ' '
          )}
        </View> */}
        {questionCards?.firstCard?.value && (
          <QuestionCards
            bgColor={bgColor}
            secondaryColor={secondaryColor}
            fontScale={fontScale}
            // firstCard={firstCard}
            // secondCard={secondCard}
            // answer={correctAnswer}
            cards={questionCards}
            rootCardPress={questionCardPress}
            resultDisplay={resultDisplay}
            answerCardOnPress={answerCardOnPress}
            cardSize={{
              cardWidth:
                annotated || choosingKey
                  ? cardWidth * annotatedQCardsSizeChangeFactor
                  : cardWidth,
              cardHeight:
                annotated || choosingKey
                  ? cardHeight * annotatedQCardsSizeChangeFactor
                  : cardHeight,
            }}
            annotated={annotated}
            setAnnotatedCard={setAnnotatedCard}
            isAnimated={isAnimated}
            displayScore={scoreCardDisplay}
            score={userScore}
            newRound={resetForNewGame}
            skipQuestion={skipQuestion}
            skip={attemptCount > 2 ? true : false}
          />
        )}
      </View>
      <View style={styles.displayCardsGrid}>
        {(annotated || choosingKey) && (
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 3,
            }}
          >
            {!choosingKey ? (
              <Text style={styles.annotatedText}>
                Choose your answer from cards below ↓
              </Text>
            ) : (
              <Text style={styles.annotatedText}>
                Choose your key below ↓ or
                <Pressable onPress={() => setRandom()}>
                  <Text style={{ fontStyle: 'italic', fontSize: fontScale }}>
                    {' '}
                    Select Random
                  </Text>
                </Pressable>
              </Text>
            )}
          </View>
        )}

        {displayInputCardArray && (
          <DisplayCardsGrid
            cardSize={{
              cardWidth:
                annotated || choosingKey
                  ? cardWidth * annotatedDisplayGridSizeChangeFactor
                  : cardWidth,
              cardHeight:
                annotated || choosingKey
                  ? cardHeight * annotatedDisplayGridSizeChangeFactor
                  : cardHeight,
            }}
            stylesBool={false}
            cardsArray={displayInputCardArray}
            userAnswerSetter={userInputCardPress}
            findNoteFunction={getAudioSrcIdxFromCardReducer}
            reDeal={questionCards.firstCard}
            isAnimated={isAnimated}
          />
        )}
      </View>
    </>
  )
}

export default MainQuestionPage
