import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import DronePlayer from './DronePlayer.js'
import QuestionCards from './QuestionCards.js'
import DisplayCardsGrid from './DisplayCardsGrid.js'
import QuestionIconButtons from './QuestionTypeIconButtons.js'
import PickShape from './PickShape.js'
import Circle from './Circle.js'
import ThemeContext from './ThemeContext.js'
import AnnotatedContext from './AnnotatedContext.js'
import { SynthDrones, DoubleBassDrones } from '../data/DroneAudioSources.js'
import { noteAudioSrc } from '../data/NotesAudiosSrc.js'
import { keys } from '../data/KeyCards.js'
import { intervals } from '../data/IntervalCards.js'

import {
  getIntervalCardsAsNotes,
  getAltOctaveNotes,
  findNoteEquivalent,
  cardReducer,
  returnAnswerType,
  returnRandomCard,
  returnScaleCards,
  generateModesSemiToneIncrements,
} from '../functions/functions.js'

const newAnswerDelay = 1500
const groupedNavMargin = 0
const scoreCirclesInit = Array(12).fill(null)

let isRandomisedKey = false
let annotatedDisplayGridSizeChangeFactor = 0.5
let annotatedQCardsSizeChangeFactor = 1.2
//
let questionNumber = 0
let attemptCount = 0
let userScore = 0
let droneType = true
let isReloading = false
let globalQuestionTimeOutID

