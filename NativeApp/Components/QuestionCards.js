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

  let alterationSizing = choosingKey ? 0.5 : annotated ? 1.2 : 1

  let skip = attemptCount > 2 ? true : false

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
      fontSize: fontScale,
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
            { justifyContent: 'flex-end', alignItems: 'center' },
          ]}
        >
          {annotated && (
            <>
              <View
                style={{
                  flex: 0,
                  maxHeight: cardSize.height,
                }}
              >
                <Text
                  style={[styles.annotatedText, { alignContent: 'flex-end' }]}
                >
                  {'In this key  ➔ '}
                  {/* {'←  Change between two question modes '} */}
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-start',
                  maxHeight: cardSize.height,
                }}
              >
                <Text
                  style={[
                    styles.annotatedText,
                    {
                      paddingBottom: 10,
                      fontSize: fontScale * 0.9,
                      fontStyle: 'italic',
                      alignContent: 'flex-end',
                    },
                  ]}
                >
                  {`Click card to choose key`}
                </Text>
              </View>
            </>
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
        <View style={styles.forAnnotation}>
          {annotated && (
            <Text style={styles.annotatedText}>
              {'what interval is this note ➔ '}
            </Text>
          )}
        </View>
        <View style={styles.forAnnotation}>
          <CardButton
            data={secondCard}
            root={firstCard}
            imgSource={secondCard?.value.imgSrc || blankCard.value.imgSrc}
            answer={answerCard}
            onPressPropFunction={() => console.log('secondcard onpress fired')}
            findAudioSourceFunction={getAudioSrcIdxFromCardReducer}
            autoPlay={true}
            animationDelay={3}
            animated={isAnimated}
            alterationSizing={alterationSizing}
          />
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
            {isAnimated ? (
              <>
                <Animated.View
                  style={[
                    styles.backCard,
                    backAnimatedStyle(flipAnswerCardAnimation),
                  ]}
                >
                  <CardButton
                    key={answerCard?.name || answerCard?.imgSrc}
                    data={answerCard}
                    imgSource={answerCard?.imgSrc}
                    onPressPropFunction={() => console.log('blank')}
                    animationDelay={5}
                    animated={isAnimated}
                    alterationSizing={alterationSizing}
                  />
                </Animated.View>
                <Animated.View
                  style={[
                    styles.card,
                    frontAnimatedStyle(flipAnswerCardAnimation),
                  ]}
                >
                  <CardButton
                    key={`backCard ${blankCard}`} // Use a unique key based on the answerCard
                    data={blankCard}
                    imgSource={blankCard.value.imgSrc}
                    onPressPropFunction={() => console.log('blank')}
                    animationDelay={5}
                    animated={isAnimated}
                    alterationSizing={alterationSizing}
                  />
                </Animated.View>
              </>
            ) : (
              <>
                {/* {ashowAnswerCard? (
                <View
                  style={[
                    styles.card,
                    { borderColor: 'white', borderWidth: 1 },
                  ]}
                >
                  <CardButton
                    cardSize={cardSize}
                    data={answer?.name}
                    source={answer?.imgSrc}
                    annotated={annotated}

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
              )} */}
              </>
            )}
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
