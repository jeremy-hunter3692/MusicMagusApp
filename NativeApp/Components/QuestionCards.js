import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
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
}) => {
  const newQuestionTimeDelay = 1500

  useEffect(() => {
    if (resultDisplay) {
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

  // Function to handle the flip
  const handleFlip = (toValue) => {
    const animationSpeed = 500

    flipAnimation.value = withTiming(toValue, { duration: animationSpeed })
  }
  //

  return (
    <>
      <View style={styles.questionCardsCont}>
        <CardButton
          cardSize={cardSize}
          data={firstCard}
          source={firstCard.value.imgSrc}
          onPress={droneSetter}
          annotated={annotated}
          setAnnotatedCard={setAnnotatedCard}
        />
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
        />

        <View style={styles.flipingCardsCont}>
          <Animated.View
            style={[styles.blankCard, styles.backCard, backAnimatedStyle]}
          >
            <CardButton
              cardSize={cardSize}
              data={answer?.name}
              source={answer?.imgSrc}
              annotated={annotated}
              setAnnotatedCard={setAnnotatedCard}
            />{' '}
          </Animated.View>

          <Animated.View style={[styles.card, frontAnimatedStyle]}>
            <CardButton cardSize={cardSize} source={blankCard} />
          </Animated.View>
        </View>
      </View>
    </>
  )
}

export default QuestionCards

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
})
