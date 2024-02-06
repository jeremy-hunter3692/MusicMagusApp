import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'
/////
import Drones from './Drones'
import ScrollWheelExample from './DisplayWheelGesture'
import DisplayCards from './DisplayCards'
import DisplayMobileCards from './DisplayMobileCards'
import DisplayScrollingMobileCards from './DisplayScrollingMobileCards'
import StaticImgs from './StaticImgs'
import HorizontalFlatList from './HorizontalFlatlist'
// import DisplayScrollWheelCards from './DisplayScrollWheelCards'
/////
import { intervals } from './Intervals'
import Button from './Button'
import HexKey from './HexKeyCiclesDisplay'
import { noteNames } from './NoteNames'
import {
  getCorrectAnswer,
  returnRandomCard,
  getAnswerKeyAndInterval,
} from './functions'
let intervalAsQuestion = true

//put all state up a level and abstrat the component one?
const Question = () => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState()
  const [cardsArray, setCardsArray] = useState(noteNames)
  let answer

  function checkAnswer(inpt) {
    console.log('check', inpt, answer, inpt === answer)
    return inpt === answer
  }

  function userAnswerSetter(inpt) {
    console.log('clicked', inpt)
    answer = intervalAsQuestion
      ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
      : getCorrectAnswer(randomRoot, questionNote)
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
  }

  function reload() {
    setResultDisplay(null)
    setRandomRoot(returnRandomCard(keys))
    setQuestionNote(
      intervalAsQuestion
        ? returnRandomCard(intervals)
        : returnRandomCard(noteNames)
    )
    intervalAsQuestion ? setCardsArray(noteNames) : setCardsArray(intervals)
  }

  function changeQuestionType() {
    intervalAsQuestion = !intervalAsQuestion
    reload()
  }

  return (
    <>
      <HexKey musicKey={randomRoot.value} />
      <Text>__________________</Text>
      <View style={styles.questionCardsCont}>
        <Image source={randomRoot?.value.imgSrc} style={styles.questionCards} />
        <Image
          source={questionNote?.value.imgSrc}
          style={styles.questionCards}
        />
      </View>

      <Button
        onPress={() => changeQuestionType(userAnswerSetter)}
        title={'Change Question Type'}
      />

      <Button onPress={reload} title={'New Question'} />

      {/* <StaticImgs cardsArray={cardsArray} /> */}
      {resultDisplay && <Text style={styles.answer}> CORRECT! </Text>}
      <View style={styles.flatCont}>
        <HorizontalFlatList
          cardsArray={cardsArray}
          userAnswerSetter={userAnswerSetter}
        />
      </View>

      {/* <DisplayScrollWheelCards
        key={intervalAsQuestion ? 'noteNames' : 'intervals'}
        userAnswerSetter={userAnswerSetter}
        cardsArray={cardsArray}
      /> */}
      {/* <DisplayCards
        userAnswerSetter={userAnswerSetter}
        cardsArray={cardsArray}
      /> */}
      <Drones note={randomRoot} />
    </>
  )
}

export default Question

const styles = StyleSheet.create({
  questionCardsCont: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },
  questionCards: {
    width: 100,
    height: 170,
    margin: 10,
  },
  answer: {
    color: 'white',
    backgroundColor: 'black',
  },
  flatCont: {
    flex: 1,

    width: '100%',
    height: '100%',

    // borderWidth: 5,
    // borderColor: 'red',
    // borderRadius: 10,
    flexDirection: 'row',
  },
})
