import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import CardButton from './CardButton'
import ScoreCard from './ScoreCard'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import { useUpdateGameContext, useGameContext } from './GameContext.js'
import AnnotatedContext from './AnnotatedContext.js'
import ThemeContext from './ThemeContext.js'

let isAnimated = true

const QuestionCards = () => {
  const flipAnswerCardAnimation = useSharedValue(0)
  const flipScoreCardAnimation = useSharedValue(0)
  const {
    font: { fontScale, fontStyle },
    cardSize,
  } = useContext(ThemeContext)

  const { annotated } = useContext(AnnotatedContext)

  const {
    questionCards: { firstCard, secondCard, answerCard },
    attemptCount,
    scoreCardDisplay: displayScore,
    showAnswerCard,
    choosingKey,
    blankCard,
  } = useGameContext()

  const { questionCardPress, getAudioSrcIdxFromCardReducer } =
    useUpdateGameContext()
  console.log('QuestionCardss', getAudioSrcIdxFromCardReducer)
  useEffect(() => {
    if (showAnswerCard && isAnimated) {
      handleFlip(180, flipAnswerCardAnimation)
      // handleFlip(180, flipScoreCardAnimation)
    }
    if (skip || displayScore) {
      handleFlip(180, flipScoreCardAnimation)
    }
    if (!skip && !displayScore && !showAnswerCard) {
      cardsToInit()
    }
  }, [showAnswerCard, skip, displayScore])

  const fontSize =
    typeof fontScale === 'number' && !isNaN(fontScale) ? fontScale : 16

  let alterationSizing = choosingKey ? 0.9 : annotated ? 1.2 : 1
  let skip = attemptCount > 2 ? true : false

  function cardsToInit() {
    flipScoreCardAnimation.value = 0
    flipAnswerCardAnimation.value = 0
  }

  function droneSetter() {
    rootCardPress()
  }

  const handleFlip = (toValue, card) => {
    const animationSpeed = 1000
    card.value = withTiming(toValue, { duration: animationSpeed })
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

  const styles = StyleSheet.create({
    questionCardsCont: {
      margin: 0,
      padding: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    flipingCardsCont: {
      margin: 0,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      maxHeight: cardSize.cardHeight,
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
    },
    forAnnotation: {
      padding: 0,
      margin: 0,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      maxHeight: cardSize.cardHeight,
    },
    annotatedText: {
      flexDirection: 'row',
      margin: 0,
      padding: 0,
      marginHorizontal: 6,
      color: 'white',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      width: cardSize.cardWidth,
      height: cardSize.cardHeight - 5,
      fontSize: fontSize,
    },
    hiddenScoreCard: {
      height: cardSize.cardHeight,
      width: cardSize.cardWidth,
    },
  })

  return (
    <>
      <View style={styles.questionCardsCont}>
        <View
          style={[
            styles.forAnnotation,
            {
              justifyContent: 'flex-end',
              alignItems: 'center',
              maxHeight: cardSize.height,
            },
          ]}
        >
          {annotated ? (
            <>
              <View style={styles.annotatedText}>
                <Text
                  style={{
                    alignContent: 'flex-end',
                    fontSize: fontSize,
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  {'In this key  ➔ '}
                  {/* {'←  Change between two question modes '} */}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                }}
              >
                <Text
                  style={[
                    {
                      color: 'white',
                      fontSize: fontSize * 0.9,
                      fontStyle: 'italic',
                      alignContent: 'flex-end',
                    },
                  ]}
                >
                  {`Click card to change key`}
                </Text>
              </View>
            </>
          ) : (
            <View styl={styles.annotatedText}></View>
          )}
        </View>
        <View style={styles.forAnnotation}>
          <CardButton
            key={`question ${firstCard?.name || firstCard?.imgSrc}`}
            data={firstCard}
            imgSource={firstCard?.value.imgSrc || blankCard.value.imgSrc}
            onPressPropFunction={questionCardPress}
            animated={isAnimated}
            alterationSizing={alterationSizing}
          />
        </View>
        {choosingKey && (
          <View style={styles.forAnnotation}>
            <Text style={styles.annotatedText}>{'← Current Key'}</Text>
          </View>
        )}
        <View style={styles.forAnnotation}>
          {annotated && (
            <Text style={styles.annotatedText}>
              {'what interval is this note ➔ '}
            </Text>
          )}
        </View>
        <View style={styles.forAnnotation}>
          {!choosingKey && (
            <CardButton
              data={secondCard}
              root={firstCard}
              imgSource={secondCard?.value.imgSrc || blankCard.value.imgSrc}
              answer={answerCard}
              onPressPropFunction={getAudioSrcIdxFromCardReducer}
              findAudioSourceFunction={getAudioSrcIdxFromCardReducer}
              autoPlay={true}
              animationDelay={3}
              animated={isAnimated}
              alterationSizing={alterationSizing}
            />
          )}
        </View>
        <View style={styles.forAnnotation}>
          {annotated && (
            <Text style={styles.annotatedText}>
              {'Answer To be revealed ➔'}
            </Text>
          )}
        </View>
        <View style={styles.flipingCardsCont}>
          <View style={styles.forAnnotation}>
            <Animated.View
              style={[
                styles.backCard,
                backAnimatedStyle(flipAnswerCardAnimation),
              ]}
            >
              {!choosingKey && (
                <CardButton
                  key={answerCard?.name || answerCard?.imgSrc}
                  data={answerCard}
                  imgSource={answerCard?.imgSrc}
                  onPressPropFunction={() =>
                    console.log('blankOnPressFunction')
                  }
                  animationDelay={5}
                  animated={isAnimated}
                  alterationSizing={alterationSizing}
                  isAnswerCardForAnnotated={true}
                  blankCard={blankCard}
                />
              )}
            </Animated.View>
            <Animated.View
              style={[styles.card, frontAnimatedStyle(flipAnswerCardAnimation)]}
            >
              {!choosingKey && (
                <CardButton
                  key={`backCard ${blankCard}`} // Use a unique key based on the answerCard
                  data={blankCard}
                  imgSource={blankCard.value.imgSrc}
                  onPressPropFunction={() =>
                    console.log('blankOnPressFunction')
                  }
                  animationDelay={5}
                  animated={isAnimated}
                  isAnswerCardForAnnotated={true}
                  blankCard={blankCard}
                  alterationSizing={alterationSizing}
                />
              )}
            </Animated.View>
          </View>
        </View>
        <View
          style={[
            styles.forAnnotation,
            {
              justifyContent: 'center',
              alignContent: 'center',
            },
          ]}
        >
          {annotated ? (
            <Text style={styles.annotatedText}>
              {'Score will appear here at end of round'}
            </Text>
          ) : null}
        </View>
        <Animated.View
          style={[
            styles.scoreCardDisplay,
            backAnimatedStyle(flipScoreCardAnimation),
          ]}
        >
          <ScoreCard skip={skip} />
        </Animated.View>
      </View>
    </>
  )
}

export default QuestionCards
