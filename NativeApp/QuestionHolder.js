import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native'
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
  //TO DO go over all this state and cut down what we need/don't need
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
  const { width, height } = useWindowDimensions()
  const cardHeight = width * 0.13 * 1.5
  // console.log('c ans:', correctAnswer)
  useEffect(() => {
    //TO DO dry this up, probs shouldn't be an effect
    let arrayTemp = []
    let firstCardTemp = returnRandomCard(keys)
    let secondCardTemp = 0
    let answerIdxTemp = 0

    if (questionType === 'Interval') {
      arrayTemp = noteNames
      secondCardTemp = returnRandomCard(intervals, true)
      answerIdxTemp = getNoteCardIdxFromIntervalAndKeyCard(
        firstCardTemp.idx,
        secondCardTemp.idx
      )
    } else if (questionType === 'Note') {
      arrayTemp = intervals
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
  //TO DO Think this isn't needed?
  function droneReload() {}

  function changeQuestionType(inpt) {
    let type = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    setQuestionType(type)
  }

  function rootCardPress() {
    dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
  }

  function reload() {
    setReloadBool((x) => !x)
  }

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
  }

  return (
    <>
      <DronePlayer
        rootValue={firstCard?.value.audioSrc}
        dronePlaying={dronePlaying}
        reload={droneReload}
        style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
      />
      <Text style={styles.answer}>
        {userAnswer?.name === correctAnswer?.name ? 'CORRECT!' : 'Less correct'}
      </Text>
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
                ? {
                    ...styles.questionButtonsBorder,
                    maxHeight: cardHeight,
                    width: cardHeight * 0.66,
                  }
                : {
                    ...styles.questionButtons,
                    maxHeight: cardHeight,
                    width: cardHeight * 0.66,
                  }
            }
          >
            <QuestionButtons
              changeQuestionType={changeQuestionType}
              reload={reload}
              stopDrone={rootCardPress}
              droneStopButton={dronePlaying}
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
      </View>
    </>
  )
}

export default QuestionHolder

const styles = StyleSheet.create({
  qCardsAndButtonsCont: {
    flexDirection: 'row',
    // justifyContent: 'cen÷ter',
    alignItems: 'flex-end',
    margin: 0,
    padding: 0,
  },
  qCardsButtonBorder: {
    flexDirection: 'row',
    // justifyContent: 'c÷nter',
    alignItems: 'flex-end',
    margin: 0,
    padding: 0,
    //
    borderWidth: 1,
    borderColor: 'red',
  },
  questionCardsCont: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  questionCardsBorder: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',

    margin: 0,
    padding: 0,
    //
    borderWidth: 10,
    borderColor: 'blue',
  },
  questionButtons: {
    marginHorizontal: 5,
    flexDirection: 'column',

    justifyContent: 'center',
    overflow: 'hidden',
  },
  questionButtonsBorder: {
    marginHorizontal: 5,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  displayCardsGrid: {
    flex: 2,
    margin: 0,
  },

  displayCardsGridBorder: {
    flex: 2,

    margin: 0,
    padding: 0,
    borderWidth: 1,
    borderColor: 'white',
  },
  answer: {
    margin: 0,
    padding: 0,
    flex: 0.25,
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center',
  },
})
