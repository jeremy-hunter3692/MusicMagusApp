import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
//
import DronePlayer from './DronePlayer.js'
import DisplayCardsGrid from './DisplayCardsGrid.js'
import QuestionButtons from './QuestionButtons.js'
import QuestionCards from './QuestionCards.js'
//
import {
  distanceUpInIntervals,
  returnRandomCard,
  getIntervalCardsAsNotes,
  getNoteCardIdxFromIntervalAndKeyCard,
  intervalOfWhatKey,
  getAltOctaveNotes,
  findNoteEquivalent,
} from './functions/functions'
import { intervals } from './data/IntervalCards.js'
import { keys } from './data/KeyCards.js'
import { noteNames } from './data/NoteCards.js'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'
const stylesBool = false
const QuestionHolder = () => {
  //questionType will refer to what the middle card is
  const [questionType, setQuestionType] = useState('Interval')
  const [reloadBool, setReloadBool] = useState(false)
  const [displayInputCardArray, setDisplayInputCardArray] = useState(noteNames)
  const [firstCard, setFirstCard] = useState(() => returnRandomCard(keys))
  const [secondCard, setSecondCard] = useState(() =>
    returnRandomCard(intervals, true)
  )
  const [correctAnswer, setCorrectAnswer] = useState()
  const [userAnswer, setUserAnswer] = useState()

  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  console.log('c ans:', correctAnswer)
  useEffect(() => {
    let arrayTemp = []
    let firstCardTemp = returnRandomCard(keys)
    let secondCardTemp = 0
    let answerIdxTemp = 0

    if (questionType === 'Interval') {
      arrayTemp = noteNames
      // firstCardTemp = returnRandomCard(keys)
      secondCardTemp = returnRandomCard(intervals, true)
      answerIdxTemp = getNoteCardIdxFromIntervalAndKeyCard(
        firstCardTemp.idx,
        secondCardTemp.idx
      )
    } else if (questionType === 'Note') {
      arrayTemp = intervals
      // firstCardTemp = returnRandomCard(keys)
      secondCardTemp = returnRandomCard(noteNames, true)
      answerIdxTemp = distanceUpInIntervals(
        firstCardTemp.idx,
        secondCardTemp.idx
      )
    } else if (questionType === 'Key') {
      arrayTemp = keys
      firstCardTemp = {
        value: {
          ...firstCardTemp.value,
          imgSrc: noteNames[firstCardTemp.idx].imgSrc,
        },
        idx: firstCardTemp.idx,
      }

      secondCardTemp = returnRandomCard(intervals, true)
      answerIdxTemp = intervalOfWhatKey(firstCardTemp.idx, secondCardTemp.idx)
    }
    //////////
    setDisplayInputCardArray(arrayTemp)
    setFirstCard(firstCardTemp)
    setSecondCard(secondCardTemp)
    setCorrectAnswer(arrayTemp[answerIdxTemp])
  }, [questionType, reloadBool])

  function getAudioSrcIdxFromCardReducer(cardAny) {
    let audioSrcIdx =
      questionType === 'Note'
        ? getAudioSrcInterval(cardAny)
        : findNoteEquivalent(cardAny, noteAudioSrc)
    audioSrcIdx = getAltOctaveNotes(audioSrcIdx, firstCard)
    return audioSrcIdx
  }

  function answerCardOnPress() {
    let answer = getAudioSrcIdxFromCardReducer(correctAnswer)
    return answer
  }

  function getAudioSrcInterval(intervalCard) {
    let audioSrc = getIntervalCardsAsNotes(intervalCard, firstCard)
    return audioSrc
  }

  function droneReload() {}

  function changeQuestionType(inpt) {
    let type = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    setQuestionType(type)
  }

  function rootCardPress() {
    //to do error with sound not loaded on pressing this
    dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
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
      <View>
        <DronePlayer
          rootValue={firstCard?.value.audioSrc}
          dronePlaying={dronePlaying}
          reload={droneReload}
        />
        <View
          style={
            stylesBool ? styles.qCardsButtonBorder : styles.qCardsAndButtonsCont
          }
        >
          <View
            style={
              stylesBool ? styles.questionCardsBorder : styles.questionCardsCont
            }
          >
            <QuestionCards
              firstCard={firstCard}
              secondCard={secondCard}
              rootCardPress={rootCardPress}
              resultDisplay={userAnswer?.name === correctAnswer?.name}
              answerCardOnPress={answerCardOnPress}
              answer={correctAnswer}
            />
            <View
              style={
                stylesBool
                  ? styles.questionButtonsBorder
                  : styles.questionButtons
              }
            >
              <QuestionButtons
                changeQuestionType={changeQuestionType}
                reload={reload}
                stopDrone={stopDrone}
              />
            </View>
          </View>
        </View>

        <View
          style={
            stylesBool ? styles.displayCardsGridBorder : styles.displayCardsGrid
          }
        >
          {displayInputCardArray && (
            <DisplayCardsGrid
              stylesBool={stylesBool}
              cardsArray={displayInputCardArray}
              userAnswerSetter={userAnswerSetter}
              findNoteFunction={getAudioSrcIdxFromCardReducer}
            />
          )}

          <Text style={styles.answer}>
            {userAnswer?.name === correctAnswer?.name
              ? 'CORRECT!'
              : 'Less correct'}
          </Text>
        </View>
      </View>
    </>
  )
}

export default QuestionHolder

const styles = StyleSheet.create({
  qCardsAndButtonsCont: {
    flex: 0.5,
    flexDirection: 'row',
    // justifyContent: 'cen÷ter',
    alignItems: 'flex-end',
    margin: 0,
  },
  qCardsButtonBorder: {
    flex: 0.5,
    flexDirection: 'row',
    // justifyContent: 'c÷nter',
    alignItems: 'flex-end',
    margin: 0,
    //
    borderWidth: 1,
    borderColor: 'red',
  },
  questionCardsCont: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    marginRight: 0,
    padding: 0,
  },
  questionCardsBorder: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    marginRight: 0,
    padding: 0,
    //
    borderWidth: 1,
    borderColor: 'blue',
  },
  questionButtons: {
    // flex: 1,
    minHeight: 200,
    minWidth: 100,
    flexShrink: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  questionButtonsBorder: {
    // flex: 1,
    minHeight: 200,
    minWidth: 100,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayCardsGrid: { flex: 1, marginTop: 0 },

  displayCardsGridBorder: {
    flex: 1,
    marginTop: 0,
    borderWidth: 1,
    borderColor: 'white',
  },
  answer: {
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center',
    flex: 0.25,
  },
})
