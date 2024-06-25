import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
//
import DisplayCardsGrid from './DisplayCardsGrid.js'
import QuestionButtons from './QuestionButtons.js'
import Question from './Question.js'
//
import { returnRandomCard } from './functions/functions'
import { intervals } from './data/IntervalCards.js'
import { keys } from './data/KeyCards.js'
import { noteNames } from './data/NoteCards.js'

const QuestionHolder = () => {
  //questionType will refer to what the middle card is
  const [questionType, setQuestionType] = useState('Interval')
  const [displayInputCardArray, setDisplayInputCardArray] = useState(noteNames)
  const [dronePlaying, setDronePlaying] = useState(true)

  //Might not need, props should re load the children correctly...?
  // const [reload, setRoload] = useState
  useEffect(() => {
    let arrayTemp =
      questionType === 'Interval'
        ? noteNames
        : questionType === 'Note'
        ? intervals
        : keys
    setDisplayInputCardArray(arrayTemp)
  }, [questionType])

  function changeQuestionType(inpt) {
    let type = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    setQuestionType(type)
  }

  function rootCardPress() {
    droneOn ? setDroneOn(false) : setDroneOn(true)
  }

  function reload() {}
  function stopDrone() {}
  return (
    <>
      <View style={{ backgroundColor: 'yellow' }}>
        <QuestionButtons
          changeQuestionType={changeQuestionType}
          reload={reload}
          stopDrone={stopDrone}
        />
        {questionType === 'Interval?' ? (
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
        )}
      </View>
      {displayInputCardArray && (
        <DisplayCardsGrid cardsArray={displayInputCardArray} />
      )}
    </>
  )
}

export default QuestionHolder
