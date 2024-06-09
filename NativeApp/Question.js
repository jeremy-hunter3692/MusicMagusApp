import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'
import DisplayCardsGrid from './DisplayCardsGrid'
import CardButton from './CardButton'
import { intervals } from './data/Intervals'
import QuestionButtons from './QuestionButtons.js'
import Drones from './Drones.js'
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
  volumeFadeDownOrUp,
  playLoop,
  stopDrone,
} from './functions/audioFunctions.js'

const blankCard = require('./assets/blankcard.png')
let questionType = 'Interval'
let answer = ''

const Question = ({ windowSize }) => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [cardsArray, setCardsArray] = useState(noteNames)
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState(false)

  const [rootDronePlaying, setRootDronePlaying] = useState({
    id: '',
    bool: false,
  })

  const { height: h, width: w, scale, fontScale } = windowSize

  useEffect(() => {
    startDrone(randomRoot.value.audioSrc)
    setTimeout(() => {
      answerCardOnPress(answer)
    }, 1000)
  }, [])

  answer =
    questionType === 'Interval'
      ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
      : questionType === 'Note'
      ? getCorrectAnswer(randomRoot, questionNote)
      : getAnswerKeys(randomRoot, questionNote, keys)

  function userAnswerSetter(inpt) {
    // console.log('userAnswer', inpt)
    setUserAnswer(inpt)
    setResultDisplay(inpt === answer.name)
  }

  function returnQuestionNoteWithoutRoot(randomRootVar) {
    // console.log('top:', randomRootVar.value.name)
    let result
    do {
      result = returnRandomCard(noteNames)
      // console.log('ran ternary/while', result.value.name)
    } while (result.value.name === randomRootVar.value.name)
    // console.log('after', result.value.name)
    return result
  }

  function reload() {
    // console.log('reload', rootDronePlaying.id)
    // clearInterval(rootDronePlaying.id)
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
    setTimeout(() => {
      // answerCardOnPress(answer)
    }, 1000)
  }

  function changeQuestionType(inpt) {
    questionType = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    reload()
  }

  function cardOnPress(note) {
    let altSource = 0

    altSource =
      note.up === null
        ? randomRoot.idx + 6
        : note.up
        ? randomRoot.idx - note.distanceToRoot
        : note.distanceToRoot + randomRoot.idx

    altSource = altSource >= 12 ? altSource - 12 : altSource
    // console.log(altSource, noteAudioSrc[altSource].name)

    // console.log('TEMP', note)
    if (note.name === randomRoot.value.name) {
      playNote(note.audioSrc['2'])
    } else {
      //DRY THIS UP 1
      let cardIdx = getIdxAndNotes(note)
      let questionIdx = randomRoot.idx
      if (cardIdx[1] > questionIdx) {
        playNote(cardIdx[0].audioSrc['1'])
      } else {
        playNote(cardIdx[0].audioSrc['2'])
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
    // console.log('res', res)
    return res[0]
  }

  function answerCardOnPress(note) {
    let answerIdx = getIdxAndNotes(note)
    let questionIdx = randomRoot.idx

    let targetNote =
      answerIdx[1] > questionIdx
        ? answerIdx[0].audioSrc['1']
        : answerIdx[0].audioSrc['2']
    playNote(targetNote)

    // if (answerIdx[0][1] > questionIdx) {
    //   // console.log('lwoweroct')
    //   playNote(answerIdx[0][0].audioSrc['1'])
    // } else {
    //   // console.log('hightoct')
    //   playNote(answerIdx[0][0].audioSrc['2'])
    // }
  }

  function rootCardPress() {
    rootDronePlaying.bool ? stopDrone() : startDrone(randomRoot.value.audioSrc)
  }

  const startDrone = async (note) => {
    const returnedObj = await playLoop(note)

    console.log(returnedObj)
    // returnedObj
    //   .then((result) => {
    //     console.log('in start', result)
    const { currentSoundTwo, currentSound, intervalId } = returnedObj

    //     // console.log(intervalId, currentSound)
    setRootDronePlaying({
      bool: true,
      id: intervalId,
      currentSound: currentSound,
      currentSoundTwo: currentSoundTwo,
    })
    //   })
    //   .catch((error) => {
    //     console.error('Error starting drone:', error)
    //   })

    // set interval id somewhere to be cleared later
  }

  function stopDrone() {
    console.log('stop drone', rootDronePlaying)
    rootDronePlaying.currentSound.stopAsync()
    rootDronePlaying.currentSoundTwo.stopAsync()

    setRootDronePlaying({
      bool: false,
      id: null,
      currentSound: null,
      currentSoundTwo: null,
    })
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
          stopDrone={stopDrone}
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
