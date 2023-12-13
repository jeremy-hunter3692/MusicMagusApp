import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import DisplayCards from './DisplayCards'
import { intervals } from './Intervals'
import Button from './Button'
import { noteNames } from './NoteNames'
import { getCorrectAnswer, returnRandomCard } from './functions'

// let randomRoot = returnRandomCard(keys)

// let randomNote = returnRandomCard(noteNames)

const Question = () => {
  const [randomRoot, setRandomRoot] = useState(() => returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(() =>
    returnRandomCard(noteNames)
  )
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState()
  let answer

  function checkAnswer(inpt) {
    console.log('inpt', inpt, answer)
    return inpt === answer
  }

  function userAnswerSetter(inpt) {
    answer = getCorrectAnswer(randomRoot.idx, questionNote.idx)
    console.log(answer)
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
    console.log(checkAnswer(inpt), resultDisplay)
  }

  function reload() {
    setResultDisplay(null)
    setRandomRoot(returnRandomCard(keys))
    setQuestionNote(returnRandomCard(noteNames))
  }

  return (
    <>
      Question component
      <Text>
        Key: {randomRoot.value.name} Note: {questionNote.value.name}
      </Text>
      <DisplayCards
        userAnswerSetter={userAnswerSetter}
        cardsArray={intervals}
      />
      <Button onPress={reload} title={'New Question'} />
      <Text> Answer: {resultDisplay && 'True'}</Text>
    </>
  )
}

export default Question
