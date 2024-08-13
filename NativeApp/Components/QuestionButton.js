import React from 'react'
import { Text, Pressable } from 'react-native'

const QuestionButton = ({ onPress, style, textStyle, adjustedFont, text }) => {
  return (
    <>
      <Pressable onPress={onPress} style={style}>
        <Text style={{ ...textStyle,  flex: 1 }}>{text}</Text>
      </Pressable>
    </>
  )
}
export default QuestionButton
