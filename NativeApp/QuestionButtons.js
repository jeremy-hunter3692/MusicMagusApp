import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import DropDown from './QuestionButtonDropDown'

const QuestionButtons = ({ changeQuestionType, reload, stopDrone,droneStopButton }) => {
  const [showDropDown, setShowDropDown] = useState(false)

  function changeQuestionAndReset(inpt) {
    changeQuestionType(inpt)
    setShowDropDown(false)
    reload()
  }
  function dropDownSwap() {
    setShowDropDown(!showDropDown)
  }

  return (
    <>
      <View style={styles.questionButtons}>
        {showDropDown ? (
          <DropDown
            changeQuestionType={changeQuestionAndReset}
            dropDownSwap={dropDownSwap}
          />
        ) : (
          <>
            <Pressable onPress={reload}>
              <Text style={styles.buttonText}>New Question</Text>
            </Pressable>
            <Pressable onPress={dropDownSwap}>
              <Text style={styles.buttonText}>Question Type</Text>
            </Pressable>
            <Pressable onPress={stopDrone}>
              <Text style={styles.buttonText}>{droneStopButton? 'Stop Drone':'Play Drone'}</Text>
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
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
    // flex: 1,
    margin:0,
    padding:0,
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
