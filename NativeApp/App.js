import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'
import Question from './Question'
import HexKey from './HexKeyCiclesDisplay'

// let randomRoot = returnRandomCard(keys)

// let randomNote = returnRandomCard(noteNames)

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const windowSize = useWindowDimensions()
  const { height, width, scale, fontScale } = useWindowDimensions()

  function getKey(musicKey) {
    setHexKey(musicKey)
  }

  function appLevel(inpt) {
    console.log('TODO-App level', inpt)
  }
  return (
    <>
      {' '}
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          height: height * 0.95,
          width: width * 0.1,
          // borderWidth: 5,
          borderRadius: 10,
          margin: 0,
          padding: 5,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Question windowSize={windowSize} />
      </View>
    </>
  )
}

const bgColor = '#fff'

{
  /* <View style={styles.container}>
          <HexKey musicKey={hexKey} bgColor={bgColor} />
          <Text>
            {keys.map((x, idx) => (
              <Text key={idx}>
                <Button onPress={getKey} title={x.name} data={x} />
              </Text>
            ))}
          </Text>
        </View> */
}

// const styles = StyleSheet.create({

// })

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
