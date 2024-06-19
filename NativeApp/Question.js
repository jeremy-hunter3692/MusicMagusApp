import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'
import DisplayCardsGrid from './DisplayCardsGrid'
import CardButton from './CardButton'
import { intervals } from './data/Intervals'
import QuestionButtons from './QuestionButtons.js'
// import Drones from './Drones.js'
import { noteNames } from './data/NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
  getAnswerKeys,
} from './functions/functions'
import { playSound, playNoteForLooping } from './audioPlayer.js'

const blankCard = require('./assets/blankcard.png')
let questionType = 'Interval'
let answer = ''

const Question = ({ windowSize }) => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(
    returnRandomCard(intervals, true)
  )
  const [cardsArray, setCardsArray] = useState(noteNames)
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState(false)
  const [sounds, setSounds] = useState([])
  const [rootDronePlaying, setRootDronePlaying] = useState({
    id: '',
    bool: false,
  })
  console.log('loaded obj', notesLoaded)
  answer =
    questionType === 'Interval'
      ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
      : questionType === 'Note'
      ? getCorrectAnswer(randomRoot, questionNote)
      : getAnswerKeys(randomRoot, questionNote, keys)

  const { height: h, width: w, scale, fontScale } = windowSize

  useEffect(() => {
    startDrone(randomRoot.value.audioSrc)
    setTimeout(() => {
      answerCardOnPress(answer)
    }, 1000)
  }, [])

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
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
    stopDrone()
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
    startDrone(randomRoot.value.audioSrc)
    setTimeout(() => {
      answerCardOnPress(answer)
    }, 1000)
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
    // let altSource = 0
    let altSource =
      note.up === null
        ? randomRoot.idx + 6
        : note.up
        ? randomRoot.idx - note.distanceToRoot
        : note.distanceToRoot + randomRoot.idx

    altSource = altSource >= 12 ? altSource - 12 : altSource

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

  function playNote(note) {
    playSound(note).then((res) => {
      setSounds((prevSounds) => [...prevSounds, res])
    })
  }

  function answerCardOnPress(note) {
    let answerIdx = getIdxAndNotes(note)
    let questionIdx = randomRoot.idx
    let targetNote =
      answerIdx[1] > questionIdx
        ? answerIdx[0].audioSrc['1']
        : answerIdx[0].audioSrc['2']
    playNote(targetNote)
  }

  function rootCardPress() {
    rootDronePlaying.bool ? stopDrone() : startDrone(randomRoot.value.audioSrc)
  }

  const startDrone = async (note) => {
    const soundOne = await playNoteForLooping(note)
    let soundTwo = null
    let timeoutId = setTimeout(async () => {
      soundTwo = await playNoteForLooping(note)
      setRootDronePlaying((state) => ({ ...state, currentSoundTwo: soundTwo }))
    }, 2900)

    // console.log('start drone', soundOne, soundTwo, timeoutId)

    setRootDronePlaying({
      bool: true,
      id: timeoutId,
      currentSound: soundOne,
      currentSoundTwo: soundTwo,
    })
  }

  function stopDrone() {
    if (rootDronePlaying.currentSoundTwo) {
      rootDronePlaying.currentSound.stopAsync()
      rootDronePlaying.currentSoundTwo.stopAsync()
      rootDronePlaying.currentSound.unloadAsync()
      rootDronePlaying.currentSoundTwo.unloadAsync()
    } else {
      rootDronePlaying.currentSound.stopAsync()
      rootDronePlaying.currentSound.unloadAsync()
      clearTimeout(rootDronePlaying.id)
    }
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
