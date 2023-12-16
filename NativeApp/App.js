import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import KeyAndIntervalQuestion from './KeyAndIntervalQuestion'
import Question from './Question'
import HexKey from './HexKeyCiclesDisplay'
import Button from './Button'
import { noteNames } from './NoteNames'
import DisplayCards from './DisplayCards'

// let randomRoot = returnRandomCard(keys)

// let randomNote = returnRandomCard(noteNames)

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [question, setQuestion] = useState(true)

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
        <Question switchBool={question} />
        <View style={styles.container}>
          {/* <HexKey musicKey={hexKey} bgColor={bgColor} />
          <Text>
            {keys.map((x, idx) => (
              <Text key={idx}>
                <Button onPress={getKey} title={x.name} data={x} />
              </Text>
            ))}
          </Text> */}
        </View>
      </View>
    </>
  )
}

const bgColor = '#fff'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
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
