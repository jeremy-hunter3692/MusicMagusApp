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
  const adjustedFont = fontScale * 10
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
      {showDropDown ? (
        <DropDown
          changeQuestionType={changeQuestionAndReset}
          dropDownSwap={dropDownSwap}
        />
      ) : (
        <>
          <Pressable onPress={reload}>
            <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
              New Question
            </Text>
          </Pressable>
          <Pressable onPress={dropDownSwap}>
            <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
              Question Type
            </Text>
          </Pressable>
          <Pressable onPress={stopDrone}>
            <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
              {droneStopButton ? 'Stop Drone' : 'Play Drone'}
            </Text>
          </Pressable>
        </>
      )}
    </>
  )
}
export default QuestionButtons

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: 'blue',

    flex: 1,
    alignItems: 'center',
    color: 'white',
    // margin: 2,
    // padding: 5,
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
  },
})
