import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import DisplayCards from './DisplayCards'
import { intervals } from './Intervals'
import Button from './Button'
import { noteNames } from './NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
} from './functions'
let intervalAsQuestion = true

//put all state up a level and abstrat the component one?
const Question = () => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState()
  // const [intervalAsQuestion, setQuestionBool] = useState(false)
  const [cardsArray, setCardsArray] = useState(noteNames)
  let answer

  function checkAnswer(inpt) {
    return inpt === answer
  }

  function userAnswerSetter(inpt) {
    answer = intervalAsQuestion
      ? getCorrectAnswer(randomRoot, questionNote)
      : getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
  }

  function reload() {
    console.log('reload', intervalAsQuestion)
    setResultDisplay(null)
    setRandomRoot(returnRandomCard(keys))
    setQuestionNote(
      intervalAsQuestion
        ? returnRandomCard(intervals)
        : returnRandomCard(noteNames)
    )
    intervalAsQuestion ? setCardsArray(noteNames) : setCardsArray(intervals)
  }

  function changeQuestionType() {
    console.log(intervalAsQuestion)
    intervalAsQuestion = !intervalAsQuestion
    console.log('2nd', intervalAsQuestion)
    setResultDisplay(null)
    reload()
    // setRandomRoot(returnRandomCard(keys))
    // intervalAsQuestion
    //   ? setQuestionNote(returnRandomCard(intervals))
    //   : setQuestionNote(returnRandomCard(noteNames))

    // intervalAsQuestion ? setCardsArray(noteNames) : setCardsArray(intervals)
  }

  return (
    <>
      <Text>Question component</Text>
      <TouchableOpacity onPress={() => changeQuestionType()}>
        <Text>Change Question Type</Text>
      </TouchableOpacity>
      Key:{' '}
      <Image
        source={randomRoot?.value.imgSrc}
        style={{ width: 100, height: 170 }}
      />{' '}
      Note:{' '}
      <Image
        source={questionNote?.value.imgSrc}
        style={{ width: 100, height: 170 }}
      />
      <DisplayCards
        userAnswerSetter={userAnswerSetter}
        cardsArray={cardsArray}
      />
      <Button onPress={reload} title={'New Question'} />
      <Text> Answer: {resultDisplay && 'True'}</Text>
    </>
  )
}

export default Question
