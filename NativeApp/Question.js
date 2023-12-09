import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import DisplayIntervals from './DisplayIntervals'

const Question = ({ randomKey, randomNote, userAnswerSetter}) => {
  return (
    <>
      Question component
      <Text>
        Key: {randomKey} Note: {randomNote}
      </Text>
      <DisplayIntervals userAnswerSetter={userAnswerSetter} />
    </>
  )
}

export default Question
