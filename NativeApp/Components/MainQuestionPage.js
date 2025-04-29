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
  isRandom,
  isAnimated,
  dimensions,
}) => {
  //questionType will refer to what the first card is
  //TO DO go over all this state and cut down what we need/don't need
  const { width, height } = dimensions
  const [firstCard, setFirstCard] = useState()
  const [secondCard, setSecondCard] = useState()
  const [displayInputCardArray, setDisplayInputCardArray] = useState()
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)
  const [abBool, setabBool] = useState(true)
  const [reloadBool, setReloadBool] = useState(false)
  const [questionType, setQuestionType] = useState('Key')
  const [correctAnswer, setCorrectAnswer] = useState()
  const [userAnswer, setUserAnswer] = useState()
  const [userScoreDisplay, setScoreDisplay] = useState(null)
  const [scoreCircles, setScoreSircle] = useState(scoreCirclesInit)
  const [choosingKey, setChoosingKey] = useState(false)
  const [fontScale, setFontScale] = useState(height / 50)
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  ///
  const scoreCirclesSize = height / 40
  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5

  useEffect(() => {
    // let questionCard = returnRandomCard(keys)
    // setFirstCard(questionCard)
    setQuestionCards(isRandomisedKey)
  }, [questionType, isRandom])
  console.log(
    'FC',
    firstCard?.value.name,
    'SC',
    secondCard?.value.name,
    'Scoredisplay',
    userScoreDisplay,
    attemptCount,
    userScore
  )

  function setQuestionCards(randomiseKey, firstCardStart) {
    // console.log('setQuestionCard', firstCardStart)
    if (!firstCardStart || isRandomisedKey) {
      let newFirstCard = returnRandomCard(keys)
      setFirstCard(newFirstCard)
      firstCardStart = newFirstCard
    }
    if (firstCardStart?.idx === undefined) {
      let idx = keys.findIndex((x) => x.name === firstCardStart.name)
      firstCardStart = { value: firstCardStart, idx: idx }
    }

    let tempPrevCard = secondCard
    let count = 0
    let questionCardsReturnObj

    do {
      count++
      questionCardsReturnObj = isRandom
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
    console.log(questionCardsReturnObj)
    setUserAnswer(null)
    getAndSetDroneAudioSource(firstCardFromReducer.value)
    setDisplayInputCardArray(array)
    setFirstCard(firstCardFromReducer)
    setSecondCard(secondCardFromReducer)
    setCorrectAnswer(array[answerIdx])
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
    getAndSetDroneAudioSource(firstCard.value)
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
    gameOver()
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
    let audioSrc = getIntervalCardsAsNotes(intervalCard, firstCard)
    return audioSrc
  }

  function answerCardOnPress() {
    let answer = getAudioSrcIdxFromCardReducer(correctAnswer)
    return answer
  }

  //TO DO Think this isn't needed?
  function droneReload() {
    console.log('make this funciton/check if I actually need it')
  }

  function questionCardPress(inpt) {
    // console.log('questionCardPress', inpt, annotatedDisplayGridSizeChangeFactor)
    
    setChoosingKey(true)
    setDroneAudioSrc(null)
    //check why annotated is changing these values and what is changing it back
    annotatedDisplayGridSizeChangeFactor = 0.9
    annotatedQCardsSizeChangeFactor = 0.9
    // console.log('2NDquestionCardPress', annotatedDisplayGridSizeChangeFactor)

    setDisplayInputCardArray(keys)
    // reload()
  }

  function userInputCardPress(inpt) {
    //betterway to get this idx?

    if (!choosingKey) {
      userAnswerSetter(inpt)
      return
    }
    setFirstCard(inpt)
    setQuestionCards(false, inpt)
    gameOver(inpt)
    setChoosingKey((x) => false)
  }

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
    if (isReloading) {
      return
    } else {
      const {
        incrementAttemptCount,
        incrementQuestionNo,
        shouldReload,
        whichCircle,
      } = returnAnswerType(inpt, correctAnswer, attemptCount)

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
        shouldReload && questionNumber < 12 ? nextQuestionReloadTimeOut() : null
      whichCircle ? userScore++ : ''
      if (questionNumber > 11) {
        setScoreDisplay(userScore)
        isReloading = true
      }
    }
  }

  function skipQuestion() {
    questionNumber++
    attemptCount = 0
    reload()
    if (questionNumber > 11) {
      setScoreDisplay(userScore)
      isReloading = true
    }
  }

  function reload(newFirstCard = firstCard) {
    setQuestionCards(isRandomisedKey, newFirstCard)
  }

  function nextQuestionReloadTimeOut(fastReload = false) {
    let delaySpeed = fastReload ? 200 : newAnswerDelay
    setDroneAudioSrc(null)
    isReloading = true
    let questionChangingTimeOut = setTimeout(() => {
      reload()
      isReloading = false
    }, delaySpeed)
    return questionChangingTimeOut
  }

  function gameOver(inpt = firstCard) {
    setDroneAudioSrc(null)
    userScore = 0
    attemptCount = 0
    questionNumber = 0
    inpt = isRandomisedKey ? returnRandomCard(keys) : inpt
    isReloading = false
    reload(inpt)
    setScoreSircle(scoreCirclesInit)
    setScoreDisplay(0)
  }

  function setRandom() {
    isRandomisedKey = true
    setChoosingKey(false)
    gameOver()
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
          zIndex: 0,
          flex: 0.3,
          padding: 0,
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          backgroundColor: secondaryColor,
          margin: groupedNavMargin,
        }}
      >
        <View
          style={{
            margin: groupedNavMargin,
            padding: 0,
            flex: 1,
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
              flex: 1,
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
                  width: 30,
                  height: 30,
                  borderRadius: 30,
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
              flex: 10,
              height: scoreCirclesSize,
              margin: groupedNavMargin,
              padding: 0,
              zIndex: 100,
              // borderColor: 'white',
              // borderWidth: 1,
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
              />
            )
          })}
        </View>
        <View
          style={{
            flex: 1,
            margin: groupedNavMargin,
            padding: 0,
          }}
        >
          {!isRandom ? (
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
        {firstCard?.value && (
          <QuestionCards
            bgColor={bgColor}
            secondaryColor={secondaryColor}
            fontScale={fontScale}
            firstCard={firstCard}
            secondCard={secondCard}
            rootCardPress={questionCardPress}
            resultDisplay={userAnswer?.name === correctAnswer?.name}
            answerCardOnPress={answerCardOnPress}
            answer={correctAnswer}
            cardSize={{
              cardWidth: annotated || choosingKey
                ? cardWidth * annotatedQCardsSizeChangeFactor
                : cardWidth,
              cardHeight: annotated || choosingKey
                ? cardHeight * annotatedQCardsSizeChangeFactor
                : cardHeight,
            }}
            annotated={annotated}
            setAnnotatedCard={setAnnotatedCard}
            isAnimated={isAnimated}
            displayScore={userScoreDisplay}
            score={userScore}
            newRound={gameOver}
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
            reDeal={firstCard}
            isAnimated={isAnimated}
          />
        )}
      </View>
    </>
  )
}

export default MainQuestionPage
