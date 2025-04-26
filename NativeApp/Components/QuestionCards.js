import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import CardButton from './CardButton'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import { returnScoreText } from '../functions/functions.js'

const blankCard = require('../assets/blankcard.png')

const QuestionCards = ({
  firstCard,
  secondCard,
  findNoteFunction,
  resultDisplay,
  answer,
  cardSize,
  rootCardPress,
  answerCardOnPress,
  setAnnotatedCard,
  annotated,
  isAnimated,
  displayScore,
  score,
  newRound,
  skip,
  skipQuestion,
  fontScale,
}) => {
  const flipAnswerCardAnimation = useSharedValue(0)
  const flipScoreCardAnimation = useSharedValue(0)
  useEffect(() => {
    // console.log('UseAnswer', answer)
    flipScoreCardAnimation.value = 0
    flipAnswerCardAnimation.value = 0
  }, [skip, answer])

  // Function to handle the flip

  const handleFlip = (toValue, card) => {
    const animationSpeed = 1000
    card.value = withTiming(toValue, { duration: animationSpeed })
  }
  //

  if (resultDisplay && isAnimated) {
    handleFlip(180, flipAnswerCardAnimation)
  }

  function droneSetter() {
    rootCardPress()
  }

  const frontAnimatedStyle = (card) =>
    useAnimatedStyle(() => {
      const rotateY = interpolate(
        card.value,
        [0, 180],
        [0, 180],
        Extrapolate.CLAMP
      )
      return {
        transform: [{ rotateY: `${rotateY}deg` }],
        opacity: card.value < 90 ? 1 : 0,
      }
    })

  const backAnimatedStyle = (card) =>
    useAnimatedStyle(() => {
      const rotateY = interpolate(
        card.value,
        [0, 180],
        [180, 360],
        Extrapolate.CLAMP
      )
      return {
        transform: [{ rotateY: `${rotateY}deg` }],
        opacity: card.value > 90 ? 1 : 0,
      }
    })

  function returnCorrectAnnotatedText(cardValue, abBool) {}

  const styles = StyleSheet.create({
    questionCardsCont: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
    },
    flipingCardsCont: {
      margin: 0,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    blankCard: {
      margin: 0,
      padding: 0,
      zIndex: 2,
      width: '100%',
      height: '100%',
    },

    backCard: {
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      // Add any specific styles for the back card if needed
    },
    forAnnotation: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      maxHeight: cardSize.cardHeight,
      padding: 0,
      margin: 0,
    },
    annotatedText: {
      padding: 10,
      color: 'white',
      justifyContent: 'center',
      fontWeight: 'bold',
      margin: 6,
      top: 2,
      borderRadius: 10,

      alignContent: 'center',
      width: cardSize.cardWidth,
      height: cardSize.cardHeight - 5,
      marginBottom: 10,
      borderColor: 'white',
      fontSize: fontScale,
    },
    scoreTextContainer: {
      backgroundColor: 'white', //rgba(255, 255, 255, 0.7)',
      //TODOreplace this hardcoded margin
      borderColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      padding: 5,
      //This Three for margin and height and width is to match with images. TO DO: replace with a prop
      margin: 3,
      height: cardSize.cardHeight - 3,
      width: cardSize.cardWidth - 3,
      justifyContent: 'space-between',
      color: 'black',
    },
    scoreText: {
      flexDirection: 'column',
      maxWidth: cardSize.cardWidth,
      fontWeight: 'bold',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      color: 'black',
      fontSize: fontScale,
    },
    hiddenScoreCard: {
      height: cardSize.cardHeight,
      width: cardSize.cardWidth,
    },
    quoteText: {
      maxWidth: cardSize.cardWidth,
      fontWeight: 5,
      fontStyle: 'italic',
      justifyContent: 'center',
      alignSelf: 'center',
      color: 'black',
      fontSize: fontScale,
    },
    buttonText: {
      justifyContent: 'center',
      color: 'black',
      alignSelf: 'center',
      fontSize: fontScale,
    },
  })

  return (
    <>
      <View style={styles.questionCardsCont}>
        <View style={[styles.forAnnotation, { justifyContent: 'center' }]}>
          {annotated && (
            <>
              <Text style={styles.annotatedText}>{'In this key  ➔ '}</Text>
              <Text style={styles.annotatedText}>
                {'←  Change between two question modes '}
              </Text>
            </>
          )}
        </View>
        <View style={styles.forAnnotation}>
          <CardButton
            cardSize={cardSize}
            data={firstCard}
            source={firstCard.value.imgSrc}
            onPress={droneSetter}
            annotated={annotated}
            setAnnotatedCard={setAnnotatedCard}
            animated={isAnimated}
          />
        </View>
        <View style={styles.forAnnotation}>
          {annotated && (
            <>
              <Text style={styles.annotatedText}>
                {'what interval is this note ➔ '}
              </Text>
            </>
          )}
        </View>
        <View style={styles.forAnnotation}>
          <CardButton
            cardSize={cardSize}
            data={secondCard}
            root={firstCard}
            source={secondCard?.value.imgSrc}
            answer={answer}
            onPress={answerCardOnPress}
            findAudioSourceFunction={findNoteFunction}
            annotated={annotated}
            setAnnotatedCard={setAnnotatedCard}
            autoPlay={true}
            animationDelay={2}
            animated={isAnimated}
          />
        </View>
        <View style={styles.forAnnotation}>
          {annotated && (
            <>
              <Text style={styles.annotatedText}>
                {'Answer To be revealed ➔'}
              </Text>
            </>
          )}
        </View>

        <View style={styles.flipingCardsCont}>
          {isAnimated ? (
            <>
              <Animated.View
                style={[
                  styles.blankCard,
                  styles.backCard,
                  backAnimatedStyle(flipAnswerCardAnimation),
                ]}
              >
                <CardButton
                  cardSize={cardSize}
                  data={answer?.name}
                  source={answer?.imgSrc}
                  annotated={annotated}
                  setAnnotatedCard={setAnnotatedCard}
                  animationDelay={3}
                  tempTest={true}
                  animated={isAnimated}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.card,
                  frontAnimatedStyle(flipAnswerCardAnimation),
                ]}
              >
                <CardButton
                  cardSize={cardSize}
                  source={blankCard}
                  altSourceForReload={answer?.imgSrc}
                  animationDelay={3}
                  tempTest={true}
                  animated={isAnimated}
                />
              </Animated.View>
            </>
          ) : (
            <>
              {resultDisplay ? (
                <View style={styles.card}>
                  <CardButton
                    cardSize={cardSize}
                    data={answer?.name}
                    source={answer?.imgSrc}
                    annotated={annotated}
                    setAnnotatedCard={setAnnotatedCard}
                  />
                </View>
              ) : (
                <View style={styles.card}>
                  <CardButton
                    cardSize={cardSize}
                    source={blankCard}
                    altSourceForReload={answer?.imgSrc}
                  />
                </View>
              )}
            </>
          )}
        </View>

        <View style={styles.forAnnotation}>
          {annotated ? (
            <Text style={[styles.annotatedText, { alignSelf: 'center' }]}>
              {'Score will appear here at end of round'}
            </Text>
          ) : null}
          <Animated.View
            style={[
              styles.hiddenScoreCard,
              frontAnimatedStyle(flipScoreCardAnimation),
              (displayScore || skip) && styles.scoreTextContainer,
            ]}
          >
            {displayScore || skip ? (
              <>
                {skip ? (
                  <Pressable onPress={skipQuestion}>
                    <Text style={styles.buttonText}>Skip Question?</Text>
                  </Pressable>
                ) : (
                  <>
                    <Text style={styles.scoreText}>{score + '/12'}</Text>
                    <Text style={styles.quoteText}>
                      {returnScoreText(score)}
                    </Text>
                    <Pressable onPress={newRound}>
                      <Text style={styles.buttonText}>New Round?</Text>
                    </Pressable>
                  </>
                )}
              </>
            ) : null}
          </Animated.View>
        </View>
      </View>
    </>
  )
}

export default QuestionCards
