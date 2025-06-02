import React, { useContext, useState, useEffect, use } from 'react'
import { keys } from '../data/KeyCards.js'
import { noteNames } from '../data/NoteCards.js'
import { SynthDrones, DoubleBassDrones } from '../data/DroneAudioSources.js'
import {
  getIntervalCardsAsNotes,
  getAltOctaveNotes,
  findNoteEquivalentInGivenArray,
  cardReducer,
  returnAnswerType,
  returnRandomCard,
} from '../functions/functions.js'

const GameContext = React.createContext({})
const GameUpdateContext = React.createContext({})
const scoreCirclesInit = Array(12).fill(null)
//Will need to be updated to be able to acess?
const newAnswerDelay = 1500
let isRandomisedQuestionSameType = false
let isRandomsedAllQuestionTypes = false
let isReloading = false
let questionNumber = 0
let attemptCount = 0
let userScore = 0
let globalQuestionTimeOutID
//Possibly in a options context?
let droneType = true

export function useGameContext() {
  return useContext(GameContext)
}

export function updateGameContext() {
  return useContext(GameUpdateContext)
}

export function GameContextProvider({ children }) {
  const [userAnswer, setUserAnswer] = useState(null)
  //questionType will refer to what the first card is
  const [questionType, setQuestionType] = useState('Key')
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)
  const [displayInputCardArray, setDisplayInputCardArray] = useState()
  const [scoreCircles, setScoreSircle] = useState(scoreCirclesInit)

  const [questionCards, setQuestionCards] = useState()
  const [abBool, setabBool] = useState(true)
  const [choosingKey, setChoosingKey] = useState(false)
  const [resultDisplay, setResultDisplay] = useState(false)
  const [scoreCardDisplay, setScoreCardDisplay] = useState(null)

  useEffect(() => {
    let cardsInit = loadNewQuestionCards(false, null, false, false)
    console.log('cardsInit', cardsInit)
    setQuestionCards(cardsInit)
  }, [])

  function loadNewQuestionCards(
    isRandomisedQuestionSameType,
    firstCardStart,
    abBool,
    isRandomAllQuestionTypes
  ) {
    let questionCardsReturnObj
    let newFirstCard =
      !firstCardStart | isRandomisedQuestionSameType
        ? returnRandomCard(keys)
        : firstCardStart

    if (newFirstCard?.idx === undefined) {
      let idx = keys.findIndex((x) => x.name === newFirstCard.name)
      newFirstCard = { value: newFirstCard, idx: idx }
    }

    let storeTempPrevCard = questionCards?.secondCard
      ? questionCards.secondCard
      : null

    let count = 0
    //TO DO CHECK OVER THIS Put this checkin in redcuer?
    if (storeTempPrevCard != null) {
      do {
        count++
        questionCardsReturnObj = isRandomAllQuestionTypes
          ? randomiseQuestion()
          : cardReducer(
              questionType,
              !abBool,
              isRandomisedQuestionSameType,
              newFirstCard
            )
      } while (
        storeTempPrevCard &&
        storeTempPrevCard.value.name ===
          questionCardsReturnObj.secondCardFromReducer.value.name &&
        count < 10
      )
      if (count > 10) {
        console.log('do loop going too long')
      }
    } else {
      questionCardsReturnObj = isRandomAllQuestionTypes
        ? randomiseQuestion()
        : cardReducer(
            questionType,
            !abBool,
            isRandomisedQuestionSameType,
            newFirstCard
          )
    }

    const { firstCardFromReducer, secondCardFromReducer, array, answerIdx } =
      questionCardsReturnObj
    getAndSetDroneAudioSource(firstCardFromReducer.value)
    setDisplayInputCardArray(array)
    return {
      firstCard: firstCardFromReducer,
      secondCard: secondCardFromReducer,
      answerCard: array[answerIdx],
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

  function getAndSetDroneAudioSource(card) {
    let droneAudioType = droneType ? DoubleBassDrones : SynthDrones
    //TO DO  double check what findNoteEquivalent is for and rename it better
    let source = findNoteEquivalentInGivenArray(card, droneAudioType)
    setDroneAudioSrc(source?.audioSrc)
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
        ? getIntervalCardsAsNotes(
            cardWithValueIn.value,
            questionCards.firstCard
          )
        : findNoteEquivalentInGivenArray(cardWithValueIn.value, noteAudioSrc)

    audioSrcIdx = getAltOctaveNotes(audioSrcIdx, questionCards.firstCard)
    return audioSrcIdx
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

  //TO DO CHECK THIS
  function randomiseQuestion() {
    let questionType = Math.floor(Math.random() * 3) + 1
    questionType =
      questionType === 0 ? 'Key' : questionType === 1 ? 'Key' : 'Interval'
    return cardReducer(questionType, abBool)
  }

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
    if (isReloading) {
      return
    } else {
      setUserAnswer(inpt)
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

  function selectDroneAudio() {
    droneType = !droneType
    getAndSetDroneAudioSource(questionCards.firstCard.value)
  }

  return (
    <GameContext.Provider
      value={{
        questionCards,
        userAnswer,
        questionType,
        droneAudioSrc,
        displayInputCardArray,
        scoreCircles,
        questionNumber,
        choosingKey,
        attemptCount,
      }}
    >
      <GameUpdateContext.Provider
        value={{ loadNewQuestionCards, userAnswerSetter, userInputCardPress }}
      >
        {children}
      </GameUpdateContext.Provider>
    </GameContext.Provider>
  )
}
