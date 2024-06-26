import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
//
import DisplayCardsGrid from './DisplayCardsGrid.js'
import QuestionButtons from './QuestionButtons.js'
import Question from './Question.js'
//
import {
  returnRandomCard,
  getNoteCardIdxFromIntervalAndKeyCard,
  getDistBetweenTwoCardIdxs,
  intervalOfWhatKey,
} from './functions/functions'
import { intervals } from './data/IntervalCards.js'
import { keys } from './data/KeyCards.js'
import { noteNames } from './data/NoteCards.js'

const QuestionHolder = () => {
  //questionType will refer to what the middle card is
  const [questionType, setQuestionType] = useState('Interval')
  const [reloadBool, setReloadBool] = useState(false)
  const [displayInputCardArray, setDisplayInputCardArray] = useState(noteNames)
  const [resultDisplay, setResultDisplay] = useState(false)
  const [firstCard, setFirstCard] = useState(() => returnRandomCard(keys))
  const [secondCard, setSecondCard] = useState(() =>
    returnRandomCard(intervals)
  )
  const [correctAnswer, setCorrectAnswer] = useState()

  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  // const [reload, setRoload] = useState
  console.log(questionType, correctAnswer)
  useEffect(() => {
    let arrayTemp = []
    let firstCardTemp = 0
    let secondCardTemp = 0
    let answerIdxTemp = 0

    if (questionType === 'Interval') {
      arrayTemp = noteNames
      firstCardTemp = returnRandomCard(keys)
      secondCardTemp = returnRandomCard(intervals)
      answerIdxTemp = getNoteCardIdxFromIntervalAndKeyCard(
        firstCardTemp.idx,
        secondCardTemp.idx
      )
    } else if (questionType === 'Note') {
      arrayTemp = intervals
      firstCardTemp = returnRandomCard(keys)
      secondCardTemp = returnRandomCard(noteNames)
      answerIdxTemp = getDistBetweenTwoCardIdxs(
        firstCardTemp.idx,
        secondCardTemp.idx
      )
    } else if (questionType === 'Key') {
      arrayTemp = keys
      firstCardTemp = returnRandomCard(noteNames)
      secondCardTemp = returnRandomCard(intervals)
      answerIdxTemp = intervalOfWhatKey(firstCardTemp, secondCardTemp)
    }
    setDisplayInputCardArray(arrayTemp)
    setFirstCard(firstCardTemp)
    setSecondCard(secondCardTemp)
    setCorrectAnswer(arrayTemp[answerIdxTemp])
  }, [questionType, reloadBool])

  function changeQuestionType(inpt) {
    let type = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    setQuestionType(type)
  }

  function rootCardPress() {
    droneOn ? setDroneOn(false) : setDroneOn(true)
  }

  function reload() {
    setReloadBool((x) => !x)
  }
  function stopDrone() {
    setDronePlaying(false)
  }

  function checkAnswer() {}

  return (
    <>
      <View style={{ backgroundColor: 'yellow' }}>
        <QuestionButtons
          changeQuestionType={changeQuestionType}
          reload={reload}
          stopDrone={stopDrone}
        />
        <Question
          firstCard={firstCard}
          secondCard={secondCard}
          rootCardPress={rootCardPress}
          resultDisplay={resultDisplay}
        />

        {/* {questionType === 'Interval?' ? (
          <Question
            firstCard={returnRandomCard(keys)}
            secondCard={returnRandomCard(intervals)}
            rootCardPress={rootCardPress}
          />
        ) : questionType === 'Note' ? (
          <Question
            firstCard={returnRandomCard(noteNames)}
            secondCard={returnRandomCard(noteNames)}
            rootCardPress={rootCardPress}
          />
        ) : (
          <Question
            firstCard={returnRandomCard(keys)}
            secondCard={returnRandomCard(intervals)}
            rootCardPress={rootCardPress}
          />
        )} */}
      </View>
      {displayInputCardArray && (
        <DisplayCardsGrid cardsArray={displayInputCardArray} />
      )}
      {/* <Text style={styles.answer}>
        {resultDisplay ? 'CORRECT!' : 'Less correct'}
      </Text> */}
    </>
  )
}

export default QuestionHolder
