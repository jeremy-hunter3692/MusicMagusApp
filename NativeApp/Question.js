import React, { useState } from 'react'
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

import Drones from './Drones'
import DisplayCardsGrid from './DisplayCardsGrid'
import CardButton from './CardButton'
import { intervals } from './data/Intervals'
// import Button from './Button'
import HexKey from './HexKeyCiclesDisplay'
import { noteNames } from './data/NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
} from './functions/functions'
import { playNote, setVolume } from './functions/audioFunctions.js'
const blankCard = require('./assets/blankcard.png')

let intervalAsQuestion = true
let answer = ''

//put all state up a level and abstrat the component one?
const Question = ({ windowSize }) => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState(false)
  const [cardsArray, setCardsArray] = useState(noteNames)

  answer = intervalAsQuestion
    ? getAnswerKeyAndInterval(randomRoot, questionNote, keys)
    : getCorrectAnswer(randomRoot, questionNote)

  const { height: h, width: w, scale, fontScale } = windowSize
  const questionCards = {
    // flex: 4,
    height: w * 0.33,
    width: w * 0.33,
    // aspectRatio: 2 / 3,
    // maxWidth: width * 0.3 - 300,
  }
  function checkAnswer(inpt) {
    console.log('check', inpt, answer, inpt === answer)
    //Answer name might not be the correct syntax for this now
    return inpt === answer.name
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
  console.log(resultDisplay, answer)

  function qLevePlayNote(inpt) {
    console.log('w', inpt)
    playNote(inpt.audioSrc)
  }

  console.log(answer)
  return (
    <>
      {/* <HexKey musicKey={randomRoot.value} /> */}
      {/* <Text>__________________</Text> */}
      <View style={styles.questionCardsCont}>
        <CardButton
          data={randomRoot?.value.audioSrc}
          source={randomRoot?.value.imgSrc}
          style={questionCards}
          onPress={playNote}
        />

        {resultDisplay ? (
          <CardButton
            data={answer?.name}
            source={answer?.imgSrc}
            style={questionCards}
            onPress={qLevePlayNote}
          />
        ) : (
          <CardButton source={blankCard} style={questionCards} />
        )}
        <CardButton
          data={answer?.audioSrc}
          source={questionNote?.value.imgSrc}
          style={questionCards}
          onPress={playNote}
        />
      </View>
      {resultDisplay && <Text style={styles.answer}> CORRECT! </Text>}
      <View style={styles.questionButtons}>
        <Pressable
          onPress={() => changeQuestionType(userAnswerSetter)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Change Question Type</Text>
        </Pressable>
        <Pressable onPress={reload} style={styles.button}>
          <Text style={styles.buttonText}>New Question</Text>
        </Pressable>
      </View>
      <View style={styles.answerCards}>
        <DisplayCardsGrid
          userAnswerSetter={userAnswerSetter}
          cardsArray={cardsArray}
        />
      </View>

      <Drones note={randomRoot} />
    </>
  )
}

export default Question

const styles = StyleSheet.create({
  questionCardsCont: {
    // backgroundColor: 'red',
    flex: 8,
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
    flex: 8,
    // backgroundColor: 'blue',
    // borderWidth: 5,
    // justifyContent: 'center',
    // alignItems: 'stretch',
  },
  questionButtons: {
    // backgroundColor: 'yellow',
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    margin: 5,
  },
  button: {
    // flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: 'blue',
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    // justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },

  answer: {
    color: 'white',
    backgroundColor: 'black',
  },
})
