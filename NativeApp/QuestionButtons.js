import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const QuestionButtons = ({
  changeQuestionType,
  reload,
  stopDrone,
  droneStopButton,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const { fontScale } = useWindowDimensions()
  const adjustedFont =  fontScale * 10

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
          <View style={styles.rowTop}>
            <QuestionButton
              onPress={reload}
              style={styles.button}
              textStyle={styles.buttonText}
              adjustedFont={adjustedFont}
              text={'New Question'}
            />

            <QuestionButton
              onPress={dropDownSwap}
              style={styles.button}
              textStyle={styles.buttonText}
              adjustedFont={adjustedFont}
              text={'Question Type'}
            />
          </View>

          <View style={styles.row}>
            <QuestionButton
              onPress={stopDrone}
              style={{
                ...styles.button,
                marginTop: -10,
              }}
              textStyle={styles.buttonText}
              adjustedFont={adjustedFont}
              text={droneStopButton ? 'Stop Drone' : 'Play Drone'}
            />

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
          <View style={styles.rowTop}>
            <QuestionButton
              onPress={() => changeQuestionAndReset(1)}
              style={styles.button}
              textStyle={styles.buttonText}
              adjustedFont={adjustedFont}
              text={' Interval'}
            />
            <QuestionButton
              onPress={dropDownSwap}
              style={{ ...styles.button, backgroundColor: '#19af59' }}
              textStyle={styles.buttonText}
              adjustedFont={adjustedFont}
              text={'Back'}
            />
          </View>
          <View style={styles.row}>
            <QuestionButton
              onPress={() => changeQuestionAndReset(2)}
              style={{
                ...styles.button,
                marginTop: -10,
              }}
              textStyle={styles.buttonText}
              adjustedFont={adjustedFont}
              text={'Note'}
            />
            <QuestionButton
              onPress={() => changeQuestionAndReset(3)}
              style={{
                ...styles.button,
                marginTop: -10,
              }}
              textStyle={styles.buttonText}
              adjustedFont={adjustedFont}
              text={'Key'}
            />
          </View>
        </>
      )}
    </>
  )
}
export default QuestionButtons

const styles = StyleSheet.create({
  rowTop: {
    flex: 1.75,
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 5,
  
    borderWidth: 1,
 
    borderColor: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
    backgroundColor: 'white', //#003399',
   
    //
    shadowColor: 'grey',
    shadowOffset: { width: 3, height: -1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Android Elevation
    elevation: 5,
  },
  buttonText: {

    flexWrap: 'wrap',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
    alignSelf: 'flex-start',
  },
})
