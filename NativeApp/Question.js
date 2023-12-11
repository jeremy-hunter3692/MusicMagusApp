import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import DisplayIntervals from './DisplayIntervals'
import { getCorrectAnswer, returnRandomCard } from './functions'

// let randomRoot = returnRandomCard(keys)

// let randomNote = returnRandomCard(noteNames)

const Question = ({ randomRoot, randomNote, userAnswerSetter }) => {
  return (
    <>
      Question component
      <Text>
        Key: {randomRoot} Note: {randomNote}
      </Text>
      <DisplayIntervals userAnswerSetter={userAnswerSetter} />
    </>
  )
}

export default Question
