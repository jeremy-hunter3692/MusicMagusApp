import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
} from 'react-native'
//
import DronePlayer from './DronePlayer.js'
import DisplayCardsGrid from './DisplayCardsGrid.js'
import Circle from './Circle.js'
import QuestionCards from './QuestionCards.js'
import PickShape from './PickShape.js'
import { SynthDrones, DoubleBassDrones } from '../data/DroneAudioSources.js'
//
import {
  getIntervalCardsAsNotes,
  findNoteEquivalent,
  cardReducer,
} from '../functions/functions.js'

import { noteAudioSrc } from '../data/NotesAudiosSrc.js'

const stylesBool = false
const newAnswerDelay = 2000
let attemptCount = 0
let droneType = true

const MainQuestionPage = ({
  bgColor,
  secondaryColor,
  questionType,
  setAnnotatedCard,
  annotatedCard,
  annotated,
  isRandom,
  isAnimated,
}) => {
  //questionType will refer to what the middle card is
  //TO DO go over all this state and cut down what we need/don't need

  const [firstCard, setFirstCard] = useState()
  const [secondCard, setSecondCard] = useState()
  const [displayInputCardArray, setDisplayInputCardArray] = useState()
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)
  const [abBool, setabBool] = useState(true)
  const [reloadBool, setReloadBool] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState()
  const [userAnswer, setUserAnswer] = useState()
  const [userScore, setUserScore] = useState(0)
  const setScoreSircleInit = Array(12).fill(false)
  const [scoreCircles, setScoreSircle] = useState(setScoreSircleInit)
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  ///
  const { width, height } = useWindowDimensions()

  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5

  useEffect(() => {
    //let droneSrc
    let answerObj = cardReducer(questionType, abBool)
    if (isRandom) {
      answerObj = randomiseQuestion()
    }
    const { firstCard, secondCard, array, answer } = answerObj

    getAndSetDroneAudioSource(firstCard.value)
    setDisplayInputCardArray(array)
    setFirstCard(firstCard)
    setSecondCard(secondCard)
    setCorrectAnswer(array[answer])
  }, [questionType, reloadBool, abBool, isRandom])

  function questionAB(bool) {
    //TO DO clear timeout/question change here
    setabBool(bool)
  }
  //TO DO CHECK THIS
  function randomiseQuestion() {
    let questionType = Math.floor(Math.random() * 3) + 1
    questionType =
      questionType === 1 ? 'Key' : questionType === 1 ? 'Key' : 'Interval'
    return cardReducer(questionType, abBool)
  }

  function getAudioSrcIdxFromCardReducer(cardAny) {
    let audioSrcIdx =
      questionType === 'Note'
        ? getAudioSrcInterval(cardAny)
        : findNoteEquivalent(cardAny, noteAudioSrc)
    // audioSrcIdx = getAltOctaveNotes(audioSrcIdx, firstCard)
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
  function droneReload() {
    console.log('make this funciton/check if I actually need it')
  }
  function questionCardPress() {
    console.log('make this funciton/check if I actually need it')
  }

  // function reload() {
  //   setReloadBool((x) => !x)
  // }

  function userAnswerSetter(inpt) {
    setUserAnswer(inpt)
    if (attemptCount > 10) {
      attemptCount = 0
      setScoreSircle(setScoreSircleInit)
      setUserScore('!!!!!!!!!!1RESTARTING!!!!!!!!!!!!')
      // let newBlankArray = setScoreSircle()
      setTimeout(() => {
        setUserScore(0)
      }, 3000)
    } else {
      attemptCount = attemptCount + 1
    }
    if (correctAnswer?.name == inpt.name) {
      scoreCircles.pop()
      scoreCircles.unshift(true)
      setUserScore((x) => x + 1)
      setTimeout(() => {
        setReloadBool((x) => (x = !x))
      }, newAnswerDelay)
    }
  }

  function selectDroneAudio() {
    droneType = !droneType
    getAndSetDroneAudioSource(firstCard.value)
  }

  function getAndSetDroneAudioSource(card) {
    let droneAudioType = droneType ? DoubleBassDrones : SynthDrones
    let source = findNoteEquivalent(card, droneAudioType)
    setDroneAudioSrc(source)
  }

  // function droneOnOff() {
  //   dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
  // }

  return (
    <>
      <Text style={[styles.answer, { backgroundColor: secondaryColor }]}>
        {scoreCircles.map((x, idx) => {
          let questionNo = idx === attemptCount ? true : false
          return (
            <Circle
              fillBool={x}
              scoreCircleRadius={10}
              key={idx}
              underLine={questionNo}
            />
          )
        })}

        {/* {'|| Score: ' + userScore + '/12'} */}
      </Text>
      <DronePlayer
        rootValue={droneAudioSrc?.audioSrc}
        dronePlaying={dronePlaying}
        reload={droneReload}
        style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
      />
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
          {/* {!isRandom && <PickShape questionAB={questionAB} />} */}
          {firstCard?.value && (
            <QuestionCards
              bgColor={bgColor}
              secondaryColor={secondaryColor}
              firstCard={firstCard}
              secondCard={secondCard}
              rootCardPress={questionCardPress}
              resultDisplay={userAnswer?.name === correctAnswer?.name}
              answerCardOnPress={answerCardOnPress}
              answer={correctAnswer}
              cardSize={{ cardWidth: cardWidth, cardHeight: cardHeight }}
              annotated={annotated}
              setAnnotatedCard={setAnnotatedCard}
              animated={isAnimated}
            />
          )}

          <View
            style={[
              {
                ...styles.questionButtons,
                height: cardHeight,
                width: cardWidth,
              },
            ]}
          ></View>
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
            cardSize={{ cardWidth: cardWidth, cardHeight: cardHeight }}
            stylesBool={stylesBool}
            cardsArray={displayInputCardArray}
            userAnswerSetter={userAnswerSetter}
            findNoteFunction={getAudioSrcIdxFromCardReducer}
            reDeal={firstCard}
            isAnimated={isAnimated}
          />
        )}
      </View>
    </>
  )
}

export default MainQuestionPage

const styles = StyleSheet.create({
  answer: {
    margin: 0,
    fontWeight: 'bold',
    flex: 0.1,
    color: 'white',
    backgroundColor: '#19af59',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  qCardsAndButtonsCont: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  qCardsButtonBorder: {
    borderWidth: 3,
    borderColor: 'red',
  },
  questionCardsCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  questionCardsBorder: {
    borderWidth: 3,
    borderColor: 'blue',
  },
  questionButtons: {
    flex: 1,
    // backgroundColor: 'white',
    // paddingHorizontal: 0,
    // flexDirection: 'column',
    // margin: 5,
    // justifyContent: 'center',
    // borderRadius: 15,
    // shadowColor: 'grey',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.9,
    // shadowRadius: 2,
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
})
