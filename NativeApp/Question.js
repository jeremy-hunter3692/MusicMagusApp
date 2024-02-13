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
import { keys, getIntervalNo } from './KeyCards'

import Drones from './Drones'
import DisplayCardsGrid from './DisplayCardsGrid'

import { intervals } from './Intervals'
// import Button from './Button'
import HexKey from './HexKeyCiclesDisplay'
import { noteNames } from './NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
} from './functions'
let intervalAsQuestion = true
const blankCard = require('./assets/blankcard.png')
let answer = ''
const screenWidth = Dimensions.get('window').width
//put all state up a level and abstrat the component one?
const Question = () => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState(false)
  const [cardsArray, setCardsArray] = useState(noteNames)

  function checkAnswer(inpt) {
    console.log('check', inpt, answer, inpt === answer)
    //Answer name might not be the correct syntax for this now
    return inpt === answer.name
  }

  function userAnswerSetter(inpt) {
    // console.log('clicked', inpt)
    answer = intervalAsQuestion
      ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
      : getCorrectAnswer(randomRoot, questionNote)
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

  return (
    <>
      {/* <HexKey musicKey={randomRoot.value} /> */}
      {/* <Text>__________________</Text> */}
      <View style={styles.questionCardsCont}>
        <Image source={randomRoot?.value.imgSrc} style={styles.questionCards} />

        {resultDisplay ? (
          <Image source={answer?.imgSrc} style={styles.questionCards} />
        ) : (
          <Image source={blankCard} style={styles.questionCards} />
        )}
        <Image
          source={questionNote?.value.imgSrc}
          style={styles.questionCards}
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 0,
    padding: 0,
  },
  answerCards: {
    flex: 1,
  },
  questionButtons: {
    flexDirection: 'row',
    margin: 0,
  },
  button: {
    margin: 5,
    padding: 10,
    backgroundColor: 'blue',
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
  questionCards: {
    width: (screenWidth * 0.3 ) - 20,
    // width: 130,
    height: screenWidth * 0.2 * 2,
    margin: 10,
  },
  answer: {
    color: 'white',
    backgroundColor: 'black',
  },
  flatCont: {
    flex: 1,

    width: '100%',
    height: '100%',

    // borderWidth: 5,
    // borderColor: 'red',
    // borderRadius: 10,
    flexDirection: 'row',
  },
})
