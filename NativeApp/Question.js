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
import DisplayCardsGrid from './DisplayCardsGrid'
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
const blankCard = require('./assets/blankcard.png')
let answer = ''

//put all state up a level and abstrat the component one?
const Question = () => {
  const [randomRoot, setRandomRoot] = useState(returnRandomCard(keys))
  const [questionNote, setQuestionNote] = useState(returnRandomCard(intervals))
  const [userAnswer, setUserAnswer] = useState()
  const [resultDisplay, setResultDisplay] = useState(false)
  const [cardsArray, setCardsArray] = useState(noteNames)

  function checkAnswer(inpt) {
    console.log('check', inpt, answer, inpt === answer)
    //Answer name might not be the correct syntax for this now
    return inpt === answer.name
  }

  function userAnswerSetter(inpt) {
    // console.log('clicked', inpt)
    answer = intervalAsQuestion
      ? getAnswerKeyAndInterval(randomRoot, questionNote, noteNames)
      : getCorrectAnswer(randomRoot, questionNote)
    setUserAnswer(inpt)
    setResultDisplay(checkAnswer(inpt))
  }

  function reload() {
    setResultDisplay(false)
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
  console.log(resultDisplay, answer)

  return (
    <>
      <HexKey musicKey={randomRoot.value} />
      <Text>__________________</Text>
      <View style={styles.questionCardsCont}>
        <Image source={randomRoot?.value.imgSrc} style={styles.questionCards} />

        {resultDisplay ? (
          <Image source={answer?.imgSrc} style={styles.questionCards} />
        ) : (
          <Image source={blankCard} style={styles.questionCards} />
        )}
        <Image
          source={questionNote?.value.imgSrc}
          style={styles.questionCards}
        />
      </View>
      {resultDisplay && <Text style={styles.answer}> CORRECT! </Text>}
      <View style={styles.questionButtons}>
        <Button
          onPress={() => changeQuestionType(userAnswerSetter)}
          title={'Change Question Type'}
        />
        <Button onPress={reload} title={'New Question'} />
      </View>

      <DisplayCardsGrid
        userAnswerSetter={userAnswerSetter}
        cardsArray={cardsArray}
      />

      <Drones note={randomRoot} />
    </>
  )
}

export default Question

const styles = StyleSheet.create({
  questionCardsCont: {
    // flex: 1,
    flexDirection: 'row',

    justifyContent: 'space-evenly',
    marginBottom: 0,
    padding: 0,
  },
  questionButtons: {
    flexDirection: 'row',
    margin: 0,
  },
  questionCards: {
    width: 130,
    height: 200,
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
