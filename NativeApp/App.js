import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import KeyAndIntervalQuestion from './KeyAndIntervalQuestion'
import Question from './Question'
import Drones from './Drones'
import HexKey from './HexKeyCiclesDisplay'
import Button from './Button'
import { noteNames } from './NoteNames'
import DisplayCards from './DisplayCards'

// let randomRoot = returnRandomCard(keys)

// let randomNote = returnRandomCard(noteNames)

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])

  function getKey(musicKey) {
    setHexKey(musicKey)
  }

  function appLevel(inpt) {
    console.log('TODO-App leve', inpt)
  }
  return (
    <>
      {' '}
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        {/* <KeyAndIntervalQuestion /> */}

        <Question />
        {/* <View style={styles.container}>
          <HexKey musicKey={hexKey} bgColor={bgColor} />
          <Text>
            {keys.map((x, idx) => (
              <Text key={idx}>
                <Button onPress={getKey} title={x.name} data={x} />
              </Text>
            ))}
          </Text>
        </View> */}
      </View>
    </>
  )
}

const bgColor = '#fff'

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    borderWidth: 5,
    borderRadius: 10,
    margin: 0,
    padding: 5,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    maxWidth: '%100',
    minHeight: '%50',
  },
})

// function howManyCircles(array) {
//   console.log(array)
//   return array.map((x) =>
//     x === true ? <View style={styles.circleFull}></View> : console.log(x)
//   )
// }
// function displayCirclesHex(array) {
//   return array.map((x, idx) => fillCricleBool(x, idx))
// }

//write test for this before refactoring
