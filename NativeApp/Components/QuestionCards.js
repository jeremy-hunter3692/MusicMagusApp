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
  cancelAnimation,
  withDelay,
} from 'react-native-reanimated'

import { useUpdateGameContext, useGameContext } from './GameContext.js'
import AnnotatedContext from './AnnotatedContext.js'
import ThemeContext from './ThemeContext.js'

let isAnimated = true

const QuestionCards = () => {
  const flipAnswerCardAnimation = useSharedValue(0)
  const flipScoreCardAnimation = useSharedValue(0)
  // console.log('top', flipAnswerCardAnimation.value)
  const {
    font: { fontScale, fontStyle },
    cardSize,
  } = useContext(ThemeContext)
  const fontSize =
    typeof fontScale === 'number' && !isNaN(fontScale)
      ? Math.ceil(fontScale)
      : 16

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

  let skip = attemptCount > 2 ? true : false
  let alterationSizing = choosingKey ? 0.7 : annotated ? 1.2 : 1

  useEffect(() => {
    if (!skip && !displayScore && !showAnswerCard) {
      cardsToInit()
      return
    }
    if (showAnswerCard && isAnimated) {
      cancelAnimation(flipAnswerCardAnimation)

      handleFlip(180, flipAnswerCardAnimation)
    }
    if (skip || displayScore) {
      cancelAnimation(flipScoreCardAnimation)

      handleFlip(180, flipScoreCardAnimation)
    }

    // !showAnswerCard ? cardsToInit() : null
  }, [showAnswerCard, skip, displayScore, answerCard])

  function cardsToInit() {
    flipScoreCardAnimation.value = 0
    flipAnswerCardAnimation.value = 0
    console.log('cardsToInit fired', flipAnswerCardAnimation.value)
  }

  function droneSetter() {
    rootCardPress()
  }

  const handleFlip = (toValue, card) => {
    const animationSpeed = 1000
    cancelAnimation(card)
    card.value = withTiming(
      toValue,
      { duration: animationSpeed },
      (finished) => {
        if (finished) {
          card.value =
            !displayScore && !skip ? withDelay(700, withTiming(0)) : toValue
        }
      }
    )
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
      height: cardSize.cardHeight * alterationSizing,
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
      maxWidth: cardSize.cardWidth,
      maxHeight: cardSize.cardHeight * alterationSizing,
      fontSize: fontSize,
    },

    annotatedWithSubTextContainer: {
      flex: 1,
      margin: 0,
      padding: 0,
      width: cardSize.cardWidth,
      height: cardSize.cardHeight * alterationSizing,

      flexDirection: 'column',
      justifyContent: 'space-between',

      alignItems: 'center',
    },
    annotatedSubText: {
      margin: 0,
      padding: 0,
      color: 'white',
      fontSize: Math.ceil(fontSize * 0.8),
      fontStyle: 'italic',
      alignSelf: 'center',
      textAlign: 'center',
    },
    hiddenScoreCard: {
      height: cardSize.cardHeight,
      width: cardSize.cardWidth,
    },
  })

  return (
    <>
      <View
        style={[
          styles.questionCardsCont,

          choosingKey && {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          },
        ]}
      >
        <View style={[styles.forAnnotation]}>
          {annotated ? (
            <View style={styles.annotatedWithSubTextContainer}>
              <Text style={styles.annotatedText}>{'In this key  ➔ '}</Text>

              <Text style={styles.annotatedSubText}>
                {`Click this card to change key`}
              </Text>
            </View>
          ) : (
            <View style={styles.annotatedWithSubTextContainer}></View>
          )}
        </View>
        <View style={[styles.forAnnotation]}>
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
              {'What interval is this note ➔ '}
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
                  key={answerCard?.name} //|| answerCard?.imgSrc}
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
              justifyContent: 'flex-start',
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
          {!annotated && <ScoreCard skip={skip} />}
        </Animated.View>
      </View>
    </>
  )
}

export default QuestionCards
