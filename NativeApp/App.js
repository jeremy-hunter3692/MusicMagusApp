import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import DisplayNoteNames from './DisplayNoteNames'
import HexKey from './HexKey'
import Button from './Button'
import { returnRandomkeyCard } from './KeyCards'
import DisplayIntervals from './DisplayIntervals'
// function howManyCircles(array) {
//   console.log(array)
//   return array.map((x) =>
//     x === true ? <View style={styles.circleFull}></View> : console.log(x)
//   )
// }
// function displayCirclesHex(array) {
//   return array.map((x, idx) => fillCricleBool(x, idx))
// }

let random = returnRandomkeyCard()

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [randomKey, setRandomKey] = useState(random.name)
  function getKey(musicKey) {
    setHexKey(musicKey)
  }
  return (
    <>
      {/* <DisplayNoteNames /> */}
      {`\n`}
      {`\n`}

      <Text>Key: {randomKey}</Text>
      <DisplayIntervals />
      <View style={styles.container}>
        <HexKey musicKey={hexKey} bgColor={bgColor} />
        <Text>
          {keys.map((x, idx) => (
            <Text key={idx}>
              <Button onPress={getKey} title={x.name} data={x} />
            </Text>
          ))}
        </Text>
        <StatusBar style="auto" />
      </View>
    </>
  )
}

const bgColor = 'white'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
