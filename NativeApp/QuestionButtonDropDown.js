import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const DropDown = ({ changeQuestionType, dropDownSwap, fontSize }) => {
  const font = fontSize 
  return (
    <>
      <View style={styles.questionButtons}>
        <Pressable
          onPress={dropDownSwap}
          style={{ ...styles.button, backgroundColor: 'aqua' }}
        >
          <Text
            style={{ ...styles.buttonText, fontSize: font, color: 'black' }}
          >
            Back
          </Text>
        </Pressable>
        <Pressable onPress={() => changeQuestionType(1)} style={styles.button}>
          <Text style={{ ...styles.buttonText, fontSize: font }}>Interval</Text>
        </Pressable>
        <Pressable onPress={() => changeQuestionType(2)} style={styles.button}>
          <Text style={{ ...styles.buttonText, fontSize: font }}>Note</Text>
        </Pressable>
        <Pressable onPress={() => changeQuestionType(3)} style={styles.button}>
          <Text style={{ ...styles.buttonText, fontSize: font }}>Key</Text>
        </Pressable>
      </View>
    </>
  )
}
export default DropDown

const styles = StyleSheet.create({
  questionButtons: {
  
    flexDirection: 'column',
    justifyContent: 'center',
  

  },
  button: {
    // flex: 1,
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
})
