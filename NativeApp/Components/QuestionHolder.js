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
import QuestionButtons from './QuestionButtons.js'
import Circle from './Circle.js'
import QuestionCards from './QuestionCards.js'
import ButtonsDroneOptions from './ButtonsDroneOptions.js'
import ButtonsQuestionOptions from './ButtonsQuestionOptions.js'
import PickShape from './PickShape.js'
import { SynthDrones, DoubleBassDrones } from '../data/DroneAudioSources.js'
//
import {
  getIntervalCardsAsNotes,
  findNoteEquivalent,
  cardReducer,
} from '../functions/functions.js'

import { noteAudioSrc } from '../data/NotesAudiosSrc.js'
import { FlatList } from 'react-native-gesture-handler'

const stylesBool = false
const newAnswerDelay = 2000
// let annotatedCardDisplay = false
let attemptCount = 0
let droneType = true


const QuestionHolder = ({
  bgColor,
  secondaryColor,
  questionType,
  setAnnotatedCard,
  annotatedCard,
  annotated,
  isRandom,
}) => {
  //questionType will refer to what the middle card is
  //TO DO go over all this state and cut down what we need/don't need
  //TO DO -card randomiser logic
  //BLank card animate deal on new question load - something to do with scale/sharedvalue and the flipping animation
  const [reloadBool, setReloadBool] = useState(false)
  const [displayInputCardArray, setDisplayInputCardArray] = useState()
  const [firstCard, setFirstCard] = useState()
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)
  const [abBool, setabBool] = useState(true)
  const [secondCard, setSecondCard] = useState()
  const [correctAnswer, setCorrectAnswer] = useState()
  const [userAnswer, setUserAnswer] = useState()
  const [userScore, setUserScore] = useState(0)
  const setScoreSircleInit = Array(12).fill(false)
  const [scoreCircles, setScoreSircle] = useState(setScoreSircleInit)
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  const [showQuestionOptions, setShowQuestionOptions] = useState(false)
  const [showDroneOptions, setShowDroneOptions] = useState(false)
  ///

  const { width, height } = useWindowDimensions()

  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5

  // console.log('c ans:', correctAnswer)
  useEffect(() => {
    //TO DO dry this up, probs shouldn't be an effect
    let droneSrc
    let answerObj = cardReducer(questionType, abBool)

    if (isRandom) {
      answerObj = randomiseQuestion()
    }
    const { firstCard, secondCard, array, answer } = answerObj
    //////////
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

  function randomiseQuestion() {
    let questionType = Math.floor(Math.random() * (3 - 1 + 1)) + 1
    questionType =
      questionType === 1 ? 'Key' : questionType === 1 ? 'Key' : 'Interval'
    let bool = Math.random() > 0.5 ? true : false
    console.log(bool, questionType)
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
  function droneReload() {}

  function questionCardPress() {
    questionType === 'Note'
      ? setQuestionType('Interval')
      : setQuestionType('Note')

    //old drone swithc
  }

  function reload() {
    setReloadBool((x) => !x)
  }

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

  //Question Button functions
  // function showQuestionTypes() {
  //   showDroneOptions ? setShowDroneOptions(false) : ''
  //   setShowQuestionOptions((x) => (x = !x))
  // }
  // function showDroneSwap() {
  //   showQuestionOptions ? setShowQuestionOptions(false) : ''
  //   setShowDroneOptions((x) => (x = !x))
  // }

  function selectDroneAudio() {
    droneType = !droneType
    getAndSetDroneAudioSource(firstCard.value)
  }

  function getAndSetDroneAudioSource(card) {
    let droneAudioType = droneType ? DoubleBassDrones : SynthDrones
    let source = findNoteEquivalent(card, droneAudioType)
    setDroneAudioSrc(source)
  }

  function droneOnOff() {
    dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
  }

  return (
    <>
      <DronePlayer
        rootValue={droneAudioSrc?.audioSrc}
        dronePlaying={dronePlaying}
        reload={droneReload}
        style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
      />

      <Text style={[styles.answer, { backgroundColor: secondaryColor }]}>
        {scoreCircles.map((x, idx) => {
          let questionNo = idx === attemptCount ? true : false
          // console.log({ questionNo })
          return (
            <Circle
              fillBool={x}
              scoreCircleRadius={10}
              underLine={questionNo}
            />
          )
        })}

        {'|| Score: ' + userScore + '/12'}
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
          {!isRandom && <PickShape questionAB={questionAB} />}
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

          {showDroneOptions && (
            <View
              style={[
                {
                  ...styles.questionButtons,
                  height: cardHeight,
                  width: cardWidth,
                },
              ]}
            >
              <ButtonsDroneOptions
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
                stopDrone={rootCardPress}
                droneStopButton={dronePlaying}
                selectDroneAudio={selectDroneAudio}
              />
            </View>
          )}
          {showQuestionOptions && (
            <View
              style={[
                {
                  ...styles.questionButtons,
                  height: cardHeight,
                  width: cardWidth,
                },
              ]}
            >
              <ButtonsQuestionOptions
                reload={reload}
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
                changeQuestionType={changeQuestionType}
              />
            </View>
          )}
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
          />
        )}
      </View>
    </>
  )
}

export default QuestionHolder

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
    alignItems: 'flex-end',
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
  questionButtonsPlaceHolder: {
    flex: 1,
    backgroundColor: 'purple',
    paddingHorizontal: 0,
    flexDirection: 'column',
    margin: 5,
    justifyContent: 'center',
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

  button: {
    flex: 1,

    // position: 'absolute',
    // width: 120,
    // height: 225,
    margin: 4,
    padding: 3,
    //for icon cards
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    //
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomWidth: 0,
    // backgroundColor: 'white', //#003399',
    //
    // shadowColor: 'black',
    // shadowOffset: { width: 2, height: 1.5 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // Android Elevation
    elevation: 5,
  },
  buttonText: {
    flex: 1,
    padding: 2,
    margin: 1,
    flexWrap: 'wrap',
    color: 'purple',

    // fontWeight: 150,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
})
