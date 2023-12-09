import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import Question from './Question'
import HexKey from './HexKey'
import Button from './Button'
import { returnRandomkeyCard } from './KeyCards'
import { noteNames } from './NoteNames'
import { intervals } from './Intervals'
import { math } from 'canvas-sketch-util'

// function howManyCircles(array) {
//   console.log(array)
//   return array.map((x) =>
//     x === true ? <View style={styles.circleFull}></View> : console.log(x)
//   )
// }
// function displayCirclesHex(array) {
//   return array.map((x, idx) => fillCricleBool(x, idx))
// }

let randomRoot = returnRandomkeyCard()
let rnIdx = Math.floor(Math.random() * noteNames.length)
let randomNote = noteNames[rnIdx].name
let answerInSemiTones = noteNames.findIndex((x) => x.name === randomNote)
let rootInSemiTones = noteNames.findIndex((x) => x.name === randomRoot.name)

let distInSemiTones = rootInSemiTones - answerInSemiTones
let trueDist =
  rootInSemiTones > answerInSemiTones ? 12 - distInSemiTones : distInSemiTones

let trueAnswer = intervals[Math.abs(trueDist)]
// console.log(noteNames)
// console.log(rootInSemiTones, answerInSemiTones)
// console.log('d', distInSemiTones)
// console.log('true', Math.abs(trueDist), trueAnswer)

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [randomKey, setRandomKey] = useState(randomRoot.name)
  const [userAnswer, setUserAnswer] = useState()
  const [answer, setAnswer] = useState(trueAnswer)

  function checkAnswer(inpt) {
    console.log('check', inpt, answer)
    return inpt === answer.name
  }

  console.log(checkAnswer(userAnswer))

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
  }

  function getKey(musicKey) {
    setHexKey(musicKey)
  }
  return (
    <>
      <View style={styles.topContainer}>
        <Question
          randomKey={randomKey}
          randomNote={randomNote}
          userAnswerSetter={userAnswerSetter}
        />
        <View style={styles.container}>
          <HexKey musicKey={hexKey} bgColor={bgColor} />
          <Text>
            {keys.map((x, idx) => (
              <Text key={idx}>
                <Button
                  onPress={getKey}
                  title={x.name}
                  data={x}
                  answerSetter={userAnswerSetter}
                />
              </Text>
            ))}
          </Text>
          <StatusBar style="auto" />
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
