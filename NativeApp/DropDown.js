import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const DropDown = ({ changeQuestionType, reload, stopDrone, dropDownSwap }) => {
  return (
    <>
      <View style={styles.questionButtons}>
        <Pressable
          onPress={dropDownSwap}
          // style={styles.button}
        >
          <Text style={styles.closeButtonText}>Back</Text>
        </Pressable>
        <Pressable
          onPress={() => changeQuestionType()}
          // style={styles.button}
        >
          <Text style={styles.buttonText}>Interval</Text>
        </Pressable>
        <Pressable
          onPress={reload}
          // style={styles.button}
        >
          <Text style={styles.buttonText}>Note</Text>
        </Pressable>
        <Pressable
          onPress={stopDrone}
          // style={styles.button}
        >
          <Text style={styles.buttonText}>Third Options</Text>
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
  buttonText: {
    backgroundColor: 'white',
    fontSize: 10,
    flex: 1,
    alignItems: 'center',
    color: 'black',
    margin: 2,
    padding: 5,
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
  },
  closeButtonText: {
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
