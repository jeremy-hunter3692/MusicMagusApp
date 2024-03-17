import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import DropDown from './DropDown'

const QuestionButtons = ({ changeQuestionType, reload, stopDrone }) => {
  const [showDropDown, setShowDropDown] = useState(false)

  function dropDownSwap() {
    setShowDropDown(!showDropDown)
  }

  return (
    <>
      <View style={styles.questionButtons}>
        {showDropDown ? (
          <DropDown
            changeQuestionType={changeQuestionType}
            dropDownSwap={dropDownSwap}
          />
        ) : (
          <>
            <Pressable
              onPress={reload}
              // style={styles.button}
            >
              <Text style={styles.buttonText}>New Question</Text>
            </Pressable>
            <Pressable
              onPress={dropDownSwap}
              // style={styles.button}
            >
              <Text style={styles.buttonText}>Question Type</Text>
            </Pressable>
            <Pressable
              onPress={stopDrone}
              // style={styles.button}
            >
              <Text style={styles.buttonText}>Stop Drone</Text>
            </Pressable>
          </>
        )}
      </View>
    </>
  )
}
export default QuestionButtons

const styles = StyleSheet.create({
  questionButtons: {
    // backgroundColor: 'pink',
    flexDirection: 'column',
    justifyContent: 'center',

    margin: 10,
    padding: 2,
  },

  buttonText: {
    backgroundColor: 'blue',
    fontSize: 10,
    flex: 1,
    alignItems: 'center',
    color: 'white',
    margin: 2,
    padding: 5,
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
  },
})
