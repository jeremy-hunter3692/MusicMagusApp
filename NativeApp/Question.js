import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'
import DisplayCardsGrid from './DisplayCardsGrid'
import CardButton from './CardButton'
import { intervals } from './data/Intervals'
// import Button from './Button'
import { noteNames } from './data/NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
} from './functions/functions'
import {
  playNote,
  setVolume,
  playDrone,
  playLoop,
  stopDrone,
} from './functions/audioFunctions.js'
import { random } from 'canvas-sketch-util'

const blankCard = require('./assets/blankcard.png')

let intervalAsQuestion = true
let answer = ''

//put all state up a level and abstrat the component one?
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

  answer = intervalAsQuestion
    ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
    : getCorrectAnswer(randomRoot, questionNote)

  const { height: h, width: w, scale, fontScale } = windowSize
  const questionCards = {
    // flex: 4,
    height: w * 0.33,
    width: w * 0.33,
    // aspectRatio: 2 / 3,
    // maxWidth: width * 0.3 - 300,
  }

  function userAnswerSetter(inpt) {
    // console.log('clicked', inpt)
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
  }

  function reload() {
    setResultDisplay(false)
    setRandomRoot(returnRandomCard(keys))
    setQuestionNote(
      intervalAsQuestion
        ? returnRandomCard(intervals)
        : returnRandomCard(noteNames)
    )
    intervalAsQuestion ? setCardsArray(noteNames) : setCardsArray(intervals)
  }

  function changeQuestionType() {
    intervalAsQuestion = !intervalAsQuestion
    reload()
  }

  function checkAnswer(inpt) {
    console.log('check', inpt, answer, inpt === answer)
    return inpt === answer.name
  }

  function cardOnPress(note) {
    if (note.name === randomRoot.value.name) {
      playNote(note.audioSrc['2'])
    } else {
      let cardIdx = getIdxAndNotes(note)
      let questionIdx = randomRoot.idx
      if (cardIdx[0][1] > questionIdx) {
        console.log('lwoweroct')
        playNote(cardIdx[0][0].audioSrc['1'])
      } else {
        console.log('hightoct')
        playNote(cardIdx[0][0].audioSrc['2'])
      }
    }
  }

  function getIdxAndNotes(note) {
    console.log({ note })
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
    console.log(answerIdx[0][1], questionIdx)
    // console.log({ answerIdx })
    if (answerIdx[0][1] > questionIdx) {
      console.log('lwoweroct')
      playNote(answerIdx[0][0].audioSrc['1'])
    } else {
      console.log('hightoct')
      playNote(answerIdx[0][0].audioSrc['2'])
    }
  }

  function rootCardPress() {
    rootDronePlaying.bool ? stopDrone() : startDrone(randomRoot.value.audioSrc)
  }

  function startDrone(note) {
    let intervalId = playLoop(note)
    setRootDronePlaying({ bool: true, id: intervalId })
    //set interval id somewhere to be cleared later
  }

  function stopDrone() {
    clearInterval(setRootDronePlaying.id)
    setRootDronePlaying({ bool: false, id: null })
  }

  // function qLevePlayNote(inpt) {
  //   console.log('w', inpt)
  //   playNote(inpt.audioSrc)
  // }

  console.log({ answer })

  return (
    <>
      {/* <HexKey musicKey={randomRoot.value} /> */}
      {/* <Text>__________________</Text> */}
      <View style={styles.questionCardsCont}>
        <CardButton
          data={randomRoot}
          source={randomRoot?.value.imgSrc}
          style={questionCards}
          onPress={rootCardPress}
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
        <CardButton
          data={answer}
          source={questionNote?.value.imgSrc}
          style={questionCards}
          onPress={answerCardOnPress}
        />
      </View>
      {resultDisplay && <Text style={styles.answer}> CORRECT! </Text>}
      <View style={styles.questionButtons}>
        <Pressable
          onPress={() => changeQuestionType()}
          // style={styles.button}
        >
          <Text style={styles.buttonText}>Change Question</Text>
        </Pressable>
        <Pressable
          onPress={reload}
          // style={styles.button}
        >
          <Text style={styles.buttonText}>New Question</Text>
        </Pressable>
      </View>
      <View style={styles.answerCards}>
        <DisplayCardsGrid
          cardOnPress={cardOnPress}
          userAnswerSetter={userAnswerSetter}
          cardsArray={cardsArray}
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
  questionButtons: {
    // backgroundColor: 'pink',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 2,
  },

  buttonText: {
    backgroundColor: 'blue',
    fontSize: 10,
    flex: 1,
    alignItems: 'center',
    color: 'white',
    margin: 2,
    padding: 5,
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
  },
  answer: {
    color: 'white',
    backgroundColor: 'black',
  },
})
