import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import DropDown from './QuestionButtonDropDown'
import { useWindowDimensions } from 'react-native'

const buttonText = {
  // flex: 1,
  color: 'black',
  textAlign: 'center',
}

const buttonStyle = {
  flex: 1,
  height: '30%',
  width: '100%',
  padding: 5,
  paddingTop: 20,
  paddingBottom: 50,
  borderWidth: 1,
  borderColor: 'black',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: 'white', //#003399',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',

}

const QuestionButtons = ({
  changeQuestionType,
  reload,
  stopDrone,
  droneStopButton,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const { fontScale } = useWindowDimensions()
  const adjustedFont = fontScale * 15
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
      <View style={{ flex: 1 }}>
        {showDropDown ? (
          <DropDown
            changeQuestionType={changeQuestionAndReset}
            dropDownSwap={dropDownSwap}
            fontSize={adjustedFont}
            buttonStyle={buttonStyle}
            buttonText={buttonText}
          />
        ) : (
          <>
            <Pressable
              onPress={reload}
              style={{ ...styles.button, zIndex: 0, top: 0 }}
            >
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                New Question
              </Text>
            </Pressable>
            <Pressable
              onPress={dropDownSwap}
              style={{ ...styles.button, zIndex: 1, top: '25%' }}
            >
              <Text style={{ ...styles.buttonText, fontSize: adjustedFont }}>
                Question Type
              </Text>
            </Pressable>
            <Pressable
              onPress={stopDrone}
              style={{
                ...styles.button,
                zIndex: 2,
                top: '50%',
                // paddingBottom: 100,
              }}
            >
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
  button: buttonStyle,
  buttonText: buttonText,
})
