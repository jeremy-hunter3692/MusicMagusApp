import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'
import DisplayCardsGrid from './DisplayCardsGrid'
import CardButton from './CardButton'
import { intervals } from './data/Intervals'
import QuestionButtons from './QuestionButtons.js'
import DronePlayer from './DronePlayer.js'
import NotePlayer from './SingleNotePlayer.js'
import { noteNames } from './data/NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
  getAnswerKeys,
  getAltOctaveNotes,
  getIdxAndNotes,
  getIntervalCardsAsNotes,
} from './functions/functions'

const blankCard = require('./assets/blankcard.png')
let questionType = 'Interval'
let answer = ''
let answerReTrig = false
const Question = ({ windowSize }) => {
  ///TO DOO write a funciton for checking questionType. Using it a lot
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [droneOn, setDroneOn] = useState(true)
  const [droneReload, setDroneReload] = useState(false)
  const [questionNote, setQuestionNote] = useState(
    returnRandomCard(intervals, true)
  )
  const [cardsArray, setCardsArray] = useState(noteNames)
  const [resultDisplay, setResultDisplay] = useState(false)
  const [reTrigAnsCard, setReTrigAnsCard] = useState(false)
  //can't be the best way to do this \/

  // console.log('q red render:', autoPlay)
  answer =
    questionType === 'Interval'
      ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
      : questionType === 'Note'
      ? getCorrectAnswer(randomRoot, questionNote)
      : getAnswerKeys(randomRoot, questionNote, keys)

  const { height: h, width: w, scale, fontScale } = windowSize

  function userAnswerSetter(inpt) {
    setResultDisplay(inpt === answer.name)
  }

  function returnQuestionNoteWithoutRoot(randomRootVar) {
    let result
    do {
      result = returnRandomCard(noteNames)
    } while (result.value.name === randomRootVar.value.name)
    return result
  }

  function reload() {
    //This isn't right figure out reload replacement
    answerReTrig = !answerReTrig
    setDroneReload((prev) => !prev)
    setResultDisplay(false)
    // setDroneOn(false)
    let randomRootVar =
      questionType === 'Key'
        ? returnRandomCard(noteNames)
        : returnRandomCard(keys)
    setRandomRoot(randomRootVar)

    setQuestionNote(
      questionType === 'Interval'
        ? returnRandomCard(intervals, true)
        : questionType === 'Note'
        ? returnQuestionNoteWithoutRoot(randomRootVar)
        : returnRandomCard(intervals, true)
    )

    setCardsArray(
      questionType === 'Interval'
        ? noteNames
        : questionType === 'Note'
        ? intervals
        : keys
    )
    // startDrone(randomRoot.value.audioSrc)
  }

  function changeQuestionType(inpt) {
    questionType = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    reload()
  }

  function cardOnPress(note) {
    // REWORK for key question
    let fixedNote =
      questionType === 'Note' ? getIntervalCardsAsNotes(note, randomRoot) : note
    fixedNote = getAltOctaveNotes(fixedNote, randomRoot)
    return fixedNote
  }

  function answerCardOnPress(note) {
    console.log('answer card', note)
    let answerIdx = getIdxAndNotes(note)
    let questionIdx = randomRoot.idx
    let targetNote =
      answerIdx[1] > questionIdx
        ? answerIdx[0].audioSrc['1']
        : answerIdx[0].audioSrc['2']
    return targetNote
  }

  function rootCardPress() {
    droneOn ? setDroneOn(false) : setDroneOn(true)
  }

  const questionCards = {
    height: w * 0.33,
    width: w * 0.33,
  }

  return (
    <>
      <DronePlayer
        rootValue={randomRoot.value.audioSrc}
        dronePlaying={droneOn}
        reload={droneReload}
      />
      <View style={styles.qCardsAndButtons}>
        <View style={styles.questionCardsCont}>
          <CardButton
            data={randomRoot}
            source={randomRoot?.value.imgSrc}
            style={questionCards}
            onPress={rootCardPress}
          />

          <CardButton
            data={answer}
            source={questionNote?.value.imgSrc}
            style={questionCards}
            onPress={answerCardOnPress}
            autoPlay={true}
            reTrig={answerReTrig}
          />
          {resultDisplay ? (
            <CardButton
              data={answer?.name}
              source={answer?.imgSrc}
              style={questionCards}
            />
          ) : (
            <CardButton source={blankCard} style={questionCards} />
          )}
        </View>
        <View style={styles.questionButtons}>
          <QuestionButtons
            reload={reload}
            changeQuestionType={changeQuestionType}
            stopDrone={() => setDroneOn(false)}
          />
        </View>
      </View>
      <View style={styles.answerCards}>
        <DisplayCardsGrid
          cardOnPress={cardOnPress}
          userAnswerSetter={userAnswerSetter}
          cardsArray={cardsArray}
          answer={answer}
        />
      </View>
      <Text style={styles.answer}>
        {resultDisplay ? 'CORRECT!' : 'Less correct'}
      </Text>
    </>
  )
}

export default Question

const styles = StyleSheet.create({
  qCardsAndButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  questionCardsCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 0,
    marginRight: 0,
    padding: 0,
  },
  questionButtons: {
    alignItems: 'center',
    marginTop: 50,
    padding: 2,
  },

  answerCards: {
    flex: 4,
  },
  answer: {
    textAlign: 'center',
    flex: 1,
    color: 'white',
    backgroundColor: 'black',
  },
})
