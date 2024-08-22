import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const ButtonsDroneOptions = ({
  stopDrone,
  droneStopButton,
  selectDroneAudio,
}) => {
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 1

  return (
    <>
      <QuestionButton
        onPress={stopDrone}
        style={styles.button}
        textStyle={styles.buttonText}
        adjustedFont={adjustedFont}
        text={droneStopButton ? `Stop Drone` : `Play Drone`}
      />
      <QuestionButton
        onPress={selectDroneAudio}
        style={styles.button}
        textStyle={styles.buttonText}
        adjustedFont={adjustedFont}
        text={'Drone Sound'}
      />
    </>
  )
}
export default ButtonsDroneOptions

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
