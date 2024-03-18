import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'
import DisplayCardsGrid from './DisplayCardsGrid'
import CardButton from './CardButton'
import { intervals } from './data/Intervals'
import QuestionButtons from './QuestionButtons.js'
import Drones from './Drones.js'
// import Button from './Button'
import { noteNames } from './data/NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
  getAnswerKeys,
} from './functions/functions'
import {
  playNote,
  setVolume,
  playDrone,
  setVolumeFade,
  playLoop,
  stopDrone,
} from './functions/audioFunctions.js'
import { random } from 'canvas-sketch-util'

const blankCard = require('./assets/blankcard.png')
let questionType = 'Interval'
let answer = ''

const Question = ({ windowSize }) => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [rootDronePlaying, setRootDronePlaying] = useState({
    id: '',
    bool: false,
  })
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState(false)
  const [cardsArray, setCardsArray] = useState(noteNames)

  const { height: h, width: w, scale, fontScale } = windowSize

  // useEffect(() => {
  //   startDrone(randomRoot.value.audioSrc)
  //   setTimeout(() => {
  //     answerCardOnPress(answer)
  //   }, 1000)
  // }, [])

  answer =
    questionType === 'Interval'
      ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
      : questionType === 'Note'
      ? getCorrectAnswer(randomRoot, questionNote)
      : getAnswerKeys(randomRoot, questionNote, keys)
  console.log(answer.name)

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
    setResultDisplay(inpt === answer.name)
  }

  // function checkAnswer(inpt) {
  //   console.log('check', inpt, answer, inpt === answer)
  //   return inpt === answer.name
  // }

  function reload() {
    // console.log('reload', rootDronePlaying.id)
    // clearInterval(rootDronePlaying.id)
    setResultDisplay(false)

    setQuestionNote(
      questionType === 'Interval'
        ? returnRandomCard(intervals)
        : questionType === 'Note'
        ? returnRandomCard(noteNames)
        : returnRandomCard(intervals)
    )
    setRandomRoot(
      questionType === 'Key'
        ? returnRandomCard(noteNames)
        : returnRandomCard(keys)
    )

    setCardsArray(
      questionType === 'Interval'
        ? noteNames
        : questionType === 'Note'
        ? intervals
        : keys
    )
    // startDrone(randomRoot.value.audioSrc)
    setTimeout(() => {
      // answerCardOnPress(answer)
    }, 1000)
  }

  function changeQuestionType(inpt) {
    questionType = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    reload()
  }

  function cardOnPress(note) {
    console.log({ note })
    let altSource = 0
    console.log(altSource, altSource)
    altSource =
      note.up === null
        ? randomRoot.idx + 6
        : note.up
        ? randomRoot.idx - note.distanceToRoot
        : note.distanceToRoot + randomRoot.idx

    altSource = altSource >= 12 ? altSource - 12 : altSource
    console.log(altSource, noteAudioSrc[altSource].name)

    // console.log('TEMP', note)
    if (note.name === randomRoot.value.name) {
      // playNote(note.audioSrc['2'])
    } else {
      //DRY THIS UP 1
      let cardIdx = getIdxAndNotes(note)
      let questionIdx = randomRoot.idx
      if (cardIdx[0][1] > questionIdx) {
        // console.log('lwoweroct')
        // playNote(cardIdx[0][0].audioSrc['1'])
      } else {
        // console.log('hightoct')
        // playNote(cardIdx[0][0].audioSrc['2'])
      }
    }
  }

  function getIdxAndNotes(note) {
    // console.log({ note })
    let getIdxArr = noteAudioSrc.map((x, idx) => {
      if (x.name === note.name) {
        return [x, idx]
      }
    })

    let res = getIdxArr.filter((x) => x != undefined)
    return res
  }

  function answerCardOnPress(note) {
    let answerIdx = getIdxAndNotes(note)
    let questionIdx = randomRoot.idx
    // console.log(answerIdx[0][1], questionIdx)
    //DRY THIS UP 1
    if (answerIdx[0][1] > questionIdx) {
      // console.log('lwoweroct')
      // playNote(answerIdx[0][0].audioSrc['1'])
    } else {
      // console.log('hightoct')
      // playNote(answerIdx[0][0].audioSrc['2'])
    }
  }

  function rootCardPress() {
    rootDronePlaying.bool ? stopDrone() : startDrone(randomRoot.value.audioSrc)
  }

  function startDrone(note) {
    let returnedObj = playLoop(note)
    let { intervalId, currentSound } = returnedObj
    console.log({ returnedObj })
    setRootDronePlaying({
      bool: true,
      id: intervalId,
      currentSound: currentSound,
    })
    // console.log({ intervalId }, rootDronePlaying)
    //set interval id somewhere to be cleared later
  }

  function stopDrone() {
    setVolumeFade(rootDronePlaying.currentSound, false, 100)
    // console.log('stop', rootDronePlaying)
    clearInterval(rootDronePlaying.id)
    setRootDronePlaying({ bool: false, id: null })
  }

  const questionCards = {
    height: w * 0.33,
    width: w * 0.33,
  }

  return (
    <>
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
            onPress={cardOnPress}
          />
        ) : (
          <CardButton source={blankCard} style={questionCards} />
        )}

        <QuestionButtons
          reload={reload}
          changeQuestionType={changeQuestionType}
        />
      </View>
      {resultDisplay && <Text style={styles.answer}> CORRECT! </Text>}
      <View>{/* <Drones note={randomRoot} /> */}</View>
      <View style={styles.answerCards}>
        <DisplayCardsGrid
          cardOnPress={cardOnPress}
          userAnswerSetter={userAnswerSetter}
          cardsArray={cardsArray}
          answer={answer}
        />
      </View>
    </>
  )
}

export default Question

const styles = StyleSheet.create({
  questionCardsCont: {
    // backgroundColor: 'red',
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 0,
    padding: 0,
  },
  // questionCards: {
  //   flex: 8,
  //   // aspectRatio: 2 / 3,
  //   // margin: 10,
  // },
  answerCards: {
    flex: 7,
    // backgroundColor: 'blue',
    // borderWidth: 5,
    // justifyContent: 'center',
    // alignItems: 'stretch',
  },

  answer: {
    color: 'white',
    backgroundColor: 'black',
  },
})
