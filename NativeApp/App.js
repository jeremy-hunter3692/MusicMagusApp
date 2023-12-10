import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import Question from './Question'
import HexKey from './HexKey'
import Button from './Button'
import { noteNames } from './NoteNames'
import { getCorrectAnswer } from './functions'

// function howManyCircles(array) {
//   console.log(array)
//   return array.map((x) =>
//     x === true ? <View style={styles.circleFull}></View> : console.log(x)
//   )
// }
// function displayCirclesHex(array) {
//   return array.map((x, idx) => fillCricleBool(x, idx))
// }
function returnRandomCard(array) {
  let idx = Math.floor(Math.random() * array.length) //could hard code this for saftey?
  return { value: array[idx], idx: idx }
}


//write test for this before refactoring
let randomRoot = returnRandomCard(keys)
let rnIdx = Math.floor(Math.random() * noteNames.length)
let randomNote = noteNames[rnIdx].name

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [randomKey, setRandomKey] = useState(randomRoot.value.name)
  const [userAnswer, setUserAnswer] = useState()
  const [answer, setAnswer] = useState(
    getCorrectAnswer(randomRoot.idx, rnIdx)
  )
  const [resultDisplay, setResultDisplay] = useState()

  function checkAnswer(inpt) {
    return inpt === answer
  }

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
    console.log(inpt, checkAnswer(inpt), resultDisplay)
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
        <Text> Answer: {resultDisplay && 'true'}</Text>
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
