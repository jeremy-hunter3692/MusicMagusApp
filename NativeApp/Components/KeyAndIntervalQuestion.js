import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'

import DisplayCards from './DisplayCards'
import Button from './Button'
import { intervals } from './Intervals'
import { noteNames } from './NoteNames'
import { keys, getIntervalNo } from './KeyCards'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
} from './functions'

const KeyAndIntervalQuestion = () => {
  const [randomRoot, setRandomRoot] = useState(() => returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(() =>
    returnRandomCard(intervals)
  )
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState()
  let answer

  function checkAnswer(inpt) {
    return inpt === answer
  }

  function userAnswerSetter(inpt) {
    answer = getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
  }

  function reload() {
    setResultDisplay(null)
    setRandomRoot(returnRandomCard(keys))
    setQuestionNote(returnRandomCard(intervals))
  }

  return (
    <>
      Question component
      <Image
        source={randomRoot.value.imgSrc}
        style={{ width: 100, height: 170 }}
      />
      <Image
        source={questionNote.value.imgSrc}
        style={{ width: 100, height: 170 }}
      />
      <Text>
        Key: {randomRoot.value.name} Note: {questionNote.value.name}
      </Text>
      <DisplayCards
        userAnswerSetter={userAnswerSetter}
        cardsArray={noteNames}
      />
      <Button onPress={reload} title={'New Question'} />
      <Text> Answer: {resultDisplay && 'True'}</Text>
    </>
  )
}

export default KeyAndIntervalQuestion
