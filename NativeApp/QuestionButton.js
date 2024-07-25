import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const QuestionButton = ({ onPress, textStyle, adjustedFont }) => {
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 12

  return (
    <>
      <Pressable onPress={onPress} style={style}>
        <Text style={{ textStyle, fontSize: adjustedFont }}>New Question</Text>
      </Pressable>
    </>
  )
}
export default QuestionButton
