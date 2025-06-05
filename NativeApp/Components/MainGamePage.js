import React, { useState, useContext } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Circle from './Circle.js'
import DronePlayer from './DronePlayer.js'
import QuestionCards from './QuestionCards.js'
import DisplayCardsGrid from './DisplayInputCardsGrid.js'
import QuestionIconButtons from './QuestionTypeIconButtons.js'
import { useGameContext, updateGameContext } from './CardsContext.js'
import AnnotatedContext from './AnnotatedContext.js'
import ThemeContext from './ThemeContext.js'

const groupedNavMargin = 0

let annotatedDisplayGridSizeChangeFactor = 0.5
let annotatedQCardsSizeChangeFactor = 1.2

const MainGamePage = ({
  setShowOptions,
  isRandomAllQuestionTypes,
  isAnimated,
  dimensions,
  randomMagusMode,
}) => {
  //TO DO put into theme?
  const { width, height } = dimensions

  //Might not need, props should re load the children correctly...?
  const [dronePlaying, setDronePlaying] = useState(true)

  const { annotatedCard, annotated, setAnnotatedCard, setAnnotatedMode } =
    useContext(AnnotatedContext)

  const {
    cardSize: { cardWidth, cardHeight },
    theme,
    font: { fontScale, fontStyle },
  } = useContext(ThemeContext)

  const {
    displayInputCardArray,
    droneAudioSrc,
    scoreCircles,
    questionNumber,
    choosingKey,
    attemptCount,
  } = useGameContext()

  const { setRandomisedQuestionsSameType } = updateGameContext()
  const scoreCirclesSize = height / 20
  function droneOnOff() {
    dronePlaying ? setDronePlaying(false) : setDronePlaying(true)
  }

  function questionAB(bool) {
    //TO DO clear timeout/question change here
    clearTimeout(globalQuestionTimeOutID)
    setabBool(bool)
    resetForNewGame()
    // reloadTimeOut(true)
  }

  //TO DO Think this isn't needed?
  function droneReload() {}

  function initCardSizeChanges() {
    annotatedDisplayGridSizeChangeFactor = 0.5
    annotatedQCardsSizeChangeFactor = 1.2
  }

  function choosingKeyCardSizes() {
    annotatedDisplayGridSizeChangeFactor = 0.9
    annotatedQCardsSizeChangeFactor = 0.8
  }

  function annotatedButtonClick() {
    //TO DO double check this
    choosingKey && annotated ? choosingKeyCardSizes() : initCardSizeChanges()
    setAnnotatedMode()
  }


  const styles = StyleSheet.create({
    scoreCircles: {
      margin: 0,
      fontWeight: 'bold',
      flex: 0.1,
      color: 'white',
      flexDirection: 'row',
      backgroundColor: '#19af59',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    topRowCards: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      padding: 0,
    },
    emptyCardPlaceHolder: {
      width: cardWidth,
      height: cardHeight,
      margin: 0,
      padding: 0,
    },
    questionCardsCont: {
      flexDirection: 'row',
      margin: 0,
      padding: 0,
    },
    displayCardsGrid: {
      justifyContent: 'flex-end',
      flex: 2,
      margin: 2,
      padding: 0,
    },
    annotatedText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: fontScale,
    },
    choosingKeyText: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
    },
    chooseRandomText: randomMagusMode,
  })

  return (
    <>
      <View
        style={{
          flex: 0.3,
          padding: 0,
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          backgroundColor: theme.secondaryColor,
          margin: groupedNavMargin,
        }}
      >
        <View
          style={{
            margin: groupedNavMargin,
            padding: 0,
            flex: 0.3,
            fontWeight: 'bold',
            color: 'white',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <View
            style={{
              margin: groupedNavMargin,
              padding: 0,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              margin: groupedNavMargin,
            }}
          >
            {!annotatedCard ? (
              <Pressable onPress={() => setShowOptions()}>
                <Text style={styles.optionText}>Options {'  '}</Text>
              </Pressable>
            ) : (
              ''
            )}
            <Pressable
              onPress={() => annotatedButtonClick()}
              style={[
                {},
                !annotatedCard && {
                  backgroundColor: 'white',
                  width: scoreCirclesSize,
                  height: scoreCirclesSize,
                  borderRadius: scoreCirclesSize,
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Text style={{ color: theme.primaryColor }}>?</Text>
            </Pressable>
          </View>
        </View>
        <View
          testID="scoreTempTest"
          style={[
            styles.scoreCircles,
            {
              backgroundColor: theme.secondaryColor,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              margin: groupedNavMargin,
              padding: 0,
            },
          ]}
        >
          {scoreCircles.map((x, idx) => {
            let questionNo = idx === questionNumber ? true : false
            return (
              <Circle
                fillBool={x}
                scoreCircleRadius={scoreCirclesSize}
                key={idx}
                underLine={questionNo}
                circlesInsideColor={theme.secondaryColor}
              />
            )
          })}
        </View>
        <View
          style={{
            flex: 0.3,
            margin: groupedNavMargin,
            padding: 0,
            justifyContent: 'center',
          }}
        >
          {!isRandomAllQuestionTypes ? (
            <QuestionIconButtons groupedNavMargin={groupedNavMargin} />
          ) : (
            <Text>Randomised Questions</Text>
          )}
        </View>
      </View>

      {droneAudioSrc && dronePlaying ? (
        <DronePlayer
          rootValue={droneAudioSrc}
          dronePlaying={dronePlaying}
          reload={droneReload}
          style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
        />
      ) : (
        ''
      )}
      {annotated && (
        <View
          style={{
            flex: 0.75,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <View>
            <Text style={[styles.annotatedText, { fontSize: fontScale * 0.8 }]}>
              Key Interval Note
            </Text>

            <Text style={styles.annotatedText}>
              ↑ Change question type here key Interval Note
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.annotatedText}>Score tracker ↑</Text>
            <Text
              style={[
                styles.annotatedText,
                { fontStyle: 'italic', fontSize: fontScale },
              ]}
            >
              Full circle for a correct answer and a dot if you got it on your
              second go
            </Text>
          </View>
          <View>
            <Text style={styles.annotatedText}>↑ Options here </Text>
          </View>
        </View>
      )}
      <View style={styles.topRowCards}>
        {annotated && <View style={styles.emptyCardPlaceHolder}></View>}
        {/* <View style={styles.emptyCardPlaceHolder}></View> MAKE ABOVE NOTE ANNOTATED TO SHIFT QCARDS ACROSS  */}
        {/* THIS HERE IS FOR THE AB BOOL VERSION <View style={styles.emptyCardPlaceHolder}>
          {!isRandom ? (<PickShape questionAB={questionAB} width={cardWidth} /> ) : (null)}</View> */}
        <QuestionCards
          cardSize={{
            cardWidth:
              annotated || choosingKey
                ? cardWidth * annotatedQCardsSizeChangeFactor
                : cardWidth,
            cardHeight:
              annotated || choosingKey
                ? cardHeight * annotatedQCardsSizeChangeFactor
                : cardHeight,
          }}
        />
      </View>
      <View style={[styles.displayCardsGrid, annotated && { marginTop: 50 }]}>
        <View style={styles.choosingKeyText}>
          {choosingKey ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.annotatedText}>
                Choose your key below ↓ or{' '}
              </Text>
              <Pressable onPress={setRandomisedQuestionsSameType}>
                <Text style={styles.chooseRandomText}> Magus Mode</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.annotatedText}> </Text>
          )}
        </View>

        {displayInputCardArray && (
          <DisplayCardsGrid
            cardSize={{
              cardWidth:
                annotated || choosingKey
                  ? cardWidth * annotatedDisplayGridSizeChangeFactor
                  : cardWidth,
              cardHeight:
                annotated || choosingKey
                  ? cardHeight * annotatedDisplayGridSizeChangeFactor
                  : cardHeight,
            }}
            cardsArray={displayInputCardArray}
          />
        )}
        {annotated && (
          <View style={styles.choosingKeyText}>
            <Text style={styles.annotatedText}>
              Choose your answer from these cards ↑
            </Text>
          </View>
        )}
      </View>
    </>
  )
}

export default MainGamePage
