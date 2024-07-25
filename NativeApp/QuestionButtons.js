import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import DropDown from './QuestionButtonDropDown'
import { useWindowDimensions } from 'react-native'

const buttonText = {
  flexGrow: 1,

  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 20,
}

const buttonStyle = {
  flex: 1,

  // width: '100%',
  padding: 10,
  paddingTop: 20,
  paddingBottom: 50,
  borderWidth: 1,
  // color: 'red',
  borderColor: 'black',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomWidth: 0,
  backgroundColor: 'white', //#003399',
  alignItems: 'center',
  justifyContent: 'flex-start',
  //
  shadowColor: 'grey',
  shadowOffset: { width: 3, height: -1.5 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  // Android Elevation
  elevation: 5,
}

const QuestionButtons = ({
  changeQuestionType,
  reload,
  stopDrone,
  droneStopButton,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 12

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
      {!showDropDown ? (
        <>
          <View style={{ flex: 1.5, flexDirection: 'row' }}>
            <Pressable onPress={reload} style={{ ...styles.button }}>
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                New Question
              </Text>
            </Pressable>

            <Pressable onPress={dropDownSwap} style={{ ...styles.button }}>
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                Question Type
              </Text>
            </Pressable>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Pressable
              onPress={stopDrone}
              style={{
                ...styles.button,
                marginTop: -10,
              }}
            >
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                {droneStopButton ? 'Stop Drone' : 'Play Drone'}
              </Text>
            </Pressable>
            <View
              style={{
                ...styles.button,
                marginTop: -10,
              }}
            ></View>
          </View>
        </>
      ) : (
        <>
          <View style={{ flex: 1.5, flexDirection: 'row' }}>
            <Pressable
              onPress={() => changeQuestionType(1)}
              style={{ ...styles.button }}
            >
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                Interval
              </Text>
            </Pressable>
            <Pressable
              onPress={dropDownSwap}
              style={{ ...styles.button, backgroundColor: '#19af59' }}
            >
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                Back
              </Text>
            </Pressable>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Pressable
              onPress={() => changeQuestionType(2)}
              style={{
                ...styles.button,
                marginTop: -10,
              }}
            >
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                Note
              </Text>
            </Pressable>

            <Pressable
              onPress={() => changeQuestionType(3)}
              style={{
                ...styles.button,
                marginTop: -10,
              }}
            >
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                Key
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  )
}
export default QuestionButtons

const styles = StyleSheet.create({
  button: buttonStyle,
  buttonText: buttonText,
})