const MainGamePage = ({
  setShowOptions,
  isRandomAllQuestionTypes,
  isAnimated,
  dimensions,
  randomMagusMode,
}) => {
  ///////////////
  //questionType will refer to what the first card is
  //TO DO go over all this state and cut down what we need/don't need
  const { width, height } = dimensions
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
  const [resultDisplay, setResultDisplay] = useState(false)
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  ///
  const scoreCirclesSize = height / 20
  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5

  const { annotatedCard, annotated, setAnnotatedCard, setAnnotatedMode } =
    useContext(AnnotatedContext)
  const {
    theme,
    font: { fontScale, fontStyle },
  } = useContext(ThemeContext)

  useEffect(() => {
    // let questionCard = returnRandomCard(keys)
    // setFirstCard(questionCard)
    loadNewQuestionCards(false, keys[0])
    return () => {}
  }, [questionType, isRandomAllQuestionTypes])

  function loadNewQuestionCards(randomiseKey, firstCardStart) {
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
    //TO DO CHECK OVER THIS
    if (tempPrevCard != null) {
      do {
        count++
        questionCardsReturnObj = isRandomAllQuestionTypes
          ? randomiseQuestion()
          : cardReducer(questionType, !abBool, randomiseKey, firstCardStart)
      } while (
        tempPrevCard &&
        tempPrevCard.value.name ===
          questionCardsReturnObj.secondCardFromReducer.value.name &&
        count < 10
      )
      if (count > 10) {
        console.log('do loop going too long')
      }
    } else {
      questionCardsReturnObj = isRandomAllQuestionTypes
        ? randomiseQuestion()
        : cardReducer(questionType, !abBool, randomiseKey, firstCardStart)
    }

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

  function getAudioSrcIdxFromCardReducer(cardWithValueIn) {
    if (choosingKey) {
      return
    }
    cardWithValueIn = !cardWithValueIn.value
      ? { value: cardWithValueIn }
      : cardWithValueIn
    let audioSrcIdx =
      'distanceToRoot' in cardWithValueIn.value
        ? getAudioSrcInterval(cardWithValueIn.value)
        : findNoteEquivalent(cardWithValueIn.value, noteAudioSrc)

    audioSrcIdx = getAltOctaveNotes(audioSrcIdx, questionCards.firstCard)
    return audioSrcIdx
  }

  function getAudioSrcInterval(intervalCard) {
    let audioSrc = getIntervalCardsAsNotes(
      intervalCard,
      questionCards.firstCard
    )
    return audioSrc
  }

  //TO DO Think this isn't needed?
  function droneReload() {}

  function questionCardPress(inpt) {
    if (choosingKey) {
      initCardSizeChanges()
      setDisplayInputCardArray((x) => [...intervals])
      setChoosingKey((x) => false)
    } else {
      setChoosingKey(true)
      setDroneAudioSrc(null)
      choosingKeyCardSizes()
      setDisplayInputCardArray(keys)
    }
  }

  function userInputCardPress(inpt) {
    if (!choosingKey) {
      userAnswerSetter(inpt)
      return
    }
    initCardSizeChanges()
    setQuestionCards((x) => ({ ...x, firstCard: inpt }))
    loadNewQuestionCards(false, inpt)
    isRandomisedKey = false
    resetForNewGame(inpt)
    setChoosingKey((x) => false)
  }

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
    if (isReloading) {
      return
    } else {
      if (inpt.name === questionCards.answerCard?.name) {
        setResultDisplay(true)
      }
      const { incrementAttemptCount, shouldReload, whichCircle } =
        returnAnswerType(inpt, questionCards.answerCard, attemptCount)

      setScoreSircle((prevArry) => {
        const updatedArr = [...prevArry]
        if (whichCircle !== null) {
          updatedArr[questionNumber - 1] = whichCircle
        }

        return updatedArr
      })
      attemptCount = incrementAttemptCount ? ++attemptCount : 0
      globalQuestionTimeOutID =
        shouldReload && questionNumber < 12
          ? nextQuestionReloadTimeOut(false)
          : null
      whichCircle ? userScore++ : ''
      checkForGameOver()
    }
  }

  function initCardSizeChanges() {
    annotatedDisplayGridSizeChangeFactor = 0.5
    annotatedQCardsSizeChangeFactor = 1.2
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
    if (checkForGameOver()) {
      return
    }
    setResultDisplay(true)
    setTimeout(() => {
      attemptCount = 0
    }, newAnswerDelay)
    nextQuestionReloadTimeOut()
  }

  function reload(newFirstCard = questionCards.firstCard) {
    setResultDisplay(false)
    loadNewQuestionCards(isRandomisedKey, newFirstCard)
  }

  function nextQuestionReloadTimeOut(fastReload = false) {
    questionNumber++
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
    reload(inpt)
    isReloading = false
    setScoreSircle(scoreCirclesInit)
    setScoreCardDisplay(0)
  }

  function setRandom() {
    isRandomisedKey = true
    setChoosingKey(false)
    resetForNewGame()
  }

  function choosingKeyCardSizes() {
    annotatedDisplayGridSizeChangeFactor = 0.9
    annotatedQCardsSizeChangeFactor = 0.8
  }
  
  function annotatedButtonClick() {
    //TO DO double check this
    choosingKey && annotated ? choosingKeyCardSizes() : initCardSizeChanges()
    setAnnotatedMode()
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
      marginTop: 12,
      padding: 0,
    },
    emptyCardPlaceHolder: {
      width: cardWidth,
      height: cardHeight,
      margin: 0,
      padding: 0,
    },
    questionCardsCont: {
      flexDirection: 'row',
      margin: 0,
      padding: 0,
    },
    displayCardsGrid: {
      justifyContent: 'flex-end',
      flex: 2,
      margin: 2,
      padding: 0,
    },
    annotatedText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: fontScale,
    },
    choosingKeyText: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
    },
    chooseRandomText: randomMagusMode,
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
          backgroundColor: theme.secondaryColor,
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
                <Text style={styles.optionText}>Options {'  '}</Text>
              </Pressable>
            ) : (
              ''
            )}
            <Pressable
              onPress={() => annotatedButtonClick()}
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
              <Text style={{ color: theme.primaryColor }}>?</Text>
            </Pressable>
          </View>
        </View>
        <View
          testID="scoreTempTest"
          style={[
            styles.scoreCircles,
            {
              backgroundColor: theme.secondaryColor,
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
                circlesInsideColor={theme.secondaryColor}
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
              groupedNavMargin={groupedNavMargin}
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
            <Text style={[styles.annotatedText, { fontSize: fontScale * 0.8 }]}>
              Key Interval Note
            </Text>

            <Text style={styles.annotatedText}>
              ↑ Change question type here key Interval Note
            </Text>
          </View>
          <View
            style={{
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
            <Text style={styles.annotatedText}>↑ Options here </Text>
          </View>
        </View>
      )}
      <View style={styles.topRowCards}>
        {annotated && <View style={styles.emptyCardPlaceHolder}></View>}
        {/* <View style={styles.emptyCardPlaceHolder}></View> MAKE ABOVE NOTE ANNOTATED TO SHIFT QCARDS ACROSS  */}
        {/* THIS HERE IS FOR THE AB BOOL VERSION <View style={styles.emptyCardPlaceHolder}>
          {!isRandom ? (<PickShape questionAB={questionAB} width={cardWidth} /> ) : (null)}</View> */}
        {questionCards?.firstCard?.value && (
          <QuestionCards
            theme={theme}
            fontScale={fontScale}
            cards={questionCards}
            rootCardPress={questionCardPress}
            answerDisplay={resultDisplay}
            answerCardOnPress={getAudioSrcIdxFromCardReducer}
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
            isAnimated={isAnimated}
            displayScore={scoreCardDisplay}
            score={userScore}
            newRound={resetForNewGame}
            skipQuestion={skipQuestion}
            skip={attemptCount > 2 ? true : false}
          />
        )}
      </View>
      <View style={[styles.displayCardsGrid, annotated && { marginTop: 50 }]}>
        <View style={styles.choosingKeyText}>
          {choosingKey ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.annotatedText}>
                Choose your key below ↓ or{' '}
              </Text>
              <Pressable onPress={setRandom}>
                <Text style={styles.chooseRandomText}> Magus Mode</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.annotatedText}> </Text>
          )}
        </View>

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
            reDeal={questionCards?.firstCard}
            isAnimated={isAnimated}
            annotated={annotated}
          />
        )}
        {annotated && (
          <View style={styles.choosingKeyText}>
            <Text style={styles.annotatedText}>
              Choose your answer from these cards ↑
            </Text>
          </View>
        )}
      </View>
    </>
  )
}

export default MainGamePage
