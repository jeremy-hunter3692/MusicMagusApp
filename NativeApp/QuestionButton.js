import React from 'react'
import { Text, Pressable } from 'react-native'

const QuestionButton = ({ onPress, style, textStyle, adjustedFont, text }) => {
  return (
    <>
      <Pressable onPress={onPress} style={style}>
        <Text style={{ ...textStyle, fontSize: adjustedFont }}>{text}</Text>
      </Pressable>
    </>
  )
}
export default QuestionButton
