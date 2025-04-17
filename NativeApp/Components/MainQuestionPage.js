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

import {
  getIntervalCardsAsNotes,
  getAltOctaveNotes,
  findNoteEquivalent,
  cardReducer,
  returnAnswerType,
  returnScoreText,
} from '../functions/functions.js'

import { noteAudioSrc } from '../data/NotesAudiosSrc.js'

const stylesBool = false // true
const newAnswerDelay = 1500
const scoreCirclesSize = 10
const annotatedDisplayGridSizeChangeFactor = 0.4
const annotatedQCardsSizeChangeFactor = 1.2
const scoreCirclesInit = Array(12).fill(null)
let questionNumber = 10
let attemptCount = 0
let droneType = true
let userScore = 0
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
}) => {
  //questionType will refer to what the first card
  //TO DO go over all this state and cut down what we need/don't need
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
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  ///
  const { width, height } = useWindowDimensions()
  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5

  useEffect(() => {
    let questionCardsReturnObj = isRandom
      ? randomiseQuestion()
      : cardReducer(questionType, !abBool)
    const { firstCard, secondCard, array, answerIdx } = questionCardsReturnObj
    setUserAnswer(null)
    getAndSetDroneAudioSource(firstCard.value)
    setDisplayInputCardArray(array)
    setFirstCard(firstCard)
    setSecondCard(secondCard)
    setCorrectAnswer(array[answerIdx])
  }, [questionType, reloadBool, isRandom])

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
    //TO DO check these names and uses/RENAME them better
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
  function questionCardPress() {
    console.log('drone off not working pproperly yet')
    droneOnOff()
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

  function reload() {
    setReloadBool((x) => !x)
  }

  function nextQuestionReloadTimeOut(fastReload = false) {
    let delaySpeed = fastReload ? 200 : newAnswerDelay
    console.log({ delaySpeed })
    setDroneAudioSrc(null)
    isReloading = true
    let questionChangingTimeOut = setTimeout(() => {
      reload()
      isReloading = false
    }, delaySpeed)
    return questionChangingTimeOut
  }

  function gameOver() {
    setDroneAudioSrc(null)
    userScore = 0
    attemptCount = 0
    questionNumber = 0
    reload()
    setScoreSircle(scoreCirclesInit)
    setScoreDisplay(0)
  }

  return (
    <>
      <View
        style={{
          zIndex: 0,

          flexDirection: 'row-reverse',
          flex: 0.3,
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: secondaryColor,
        }}
      >
        <View
          style={{
            margin: 0,

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
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
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
              flex: 1,
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
        <View style={{ flex: 1 }}>
          {!isRandom ? (
            <QuestionIconButtons
              changeQuestionType={changeQuestionType}
              bgColor={secondaryColor}
              // annotated={annotatedCardDisplay}
            />
          ) : (
            <Text>Randomised Questions</Text>
          )}
        </View>
      </View>

      {droneAudioSrc ? (
        <DronePlayer
          rootValue={droneAudioSrc}
          dronePlaying={dronePlaying}
          reload={droneReload}
          style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
        />
      ) : (
        ''
      )}
      <View
        style={[styles.topRowCards, stylesBool && styles.topRowCardsBorder]}
      >
        {
          <View
            style={{
              width: cardWidth,
              height: cardHeight,
            }}
          ></View>
        }
        <View style={{ width: cardWidth, height: cardHeight }}>
          {!isRandom ? (
            <PickShape questionAB={questionAB} width={cardWidth} />
          ) : (
            ' '
          )}
        </View>
        {firstCard?.value && (
          <QuestionCards
            bgColor={bgColor}
            secondaryColor={secondaryColor}
            firstCard={firstCard}
            secondCard={secondCard}
            rootCardPress={questionCardPress}
            resultDisplay={userAnswer?.name === correctAnswer?.name}
            answerCardOnPress={answerCardOnPress}
            answer={correctAnswer}
            cardSize={{
              cardWidth: annotated
                ? cardWidth * annotatedQCardsSizeChangeFactor
                : cardWidth,
              cardHeight: annotated
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
      <View
        style={[
          styles.displayCardsGrid,
          stylesBool && styles.displayCardsGridBorder,
        ]}
      >
        {displayInputCardArray && (
          <DisplayCardsGrid
            cardSize={{
              cardWidth: annotated
                ? cardWidth * annotatedDisplayGridSizeChangeFactor
                : cardWidth,
              cardHeight: annotated
                ? cardHeight * annotatedDisplayGridSizeChangeFactor
                : cardHeight,
            }}
            stylesBool={stylesBool}
            cardsArray={displayInputCardArray}
            userAnswerSetter={userAnswerSetter}
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
  topRowCardsBorder: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: 'white',
    margin: 0,
    padding: 0,
  },
  questionCardsCont: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  questionCardsBorder: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'blue',
  },
  questionButtons: {
    flex: 1,
  },
  questionButtonsBorder: {
    backgroundColor: 'red',
    borderColor: 'yellow',
  },
  displayCardsGrid: {
    flex: 2,
    margin: 2,
    padding: 0,
  },
  displayCardsGridBorder: {
    borderWidth: 1,
    borderColor: 'white',
  },
})
