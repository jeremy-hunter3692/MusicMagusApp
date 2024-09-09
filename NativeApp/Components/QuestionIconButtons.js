import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const QuestionIconButtons = ({
  changeQuestionType,

  bgColor,
}) => {
  return (
    <>
      <View style={{ backgroundColor: bgColor }}>
        <Pressable onPress={() => changeQuestionType(1)}>
          <View
            style={{
              backgroundColor: 'yellow',
              borderRadius: 10,
              width: 50,
              height: 50,
            }}
          ></View>
        </Pressable>
      </View>
      <View style={{ backgroundColor: bgColor }}>
        <Pressable onPress={() => changeQuestionType(2)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'green',
            }}
          ></View>
        </Pressable>
      </View>
      <View style={{ backgroundColor: bgColor }}>
        <Pressable onPress={() => changeQuestionType(3)}>
          <View
            style={{
              width: 0,
              height: 0,
              padding: 0,
              // position: 'absolute',
              top: -25,
              borderTopWidth: 50,
              borderRightWidth: 50,
              borderRightColor: 'transparent',
              borderTopColor: 'transparent',
              borderBottomWidth: 50, // Hypotenuse of the triangle
              borderBottomColor: 'black',
            }}
          ></View>
        </Pressable>
      </View>
    </>
  )
}

export default QuestionIconButtons
