import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const ButtonsQuestionOptions = ({
  changeQuestionType,
  reload,
  buttonTextStyle,
  buttonStyle,
}) => {
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 1

  function changeQuestionAndReset(inpt) {
    changeQuestionType(inpt)

    reload()
  }

  return (
    <>
      <QuestionButton
        onPress={() => changeQuestionAndReset(1)}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={'Interval'}
      />

      <QuestionButton
        onPress={() => changeQuestionAndReset(2)}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={'Note'}
      />
      <QuestionButton
        onPress={() => changeQuestionAndReset(3)}
        style={buttonStyle}
        textStyle={buttonTextStyle}
        adjustedFont={adjustedFont}
        text={'Key'}
      />
    </>
  )
}
export default ButtonsQuestionOptions
