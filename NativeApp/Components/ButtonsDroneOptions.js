import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const ButtonsDroneOptions = ({
  stopDrone,
  droneStopButton,
  selectDroneAudio,
  buttonStyle,
  buttonTextStyle
}) => {
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 1

  return (
    <>
      <QuestionButton
        onPress={stopDrone}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={droneStopButton ? `Stop Drone` : `Play Drone`}
      />
      <QuestionButton
        onPress={selectDroneAudio}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={'Drone Sound'}
      />
    </>
  )
}
export default ButtonsDroneOptions
