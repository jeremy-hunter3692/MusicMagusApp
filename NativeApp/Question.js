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

//put all state up a level and abstrat the component one?
const Question = () => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState()
  const [question, setQuestion] = useState(false)
  let answer

  function checkAnswer(inpt) {
    return inpt === answer
  }

  function userAnswerSetter(inpt) {
    answer = question
      ? getCorrectAnswer(randomRoot, questionNote)
      : getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
  }

  function reload() {
    setResultDisplay(null)
    setRandomRoot(returnRandomCard(keys))
    setQuestionNote(returnRandomCard(question ? noteNames : intervals))
    console.log(question, questionNote)
  }

  function changeQuestion() {
    setQuestion(!question)
    reload()
  } // reload()

  return (
    <>
      <Text>Question component</Text>
      <TouchableOpacity onPress={() => changeQuestion()}>
        <Text>Change Question</Text>
      </TouchableOpacity>
      Key:{' '}
      <Image
        source={randomRoot.value.imgSrc}
        style={{ width: 100, height: 170 }}
      />{' '}
      Note:{' '}
      <Image
        source={questionNote.value.imgSrc}
        style={{ width: 100, height: 170 }}
      />
      <DisplayCards
        userAnswerSetter={userAnswerSetter}
        cardsArray={question ? intervals : noteNames}
      />
      <Button onPress={reload} title={'New Question'} />
      <Text> Answer: {resultDisplay && 'True'}</Text>
    </>
  )
}

export default Question
