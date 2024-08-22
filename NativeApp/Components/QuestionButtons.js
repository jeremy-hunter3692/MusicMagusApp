import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const QuestionButtons = ({
  changeQuestionType,
  reload,
  showQuestionTypes,
  showDroneOptions,
  stopDrone,
  buttonTextStyle,
  buttonStyle,
  droneStopButton,
  selectDroneAudio,
}) => {
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 1



  return (
    <>
      <QuestionButton
        onPress={reload}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={'New'}
      />
      <QuestionButton
        onPress={showQuestionTypes}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={'Type'}
      />
      <QuestionButton
        onPress={showDroneOptions}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={'Drone'}
      />
    </>
  )
}
export default QuestionButtons

