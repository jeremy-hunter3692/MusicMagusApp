import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const ButtonsQuestionOptions = ({ changeQuestionType, reload }) => {
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 1

  function changeQuestionAndReset(inpt) {
    changeQuestionType(inpt)
    setShowDropDown(false)
    reload()
  }

  return (
    <>
      <QuestionButton
        onPress={() => changeQuestionAndReset(1)}
        style={styles.button}
        textStyle={styles.buttonText}
        adjustedFont={adjustedFont}
        text={'Interval'}
      />

      <QuestionButton
        onPress={() => changeQuestionAndReset(2)}
        style={styles.button}
        textStyle={styles.buttonText}
        adjustedFont={adjustedFont}
        text={'Note'}
      />
      <QuestionButton
        onPress={() => changeQuestionAndReset(3)}
        style={styles.button}
        textStyle={styles.buttonText}
        adjustedFont={adjustedFont}
        text={'Key'}
      />
    </>
  )
}
export default ButtonsQuestionOptions

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 3,
    // width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
    backgroundColor: 'white', //#003399',
    //
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: -1.5 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    // Android Elevation
    elevation: 5,
  },
  buttonText: {
    // flex: 1,
    padding: 10,
    margin: 0,
    flexWrap: 'wrap',
    color: 'black',
    fontWeight: 100,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
})
