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
} from './functions/functions'

const blankCard = require('./assets/blankcard.png')
let questionType = 'Interval'
let answer = ''

const Question = ({ windowSize }) => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [droneOn, setDroneOn] = useState(true)
  const [questionNote, setQuestionNote] = useState(
    returnRandomCard(intervals, true)
  )
  const [cardsArray, setCardsArray] = useState(noteNames)
  const [resultDisplay, setResultDisplay] = useState(false)

  console.log('q red render:', droneOn)
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
    // setDroneOn(true)
    setResultDisplay(false)
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
    // setTimeout(() => {
    //   answerCardOnPress(answer)
    // }, 1000)
  }

  function changeQuestionType(inpt) {
    questionType = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    // console.log(questionType)
    reload()
  }

  function getIdxAndNotes(note) {
    let getIdxArr = noteAudioSrc.map((x, idx) => {
      if (x.name === note.name) {
        return [x, idx]
      }
    })
    let res = getIdxArr.filter((x) => x != undefined)
    return res[0]
  }

  function cardOnPress(note) {
    let result
    let altSource =
      note.up === null
        ? randomRoot.idx + 6
        : note.up
        ? randomRoot.idx - note.distanceToRoot
        : note.distanceToRoot + randomRoot.idx
    altSource = altSource >= 12 ? altSource - 12 : altSource
    if (note.name === randomRoot.value.name) {
      result = note.audioSrc['2']
    } else {
      //DRY THIS UP 1
      let cardIdx = getIdxAndNotes(note)
      let questionIdx = randomRoot.idx
      if (cardIdx[1] > questionIdx) {
        result = cardIdx[0].audioSrc['1']
      } else {
        result = cardIdx[0].audioSrc['2']
      }
    }
    return result
  }

  function answerCardOnPress(note) {
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
      {/* <DronePlayer
        rootValue={randomRoot.value.audioSrc}
        dronePlaying={droneOn}
      /> */}

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

        <QuestionButtons
          reload={reload}
          changeQuestionType={changeQuestionType}
          stopDrone={() => setDroneOn(false)}
        />
      </View>
      {/* <View> <Drones note={randomRoot} /> </View> */}
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
  questionCardsCont: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 0,
    padding: 0,
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
