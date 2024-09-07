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
import QuestionCards from './QuestionCards.js'
import ButtonsDroneOptions from './ButtonsDroneOptions.js'
import ButtonsQuestionOptions from './ButtonsQuestionOptions.js'
import OptionsPage from './OptionsPage.js'
import AnnotatedCards from './AnnotatedCards.js'
import { SynthDrones, DoubleBassDrones } from '../data/DroneAudioSources.js'
//
import {
  distanceUpInIntervals,
  returnRandomCard,
  getIntervalCardsAsNotes,
  getNoteCardIdxFromIntervalAndKeyCard,
  intervalOfWhatKey,
  getAltOctaveNotes,
  findNoteEquivalent,
} from '../functions/functions.js'
import { intervals } from '../data/IntervalCards.js'
import { keys } from '../data/KeyCards.js'
import { noteNames } from '../data/NoteCards.js'
import { noteAudioSrc } from '../data/NotesAudiosSrc.js'
import CardButton from './CardButton.js'

const stylesBool = false
const newAnswerDelay = 2000
// let annotatedCardDisplay = false
let attemptCount = 0
let droneType = true

const QuestionHolder = () => {
  //questionType will refer to what the middle card is
  //TO DO go over all this state and cut down what we need/don't need
  const [questionType, setQuestionType] = useState('Interval')
  const [reloadBool, setReloadBool] = useState(false)
  const [displayInputCardArray, setDisplayInputCardArray] = useState(noteNames)
  const [firstCard, setFirstCard] = useState(() => returnRandomCard(keys))
  const [droneAudioSrc, setDroneAudioSrc] = useState(null)

  const [secondCard, setSecondCard] = useState(() =>
    returnRandomCard(intervals, true)
  )
  const [correctAnswer, setCorrectAnswer] = useState()
  const [userAnswer, setUserAnswer] = useState()
  const [userScore, setUserScore] = useState(0)
  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)
  const [showQuestionOptions, setShowQuestionOptions] = useState(false)
  const [showDroneOptions, setShowDroneOptions] = useState(false)
  const [displayOptions, setDisplayOptions] = useState(false)
  const [annotatedCard, setAnnotatedCard] = useState()
  const [annotatedCardDisplay, setAnnotatedCardDisplay] = useState(false)
  ///

  const { width, height } = useWindowDimensions()

  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = cardWidth * 1.5

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
    getAndSetDroneAudioSource(firstCardTemp.value)
    setDisplayInputCardArray(arrayTemp)
    setFirstCard(firstCardTemp)
    setSecondCard(secondCardTemp)
    setCorrectAnswer(arrayTemp[answerIdxTemp])
  }, [questionType, reloadBool])

  function setterAnnotated(inpt) {
    console.log('annotated:', inpt)
    setAnnotatedCard(inpt)
  }

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
    console.log('change top', inpt)
    let type = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    setQuestionType(type)
  }

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

    if (attemptCount >= 12) {
      attemptCount = 0
      setUserScore('!!!!!!!!!!1RESTARTING!!!!!!!!!!!!')
      setTimeout(() => {
        setUserScore(0)
      }, 3000)
    } else {
      attemptCount = attemptCount + 1
    }

    console.log({ attemptCount })
    if (correctAnswer?.name == inpt.name) {
      setUserScore((x) => x + 1)
      setTimeout(() => {
        setReloadBool((x) => (x = !x))
      }, newAnswerDelay)
    }
  }

  //Question Button functions
  function showQuestionTypes() {
    showDroneOptions ? setShowDroneOptions(false) : ''
    setShowQuestionOptions((x) => (x = !x))
  }
  function showDroneSwap() {
    showQuestionOptions ? setShowQuestionOptions(false) : ''
    setShowDroneOptions((x) => (x = !x))
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

  function droneOnOff() {
    dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
  }
  return (
    <>
      <Pressable onPress={() => setAnnotatedCardDisplay((x) => !x)}>
        <View
          style={{
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 30,
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'purple' }}>?</Text>
        </View>
      </Pressable>
      {annotatedCard ? (
        <AnnotatedCards data={annotatedCard} />
      ) : (
        <>
          <DronePlayer
            rootValue={droneAudioSrc?.audioSrc}
            dronePlaying={dronePlaying}
            reload={droneReload}
            style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
          />
          <Pressable onPress={() => setDisplayOptions((x) => !x)}>
            <Text style={{ color: 'white' }}>
              {displayOptions ? 'Back' : 'Options'}
            </Text>
          </Pressable>
          {displayOptions ? (
            <>
              <OptionsPage
                selectDroneAudio={selectDroneAudio}
                droneOnOff={droneOnOff}
                changeQuestionType={changeQuestionType}
              />
            </>
          ) : (
            <>
              <Text style={styles.answer}>
                {userAnswer?.name === correctAnswer?.name
                  ? 'CORRECT! '
                  : 'Less correct '}
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
                  <QuestionCards
                    firstCard={firstCard}
                    secondCard={secondCard}
                    rootCardPress={questionCardPress}
                    resultDisplay={userAnswer?.name === correctAnswer?.name}
                    answerCardOnPress={answerCardOnPress}
                    answer={correctAnswer}
                    cardSize={{ cardWidth: cardWidth, cardHeight: cardHeight }}
                    annotated={annotatedCardDisplay}
                    setAnnotatedCard={setterAnnotated}
                  />

                  <View
                    style={[
                      {
                        ...styles.questionButtons,
                        height: cardHeight,
                        width: cardWidth,
                      },
                    ]}
                  >
                    <View
                      style={[{ ...styles.button, backgroundColor: 'purple' }]}
                    >
                      <View
                        style={{
                          backgroundColor: 'yellow',
                          borderRadius: 10,
                          width: 50,
                          height: 50,
                        }}
                      ></View>
                    </View>
                    <View
                      style={[{ ...styles.button, backgroundColor: 'purple' }]}
                    >
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          backgroundColor: 'green',
                        }}
                      ></View>
                    </View>
                    <View
                      style={[{ ...styles.button, backgroundColor: 'purple' }]}
                    >
                      <View
                        style={{
                          width: 0,
                          height: 0,
                          // position: 'absolute',
                          top: -30,
                          borderTopWidth: 50,
                          borderRightWidth: 50,
                          borderRightColor: 'transparent',
                          borderTopColor: 'transparent',
                          borderBottomWidth: 50, // Hypotenuse of the triangle
                          borderBottomColor: 'black',
                          
                        }}
                      ></View>
                    </View>

                    {/*   CARD BUTTONS AS IMAGES
                    
                    <CardButton
                      source={keys[0].imgSrc}
                      data={1}
                      onPress={changeQuestionType}
                      cardSize={{
                        cardWidth: cardWidth * 0.75,
                        cardHeight: cardHeight * 0.75,
                      }}
                    />
                    <View style={{ position: 'absolute', left: +50, top: +40 }}>
                      <CardButton
                        source={intervals[0].imgSrc}
                        data={2}
                        onPress={changeQuestionType}
                        cardSize={{
                          cardWidth: cardWidth * 0.75,
                          cardHeight: cardHeight * 0.75,
                        }}
                      />
                    </View>
                    <View
                      style={{ position: 'absolute', left: +100, top: +80 }}
                    >
                      <CardButton
                        source={noteNames[0].imgSrc}
                        data={3}
                        onPress={changeQuestionType}
                        cardSize={{
                          cardWidth: cardWidth * 0.75,
                          cardHeight: cardHeight * 0.75,
                        }}
                      /> 
                    </View>
                    {/* <QuestionButtons
              buttonStyle={styles.button}
              buttonTextStyle={styles.buttonText}
              reload={reload}
              showQuestionTypes={showQuestionTypes}
              showDroneOptions={showDroneSwap}
            /> */}
                  </View>

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
                  {/* {!showDroneOptions && !showQuestionOptions && (
                <View
                  style={[
                    {
                      ...styles.questionButtonsPlaceHolder,
                      height: cardHeight,
                      width: cardWidth,
                    },
                  ]}
                ></View>
              )} */}
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
          )}
        </>
      )}
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
  answer: {
    margin: 0,
    fontWeight: 'bold',
    flex: 0.25,
    color: 'white',
    backgroundColor: '#19af59',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
