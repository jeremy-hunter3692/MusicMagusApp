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
const blankCard = require('../assets/blankcard.png')

const QuestionCards = ({
  bgColor,
  secondaryColor,
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
  score,
  newRound,
}) => {
  const newQuestionTimeDelay = 1500

  useEffect(() => {
    if (resultDisplay && isAnimated) {
      handleFlip(180) // Flip the card to 180 degrees
      setTimeout(() => {
        handleFlip(0) // Flip the card back to 0 degrees after 1 second
      }, newQuestionTimeDelay)
    }
  }, [resultDisplay])

  function droneSetter() {
    rootCardPress()
  }

  //gpt stuff:::

  const flipAnimation = useSharedValue(0)

  // Front side animation style
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipAnimation.value,
      [0, 180],
      [0, 180],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipAnimation.value < 90 ? 1 : 0,
    }
  })

  // Back side animation style
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipAnimation.value,
      [0, 180],
      [180, 360],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipAnimation.value > 90 ? 1 : 0,
    }
  })

  function returnCorrectAnnotatedText(cardValue, abBool) {}

  // Function to handle the flip
  const handleFlip = (toValue) => {
    const animationSpeed = 500

    flipAnimation.value = withTiming(toValue, { duration: animationSpeed })
  }
  //
  const styles = StyleSheet.create({
    questionCardsCont: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: 0,
      padding: 0,
    },
    flipingCardsCont: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    blankCard: {
      zIndex: 2,
      width: '100%',
      height: '100%',
    },
    backCard: {
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
    },
    annotatedText: {
      color: secondaryColor,
    },
  })

  return (
    <>
      <View style={styles.questionCardsCont}>
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

          {annotated && (
            <>
              <Text style={styles.annotatedText}>Question Card</Text>
              <Text style={styles.annotatedText}>I.E In this key</Text>
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
          {annotated && (
            <>
              <Text style={styles.annotatedText}>Second Question card</Text>
              <Text style={styles.annotatedText}>what is this {bgColor}</Text>
            </>
          )}
        </View>

        <View style={styles.flipingCardsCont}>
          {isAnimated ? (
            <>
              <Animated.View
                style={[styles.blankCard, styles.backCard, backAnimatedStyle]}
              >
                <CardButton
                  cardSize={cardSize}
                  data={answer?.name}
                  source={answer?.imgSrc}
                  annotated={annotated}
                  setAnnotatedCard={setAnnotatedCard}
                  animationDelay={3}
                  animated={isAnimated}
                />
              </Animated.View>

              <Animated.View style={[styles.card, frontAnimatedStyle]}>
                <CardButton
                  cardSize={cardSize}
                  source={blankCard}
                  altSourceForReload={answer?.imgSrc}
                  animationDelay={3}
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

          {annotated && (
            <>
              <Text style={styles.annotatedText}>Answer Card</Text>
              <Text style={styles.annotatedText}>To be revealed</Text>
            </>
          )}
        </View>
        <View>
          <Text>{score}</Text>
          {score ? (
            <Pressable onPress={newRound}>
              <View>
                <Text>New Round?</Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>
    </>
  )
}

export default QuestionCards
