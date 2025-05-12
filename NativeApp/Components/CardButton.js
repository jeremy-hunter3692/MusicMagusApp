import React, { useEffect, useState } from 'react'
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
  source,
  reDeal,
  autoPlay,
  answer,
  findAudioSourceFunction,
  cardSize,
  annotated,
  setAnnotatedCard,
  animationDelay,
  animated,
}) => {
  const [noteAudioSrc, setNoteAudioSrc] = useState()
  const [playBool, setPlayBool] = useState(autoPlay)
  const dealAnimationSpeed = 20
  const initDealDelay = 30
  const cardSizeScale = useSharedValue(initCardSizeValue)
  const cardSpacing = { margin: 2, padding: 0 }
  const { cardWidth, cardHeight } = cardSize || {}

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
  }, [answer, source, reDeal])

  function handlePressIn(inpt) {
    //this must be with {value }
    console.log('card button top', inpt)

    if (annotated) {
      setAnnotatedCard(inpt)
    } else {
      // check this for fixing sound first
      autoPlay === true ? handleAutoPlay(inpt) : handlePressInAnimation()
    }
    // let res = findAudioSourceFunction ? findAudioSourceFunction(inpt) : null
    console.log('b4 onpress', inpt)
    onPressPropFunction(inpt)

    // res ? setNote(res) : ''
    noteAudioSrc ? setPlayBool((bool) => !bool) : null

    hasPlayed = true
  }

  function handleAutoPlay(inpt) {
    setNoteAudioSrc(inpt.value.audioSrc)
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
      maxHeight: cardHeight,
      maxWidth: cardWidth,
      height: cardHeight,
      width: cardWidth,
    },
  })

  return (
    <>
      <SingleNotePlayer audioSrc={noteAudioSrc} playBool={playBool} />
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
          <Image source={source} testID={`image`} style={styles.image} />
        </Animated.View>
      </Pressable>
    </>
  )
}

export default CardButton
