import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
//
import DisplayCardsGrid from './DisplayCardsGrid.js'
import QuestionButtons from './QuestionButtons.js'
import Question from './Question.js'
//
import {
  returnRandomCard,
  getIntervalCardsAsNotes,
  getNoteCardIdxFromIntervalAndKeyCard,
  getDistBetweenTwoCardIdxs,
  intervalOfWhatKey,
  getAltOctaveNotes,
} from './functions/functions'
import { intervals } from './data/IntervalCards.js'
import { keys } from './data/KeyCards.js'
import { noteNames } from './data/NoteCards.js'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'

const QuestionHolder = () => {
  //questionType will refer to what the middle card is
  const [questionType, setQuestionType] = useState('Interval')
  const [reloadBool, setReloadBool] = useState(false)
  const [displayInputCardArray, setDisplayInputCardArray] = useState(noteNames)
  const [firstCard, setFirstCard] = useState(() => returnRandomCard(keys))
  const [secondCard, setSecondCard] = useState(() =>
    returnRandomCard(intervals)
  )
  const [correctAnswer, setCorrectAnswer] = useState()
  const [userAnswer, setUserAnswer] = useState()
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  // const [reload, setRoload] = useState

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
      answerIdxTemp = intervalOfWhatKey(firstCardTemp.idx, secondCardTemp.idx)
      // console.log('key', firstCardTemp, secondCardTemp, answerIdxTemp)
    }
    setDisplayInputCardArray(arrayTemp)
    setFirstCard(firstCardTemp)
    setSecondCard(secondCardTemp)
    setCorrectAnswer(arrayTemp[answerIdxTemp])
    // setFindFunction(funcTemp)
  }, [questionType, reloadBool])

  function getAudioSrcFromCard(cardAny) {
    let audioSrc =
      questionType === 'Interval'
        ? getAudioSrcNotes(cardAny)
        : questionType === 'Note'
        ? getIntervalCardsAsNotes()
        : findKey()

    return audioSrc
  }

  function getAudioSrcNotes(noteCard) {
    let audioSrc = findNoteEquivalent(noteCard.name)
    let correctedAudioSrc = getAltOctaveNotes(audioSrc, firstCard)
    return correctedAudioSrc
  }
  function findNoteEquivalent(inpt, array = noteAudioSrc) {
    console.log('find Notes')
    const result = array.filter((x) => x.name === inpt)
    return result[0]
  }

  function findKey() {
    console.log('temp for Find keys audio source')
  }
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

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
  }

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
          resultDisplay={userAnswer?.name === correctAnswer?.name}
          answer={correctAnswer}
        />
      </View>
      {displayInputCardArray && (
        <DisplayCardsGrid
          cardsArray={displayInputCardArray}
          userAnswerSetter={userAnswerSetter}
          findNoteFunction={getAudioSrcFromCard}
        />
      )}
      <Text style={styles.answer}>
        {userAnswer?.name === correctAnswer?.name ? 'CORRECT!' : 'Less correct'}
      </Text>
    </>
  )
}

export default QuestionHolder
const styles = StyleSheet.create({
  qCardsAndButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  questionCardsCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 0,
    marginRight: 0,
    padding: 0,
  },
  questionButtons: {
    alignItems: 'center',
    marginTop: 50,
    padding: 2,
  },

  answerCards: {
    flex: 4,
  },
  answer: {
    textAlign: 'center',
    flex: 1,
    color: 'white',
    backgroundColor: 'black',
  },
})
