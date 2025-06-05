import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import CardButton from './CardButton'
import ScoreCard from './ScoreCard'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { updateGameContext, useGameContext } from './CardsContext'
import AnnotatedContext from './AnnotatedContext.js'

const blankCard = require('../assets/blankcard.png')
let isAnimated = true

const QuestionCards = ({ cardSize }) => {
  const flipAnswerCardAnimation = useSharedValue(0)
  const flipScoreCardAnimation = useSharedValue(0)
  const { annotated } = useContext(AnnotatedContext)
  const {
    questionCards: { firstCard, secondCard, answerCard },
    attemptCount,
    scoreCardDisplay: displayScore,
    showAnswerCard,
  } = useGameContext()
  const {
    questionCardPress,
    score,
    newRound,
    skipQuestion,
    getAudioSrcIdxFromCardReducer,
  } = updateGameContext()

  useEffect(() => {
    if (showAnswerCard && isAnimated) {
      handleFlip(180, flipAnswerCardAnimation)
      handleFlip(180, flipScoreCardAnimation)
    } else {
      cardsToInit()
    }
  }, [showAnswerCard])
  console.log('attmpe', attemptCount)

  let skip = attemptCount > 2 ? true : false
  let fontScale = cardSize.fontScale || 16

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
      justifyContent: 'space-around',
      color: 'black',
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
                  style={[
                    styles.annotatedText,
                    { margein: 0, padding: 0, alignContent: 'flex-end' },
                  ]}
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
                      margin: 0,
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
            cardSize={cardSize}
            data={firstCard}
            imgSource={firstCard?.value.imgSrc || blankCard}
            onPressPropFunction={questionCardPress}
            animated={isAnimated}
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
            cardSize={cardSize}
            data={secondCard}
            root={firstCard}
            imgSource={secondCard?.value.imgSrc}
            answer={answerCard}
            onPressPropFunction={() => console.log('secondcard onpress fired')}
            findAudioSourceFunction={getAudioSrcIdxFromCardReducer}
            autoPlay={true}
            animationDelay={3}
            animated={isAnimated}
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
                  cardSize={cardSize}
                  data={answerCard}
                  imgSource={answerCard?.imgSrc}
                  onPressPropFunction={() => console.log('blank')}
                  animationDelay={5}
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
                  key={`backCard ${blankCard}`} // Use a unique key based on the answerCard
                  cardSize={cardSize}
                  data={{ value: { imgSrc: blankCard, blankCard: true } }}
                  imgSource={blankCard}
                  onPressPropFunction={() => console.log('blank')}
                  animationDelay={5}
                  animated={isAnimated}
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
            styles.hiddenScoreCard,
            frontAnimatedStyle(flipScoreCardAnimation),
            !annotated && (displayScore || skip) && styles.scoreTextContainer,
          ]}
        >
          {!annotated && (displayScore || skip) ? (
            <ScoreCard
              skipQuestion={skipQuestion}
              skip={skip}
              score={score}
              newRound={newRound}
            />
          ) : null}
        </Animated.View>
      </View>
    </>
  )
}

export default QuestionCards
