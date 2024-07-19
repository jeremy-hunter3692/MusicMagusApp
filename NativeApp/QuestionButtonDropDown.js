import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const DropDown = ({
  changeQuestionType,
  dropDownSwap,
  fontSize,
  buttonStyle,
  buttonText,
}) => {
  const font = fontSize
  return (
    <>
      <View style={styles.questionButtons}>
        <Pressable
          onPress={dropDownSwap}
          style={{ ...buttonStyle, zIndex: 0, top: 0 }}
        >
          <Text style={{ ...buttonText, fontSize: font }}>Back</Text>
        </Pressable>
        <Pressable
          onPress={() => changeQuestionType(1)}
          style={{ ...buttonStyle, zIndex: 1, top: '25%' }}
        >
          <Text style={{ ...buttonText, fontSize: font }}>Interval</Text>
        </Pressable>
        <Pressable
          onPress={() => changeQuestionType(2)}
          style={{ ...buttonStyle, zIndex: 2, top: '50%' }}
        >
          <Text style={{ ...buttonText, fontSize: font }}>Note</Text>
        </Pressable>
        <Pressable
          onPress={() => changeQuestionType(3)}
          style={{ ...buttonStyle, zIndex: 3, top: '75%' }}
        >
          <Text style={{ ...buttonText, fontSize: font }}>Key</Text>
        </Pressable>
      </View>
    </>
  )
}
export default DropDown

const styles = StyleSheet.create({
  questionButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
