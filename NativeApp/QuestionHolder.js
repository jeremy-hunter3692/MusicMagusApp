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
        style={[
          styles.qCardsAndButtonsCont,
          stylesBool && styles.qCardsButtonBorder,
        ]}
      >
        <View
          style={[
            styles.questionCardsCont,
            stylesBool && styles.questionCardsBorder,
          ]}
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
            style={[
              {
                ...styles.questionButtons,
                maxHeight: cardHeight,
                width: cardHeight * 0.66,
              },

              stylesBool && {
                ...styles.questionButtonsBorder,
                maxHeight: cardHeight,
                width: cardHeight * 0.66,
              },
            ]}
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
        style={[
          styles.displayCardsGrid,
          stylesBool && styles.displayCardsGridBorder,
        ]}
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  qCardsButtonBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  questionCardsCont: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
 
    margin: 0,
    padding: 0,
  },
  questionCardsBorder: {
    borderWidth: 5,
    borderColor: 'blue',
  },
  questionButtons: {
    flex: 0.75,
    flexDirection: 'column',
    marginHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 15,
  },
  questionButtonsBorder: {
    backgroundColor: 'red',
    borderColor: 'yellow',
  },

  displayCardsGrid: {
    flex: 2,
    margin: 0,
    padding: 0,
  },

  displayCardsGridBorder: {
    borderWidth: 1,
    borderColor: 'white',
  },
  answer: {
    margin: 0,
    marginBottom: 3,
    padding: 0,
    flex: 0.25,
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center',
  },
})
