import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const QuestionIconButtons = ({ changeQuestionType, bgColor }) => {
  const [underLine, setUnderline] = useState(1)

  function selectQType(inpt) {
    setUnderline(inpt)
    changeQuestionType(inpt)
  }

  return (
    <>
      <View>
        <Pressable onPress={() => selectQType(1)}>
          <View
            style={{
              backgroundColor: 'yellow',
              borderRadius: 10,
              width: 50,
              height: 50,
            }}
          ></View>
          <View
            style={[
              styles.underCombo,
              underLine === 1 ? styles.underLine : null,
            ]}
          ></View>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => selectQType(2)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'green',
            }}
          ></View>
          <View
            style={[
              styles.underCombo,
              underLine === 2 ? styles.underLine : null,
            ]}
          ></View>
        </Pressable>
      </View>
      <View
        style={[styles.underCombo, underLine === 3 ? styles.underLine : null]}
      >
        <Pressable onPress={() => selectQType(3)}>
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

const styles = StyleSheet.create({
  underLine: {
    borderBottomColor: 'black',
    borderWidth: 2,
  },
  underCombo: {},
})
export default QuestionIconButtons
