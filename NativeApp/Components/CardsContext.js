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
console.log('QNO', questionNumber)
//Possibly in a options context?
let droneType = true

export function useGameContext() {
  return useContext(GameContext)
}

export function updateGameContext() {
  return useContext(GameUpdateContext)
}

export function GameContextProvider({ children }) {
  //questionType will refer to what the first card is
  const [questionType, setQuestionType] = useState('Key')
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)
  const [displayInputCardArray, setDisplayInputCardArray] = useState()
  const [scoreCircles, setScoreCircles] = useState(scoreCirclesInit)
  const [questionCards, setQuestionCards] = useState({
    firstCard: null,
    secondCard: null,
    answerCard: null,
  })
  const [abBool, setabBool] = useState(true)
  const [choosingKey, setChoosingKey] = useState(false)
  const [showAnswerCard, setShowAnswerCard] = useState(false)
  const [scoreCardDisplay, setScoreCardDisplay] = useState(null)

  useEffect(() => {
    let cardsInit = loadNewQuestionCards(false, keys[0], false, false)
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
    setShowAnswerCard(true)
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
    setShowAnswerCard(false)
    let newQuestion = loadNewQuestionCards(
      isRandomisedQuestionSameType,
      newFirstCard
    )
    setQuestionCards(newQuestion)
  }

  function nextQuestionReloadTimeOut(fastReload = false) {
    console.log('next', questionNumber, scoreCircles)
    questionNumber++
    attemptCount = 0
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
    console.log('reset')
    inpt = isRandomisedQuestionSameType ? returnRandomCard(keys) : inpt
    userScore = 0
    attemptCount = 0
    questionNumber = 0
    setDroneAudioSrc(null)
    setScoreCardDisplay(0)
    setScoreCircles(scoreCirclesInit)

    reload(inpt)
    isReloading = false
  }

  function setRandomisedQuestionsSameType() {
    //TODO Change for randomised question?
    isRandomisedQuestionSameType = true
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
      // initCardSizeChanges()
      setDisplayInputCardArray((x) => [...intervals])
      setChoosingKey((x) => false)
    } else {
      setChoosingKey(true)
      setDroneAudioSrc(null)
      // choosingKeyCardSizes()
      setDisplayInputCardArray(keys)
    }
  }

  function userInputCardPress(inpt) {
    if (isReloading) {
      return
    } else {
      if (!choosingKey) {
        userAnswerSetter(inpt)
        console.log('if in userInpute')
        return
      }

      initCardSizeChanges()
      setQuestionCards((x) => ({ ...x, firstCard: inpt }))
      loadNewQuestionCards(false, inpt)
      isRandomisedKey = false
      resetForNewGame(inpt)
      setChoosingKey((x) => false)
    }
  }

  function userAnswerSetter(inpt) {
    if (inpt.value.name === questionCards?.answerCard.name) {
      setShowAnswerCard(true)
    }
    //could move this and cut out retunrAnswerType plus should reload?
    //TO DO fix cards having value or not value CHECK THIS fRIST IF ISSUES
    const { incrementAttemptCount, shouldReload, whichCircle } =
      returnAnswerType(inpt.value, questionCards.answerCard, attemptCount)
    const updatedArr = [...scoreCircles]
    whichCircle !== null ? (updatedArr[questionNumber] = whichCircle) : ''
    setScoreCircles((prevArry) => updatedArr)

    attemptCount = incrementAttemptCount ? ++attemptCount : 0
    globalQuestionTimeOutID =
      shouldReload && questionNumber < 12 ? nextQuestionReloadTimeOut() : null
    whichCircle ? userScore++ : ''
    checkForGameOver()
  }

  function selectDroneAudio() {
    droneType = !droneType
    getAndSetDroneAudioSource(questionCards.firstCard.value)
  }

  return (
    <GameContext.Provider
      value={{
        questionCards,
        questionType,
        droneAudioSrc,
        displayInputCardArray,
        scoreCircles,
        questionNumber,
        choosingKey,
        attemptCount,
        showAnswerCard,
        scoreCardDisplay,
        getAudioSrcIdxFromCardReducer,
      }}
    >
      <GameUpdateContext.Provider
        value={{
          loadNewQuestionCards,
          userAnswerSetter,
          userInputCardPress,
          questionCardPress,
          setRandomisedQuestionsSameType,
          skipQuestion,
          nextQuestionReloadTimeOut,
        }}
      >
        {children}
      </GameUpdateContext.Provider>
    </GameContext.Provider>
  )
}
