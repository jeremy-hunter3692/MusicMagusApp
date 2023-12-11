import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
import Question from './Question'
import HexKey from './HexKey'
import Button from './Button'
import { noteNames } from './NoteNames'

import { getCorrectAnswer, returnRandomCard } from './functions'

// let randomRoot = returnRandomCard(keys)

// let randomNote = returnRandomCard(noteNames)

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(noteNames))
  const [userAnswer, setUserAnswer] = useState()
  const [answer, setAnswer] = useState(
    getCorrectAnswer(randomRoot, questionNote)
  )
  const [resultDisplay, setResultDisplay] = useState()

  // console.log({ answer }, { randomRoot }, questionNote.value.name)

  function checkAnswer(inpt) {
    return inpt === answer
  }

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
  }

  function getKey(musicKey) {
    setHexKey(musicKey)
  }
  // REFACTOR THIS
  function reload() {
    setRandomRoot(returnRandomCard(keys))
    setQuestionNote(returnRandomCard(noteNames))
    setAnswer(getCorrectAnswer(randomRoot, questionNote))
  }

  return (
    <>
      <View style={styles.topContainer}>
        <Question
          randomRoot={randomRoot.value.name}
          randomNote={questionNote.value.name}
          userAnswerSetter={userAnswerSetter}
        />
        <Button onPress={reload} title={'New Question'} />
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
