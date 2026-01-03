import React, { useState, useContext, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Circle from './Circle.js'
import DronePlayer from './DronePlayer.js'
import QuestionCards from './QuestionCards.js'
import DisplayCardsGrid from './DisplayInputCardsGrid.js'
import QuestionIconButtons from './QuestionTypeIconButtons.js'
import AnnotatedContext from './AnnotatedContext.js'
import ThemeContext from './ThemeContext.js'
import { preloadSounds } from './AudioManager.js'
import { noteAudioSrc } from '../data/NotesAudiosSrc.js'

import { useGameContext, useUpdateGameContext } from './GameContext.js'

const groupedNavMargin = 1

const MainGamePage = ({ setShowOptions, buttonTheme }) => {
  //Might not need, props should re load the children correctly...?

  useEffect(() => {
    const allSingleNotes = []
    noteAudioSrc.forEach((note) => {
      allSingleNotes.push(note.audioSrc[1])
      allSingleNotes.push(note.audioSrc[2])
    })

    preloadSounds(allSingleNotes).catch((err) =>
      console.warn('preload failed', err)
    )
  })

  const { annotatedCard, annotated, setAnnotatedCard, setAnnotatedMode } =
    useContext(AnnotatedContext)

  const {
    cardSize: { cardWidth, cardHeight },
    dimensions: { width, height },
    theme,
    font: { fontScale, fontStyle },
    scoreCirclesSize,
  } = useContext(ThemeContext)

  const {
    scoreCircles,
    questionNumber,
    displayInputCardArray,
    choosingKey,
    droneAudioSrc,
    dronePlaying,
  } = useGameContext()

  const { setRandomisedQuestionsSameType } = useUpdateGameContext()

  const fontSize =
    typeof fontScale === 'number' && !isNaN(fontScale) ? fontScale : 16

  function questionAB(bool) {
    //TO DO clear timeout/question change here
    clearTimeout(globalQuestionTimeOutID)
    setabBool(bool)
    resetForNewGame()
    // reloadTimeOut(true)
  }

  function annotatedButtonClick() {
    annotatedCard
      ? setAnnotatedCard(null)
      : !annotated
      ? setAnnotatedMode(true)
      : setAnnotatedMode(false)
  }
  const navBarInset = width / 10
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      backgroundColor: theme.secondaryColor,
      marginBottom: groupedNavMargin,
      flex: 0.35,
      paddingHorizontal: navBarInset,
      marginHorizontal: -navBarInset,
    },
    leftNavBar: {
      flex: 0.3,
      margin: groupedNavMargin,
      padding: 0,
      justifyContent: 'center',
    },
    questionButtonInRightNavbar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: groupedNavMargin,
      flex: 0.4,

      padding: 0,
    },
    rightNavBar: {
      fontWeight: 'bold',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      textAlign: 'center',

      margin: groupedNavMargin,
      flex: 0.3,
      padding: 0,
    },
    optionText: {
      color: 'black',
      fontSize: fontSize,
      marginRight: 10,
    },
    scoreCircles: {
      fontWeight: 'bold',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.secondaryColor,
      margin: groupedNavMargin,
      flex: 0.6,
      padding: 0,
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

    annotatedButtonText: { color: theme.primaryColor, fontSize: fontSize },
    topAnnotatedText: {
      flex: 0.75,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    annotatedText: {
      borderWidth: 1,
      borderColor: theme.primaryColor,
      borderRadius: 8,
      padding: 2,
      color: 'white',
      fontWeight: 'bold',
      fontSize: fontSize,
      margin: 2,
    },
    scoreTrackerAnnotatedText: {
      fontSize: Math.ceil(fontSize * 0.8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    choosingKeyText: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      flexDirection: 'row',
    },

    chooseRandomText: buttonTheme,
    annotatedButton: {
      backgroundColor: 'white',
      width: scoreCirclesSize,
      height: scoreCirclesSize,
      borderRadius: scoreCirclesSize,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <>
      <View style={styles.navBar}>
        <View style={styles.rightNavBar}>
          <View style={styles.questionButtonInRightNavbar}>
            {!annotatedCard ? (
              <Pressable onPress={() => setShowOptions()}>
                <Text style={styles.optionText}>Options </Text>
              </Pressable>
            ) : null}
            {!choosingKey && (
              <Pressable
                onPress={() => annotatedButtonClick()}
                style={[{}, !annotatedCard && styles.annotatedButton]}
              >
                <Text style={styles.annotatedButtonText}>?</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View testID="scoreTempTest" style={styles.scoreCircles}>
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
        <View style={styles.leftNavBar}>
          {/* {!isRandomAllQuestionTypes ? (
            <QuestionIconButtons groupedNavMargin={groupedNavMargin} />
          ) : (
            <Text>Randomised Questions</Text>
          )} */}
        </View>
      </View>

      {dronePlaying && !annotated ? (
        <DronePlayer
          dronePlaying={dronePlaying}
          // reload={droneReload}
          style={{ flex: 0, height: 0, width: 0, margin: 0, padding: 0 }}
        />
      ) : (
        ''
      )}
      {annotated && (
        <View style={styles.topAnnotatedText}>
          <View>
            <Text
              style={[
                styles.annotatedText,
                { fontSize: fontSize * 0.6, borderWidth: 0 },
              ]}
            >
              Key Interval Note
            </Text>
            <Text style={styles.annotatedText}>
              ↑ Change question type here
            </Text>
          </View>
          <View style={styles.scoreTrackerAnnotatedText}>
            <Text
              style={[
                styles.annotatedText,
                {
                  fontStyle: 'italic',
                  fontSize: Math.ceil(fontSize * 0.6),
                  borderWidth: 0,
                },
              ]}
              numberOfLines={2}
            >
              Full circle for a correct answer and a dot if you got it on your
              second go
            </Text>
            <Text style={styles.annotatedText}>Score tracker ↑</Text>
          </View>
          <View>
            <Text
              style={[
                styles.annotatedText,
                { borderWidth: 0, fontSize: Math.ceil(fontSize * 0.6) },
              ]}
            >
              Click on the cards for more information 
            </Text>
            <Text style={styles.annotatedText}> Options here ↑ </Text>
          </View>
        </View>
      )}
      <View style={styles.topRowCards}>
        {annotated && <View style={styles.emptyCardPlaceHolder}></View>}
        {/* <View style={styles.emptyCardPlaceHolder}></View> MAKE ABOVE NOTE ANNOTATED TO SHIFT QCARDS ACROSS  */}
        {/* THIS HERE IS FOR THE AB BOOL VERSION <View style={styles.emptyCardPlaceHolder}>
          {!isRandom ? (<PickShape questionAB={questionAB} width={cardWidth} /> ) : (null)}</View> */}
        <QuestionCards />
      </View>
      <View style={styles.displayCardsGrid}>
        <>
          {choosingKey ? (
            <View style={styles.choosingKeyText}>
              <Text style={styles.annotatedText}>
                Choose a new key below ↓ or
              </Text>
              <Pressable onPress={setRandomisedQuestionsSameType}>
                <Text style={styles.chooseRandomText}> Magus Mode</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={[styles.annotatedText, { borderWidth: 0 }]}> </Text>
          )}
        </>
        {displayInputCardArray && <DisplayCardsGrid />}
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
