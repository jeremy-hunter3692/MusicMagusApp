import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import DropDown from './QuestionButtonDropDown'
import { useWindowDimensions } from 'react-native'

const QuestionButtons = ({
  changeQuestionType,
  reload,
  stopDrone,
  droneStopButton,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 4
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
      <View style={{ flex: 1, border: 'red', borderWidth: 1 , backgroundColor: 'red'}}>
        {showDropDown ? (
          <DropDown
            changeQuestionType={changeQuestionAndReset}
            dropDownSwap={dropDownSwap}
            fontSize={adjustedFont}
          />
        ) : (
          <>
            <Pressable onPress={reload} style={styles.button}>
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                New Question
              </Text>
            </Pressable>
            <Pressable onPress={dropDownSwap} style={styles.button}>
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                Question Type
              </Text>
            </Pressable>
            <Pressable onPress={stopDrone} style={styles.button}>
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                {droneStopButton ? 'Stop Drone' : 'Play Drone'}
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </>
  )
}
export default QuestionButtons

const styles = StyleSheet.create({
  button: {
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
