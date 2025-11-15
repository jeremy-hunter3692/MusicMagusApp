import React, { useEffect, useState, useContext } from 'react'
import AnnotatedContext from './AnnotatedContext'
import ThemeContext from './ThemeContext'
import SingleNotePlayer from './SingleNotePlayer'
import { Pressable, Image, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
let hasPlayed = true
const initCardSizeValue = 0

const CardButton = ({
  onPressPropFunction,
  data,
  imgSource,
  reDeal,
  autoPlay,
  answer,
  animationDelay,
  alterationSizing,
  isAnswerCardForAnnotated,
  blankCard,
}) => {
  const [noteAudioSrc, setNoteAudioSrc] = useState()
  const [playBool, setPlayBool] = useState(autoPlay)
  const dealAnimationSpeed = 20
  const initDealDelay = 30
  const cardSizeScale = useSharedValue(initCardSizeValue)
  const cardSpacing = { margin: 2, padding: 0 }

  const {
    cardSize: { cardWidth, cardHeight },
  } = useContext(ThemeContext)
  const { annotated, setAnnotatedCard } = useContext(AnnotatedContext)

  useEffect(() => {
    if (annotated) {
      return
    }
    cardSizeScale.value = withSpring(initCardSizeValue)
    setTimeout(() => {
      dealAnimationTrigger(animationDelay)
    }, initDealDelay)

    hasPlayed = false

    let timeOutId = setTimeout(() => {
      autoPlay && !hasPlayed && answer ? handlePressIn(data) : ''
    }, 1000)

    return () => clearTimeout(timeOutId)
  }, [answer, imgSource, reDeal])

  function handlePressIn(inpt) {
    //this must be with {value }
    if (annotated) {
      //This for an IOS bug that takes answer card instead of the visible blank card
      isAnswerCardForAnnotated
        ? setAnnotatedCard(blankCard)
        : setAnnotatedCard(inpt)
      return
    }
    let audioSrc = onPressPropFunction(inpt) // findAudioSrcAnyCard(inpt)
    audioSrc ? setNoteAudioSrc(audioSrc) : null
    noteAudioSrc ? setPlayBool((bool) => !bool) : null
    hasPlayed = true
  }

  function dealAnimationTrigger(cardDelayOrder) {
    setTimeout(() => {
      handlePressOutAnimation()
    }, cardDelayOrder * dealAnimationSpeed)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardSizeScale.value }],
    }
  })

  const handlePressInAnimation = () => {
    cardSizeScale.value = withSpring(1.1, {
      damping: 200,
      stiffness: 1000,
    })
  }

  const handlePressOutAnimation = () => {
    cardSizeScale.value = withSpring(1, {
      damping: 200,
      stiffness: 5000,
    })
  }
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      margin: cardSpacing.margin,
      padding: cardSpacing.padding,
      width: '100%',
      height: '100%',
      maxHeight: '100%',
      flexShrink: 1,
      resizeMode: 'contain',
    },
    pressable: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: cardHeight * alterationSizing,
      maxWidth: cardWidth * alterationSizing,
      height: cardHeight * alterationSizing,
      width: cardWidth * alterationSizing,
    },
  })

  return (
    <>
      <SingleNotePlayer audioSrc={noteAudioSrc} shouldPlay={playBool} />
      <Pressable
        testID={data?.name}
        onPressIn={() => {
          handlePressIn(data)
        }}
        onPressOut={handlePressOutAnimation}
        style={styles.pressable}
      >
        <Animated.View
          style={[{ width: '100%', height: '100%' }, animatedStyle]}
        >
          <Image source={imgSource} testID={`image`} style={styles.image} />
        </Animated.View>
      </Pressable>
    </>
  )
}

export default CardButton
