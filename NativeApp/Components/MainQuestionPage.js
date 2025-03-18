import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
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
  returnAnswerType,
} from '../functions/functions.js'

import { noteAudioSrc } from '../data/NotesAudiosSrc.js'

const stylesBool = false // true
const newAnswerDelay = 1000

let questionNumber = 10
let secondAttmept = false
let droneType = true
let userScore = 10
let isReloading = false

//questionType will refer to what the middle card is
//TO DO go over all this state and cut down what we need/don't need

const MainQuestionPage = ({
  bgColor,
  secondaryColor,
  questionType,
  setAnnotatedCard,
  annotatedCard,
  annotated,
  isRandom,
  isAnimated,
  test,
}) => {
  const [firstCard, setFirstCard] = useState()
  const [secondCard, setSecondCard] = useState()
  const [displayInputCardArray, setDisplayInputCardArray] = useState()
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)
  const [abBool, setabBool] = useState(true)
  const [reloadBool, setReloadBool] = useState(false)

  const [correctAnswer, setCorrectAnswer] = useState()
  const [userAnswer, setUserAnswer] = useState()
  const [userScoreDisplay, setScoreDisplay] = useState(0)
  const setScoreSircleInit = Array(12).fill(null)
  const [scoreCircles, setScoreSircle] = useState(setScoreSircleInit)
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  ///
  const { width, height } = useWindowDimensions()

  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5

  const testUseTemp = test
  useEffect(() => {
    //let droneSrc
    let answerObj = cardReducer(questionType, abBool)
    console.log(answerObj)
    if (isRandom) {
      answerObj = randomiseQuestion()
    }
    const { firstCard, secondCard, array, answer } = answerObj
    setUserAnswer(null)
    // getAndSetDroneAudioSource(firstCard.value)
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

  function reload() {
    setReloadBool((x) => !x)
  }

  function gameOver() {
    userScore = 0
    secondAttmept = false
    questionNumber = 0
    reload()
    setScoreSircle(setScoreSircleInit)
    setScoreDisplay(0)
    // setScoreDisplay('')
  }

  function reloadTimeOut() {
    isReloading = true
    setTimeout(() => {
      reload()
      isReloading = false
    }, newAnswerDelay)
  }

  // function firstAttmpetCorrect() {
  //   console.log('first')
  //   setScoreSircle((prevArry) => {
  //     const updatedArr = [...prevArry]
  //     updatedArr[questionNumber - 1] = true
  //     return updatedArr
  //   })
  //   userScore++
  //   questionNumber++
  //   questionNumber < 11 ? reloadTimeOut() : console.log('over 11')
  // }

  // function secondAttemptCorrect() {
  //   console.log('second')
  //   setScoreSircle((prevArry) => {
  //     const updatedArr = [...prevArry]
  //     updatedArr[questionNumber - 1] = false
  //     return updatedArr
  //   })
  //   questionNumber < 11 ? reloadTimeOut() : console.log('over 11')
  // }
  // function userAnswerSetter(inpt) {
  //   // console.log('user', { inpt })
  //   if (isReloading) {
  //     return
  //   } else {
  //     if (!secondAttmept) {
  //       if (correctAnswer?.name == inpt.name) {
  //         setScoreSircle((prevArry) => {
  //           const updatedArr = [...prevArry]
  //           updatedArr[questionNumber] = true
  //           return updatedArr
  //         })
  //         userScore++
  //         questionNumber++
  //         reloadTimeOut()
  //       } else {
  //         secondAttmept = true
  //       }
  //     } else {
  //       if (correctAnswer?.name == inpt.name) {
  //         setScoreSircle((prevArry) => {
  //           const updatedArr = [...prevArry]
  //           updatedArr[questionNumber] = false
  //           return updatedArr
  //         })
  //         questionNumber++
  //         reloadTimeOut()
  //       } else {
  //         secondAttmept = true
  //         questionNumber++
  //         reloadTimeOut()
  //       }
  //       if (questionNumber > 11) {
  //         setScoreDisplay(`${userScore}/12 ||` + returnScoreText(userScore))
  //         isReloading = true
  //       }
  //     }
  //   }
  // }
  function userAnswerSetter(inpt) {
    if (isReloading) {
      return
    } else {
      const { attempt, incrementQuestionNo, shouldReload, whichCircle } =
        returnAnswerType(inpt, correctAnswer, secondAttmept)
      secondAttmept = attempt

      setScoreSircle((prevArry) => {
        const updatedArr = [...prevArry]
        updatedArr[questionNumber] = whichCircle
        return updatedArr
      })
      incrementQuestionNo ? questionNumber++ : ''
      shouldReload && questionNumber < 12 ? reloadTimeOut() : ''
      whichCircle ? userScore++ : ''

      if (questionNumber > 11) {
        setScoreDisplay(userScore)
        isReloading = true
      }
    }
  }

  // *******THIS WAS TEMP TAKEN OUT FOR TESTS function selectDroneAudio() {
  //   droneType = !droneType
  //   getAndSetDroneAudioSource(firstCard.value)
  // }

  // function getAndSetDroneAudioSource(card) {
  //   let droneAudioType = droneType ? DoubleBassDrones : SynthDrones
  //   let source = findNoteEquivalent(card, droneAudioType)
  //   setDroneAudioSrc(source)
  // }

  // function droneOnOff() {
  //   dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
  // }

  return (
    <>
      <Text
        testID="scoreTempTest"
        style={[styles.answer, { backgroundColor: secondaryColor }]}
      >
        {scoreCircles.map((x, idx) => {
          let questionNo = idx === questionNumber ? true : false
          return (
            <Circle
              fillBool={x}
              scoreCircleRadius={10}
              key={idx}
              underLine={questionNo}
            />
          )
        })}
        {'::' + userScoreDisplay}
      </Text>
      <DronePlayer
        rootValue={droneAudioSrc?.audioSrc}
        dronePlaying={dronePlaying}
        reload={droneReload}
        style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
      />
      <View
        style={[styles.topRowCards, stylesBool && styles.topRowCardsBorder]}
      >
        {
          <View
            style={{
              width: cardWidth,
              height: cardHeight,
              // borderColor: 'white',
              // borderWidth: 1,
            }}
          ></View>
        }

        <View style={{ width: cardWidth, height: cardHeight }}>
          {!isRandom ? (
            <PickShape questionAB={questionAB} width={cardWidth} />
          ) : (
            ' '
          )}
        </View>

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
            score={userScoreDisplay}
            newRound={gameOver}
          />
        )}
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
            // findNoteFunction={getAudioSrcIdxFromCardReducer}
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
  topRowCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 0,
    padding: 0,
  },
  topRowCardsBorder: {
    flex: 1,

    flexDirection: 'row',

    borderWidth: 3,
    borderColor: 'white',
    margin: 0,
    padding: 0,
  },
  questionCardsCont: {
    flexDirection: 'row',
    // justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  questionCardsBorder: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'blue',
  },
  questionButtons: {
    flex: 1,
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
