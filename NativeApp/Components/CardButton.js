import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, Text, View, useWindowDimensions } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

let hasPlayed = true
const initCardSizeValue = 0
const CardButton = ({
  onPress,
  data,
  source,
  autoPlay = false,
  answer,
  findAudioSourceFunction,
  cardSize,
  annotated,
  setAnnotatedCard,
  animationDelay,
}) => {
  const [note, setNote] = useState()
  const [playBool, setPlayBool] = useState()
  const dealAnimationSpeed = 20
  const initDealDelay = 30
  const scale = useSharedValue(initCardSizeValue)
  const { cardWidth, cardHeight } = cardSize || {}

  useEffect(() => {
    if (annotated) {
      return
    }

    setTimeout(() => {
      dealAnimationTrigger(animationDelay)
    }, initDealDelay)

    hasPlayed = false
    let timeOutId = setTimeout(() => {
      autoPlay && !hasPlayed && answer ? cardButtonOnPress(data) : ''
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [answer, source])

  function dealAnimationTrigger(cardDelayOrder) {
    setTimeout(() => {
      handlePressOut()
    }, cardDelayOrder * dealAnimationSpeed)
  }

  function cardButtonOnPress(inpt) {
    if (annotated) {
      setAnnotatedCard(data)
    } else {
      //check this for fixing sound first
      autoPlay === true ? setNote(onPress(answer)) : handlePressIn()
    }

    let res = findAudioSourceFunction ? findAudioSourceFunction(inpt) : ''
    onPress(inpt)
    res ? setNote(res) : ''
    note ? setPlayBool((bool) => !bool) : ''
    hasPlayed = true
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const handlePressIn = () => {
    scale.value = withSpring(initCardSizeValue, {
      damping: 20,
      stiffness: 1000,
    })
  }

  // Function to handle button release (scale back to normal with spring effect)
  const handlePressOut = (card) => {
    scale.value = withSpring(1, {
      damping: 200,
      stiffness: 5000,
    })
  }

  return (
    <>
      {/* <PlaySound inpt={note} playBool={playBool} /> */}

      <Pressable
        onPressIn={() => {
          cardButtonOnPress(data)
        }}
        onPressOut={handlePressOut}
        style={{
          marginHorizontal: 1,
          marginVertical: 5,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: cardHeight,
          maxWidth: cardWidth,
          height: cardHeight,
          width: cardWidth,
        }}
      >
        <Animated.View
          style={[{ width: '100%', height: '100%' }, animatedStyle]}
        >
          <Image
            source={source}
            testID={`image`}
            style={{
              flex: 1,
              margin: 0,
              padding: 0,
              width: '100%',
              height: '100%',
              maxHeight: '100%',
              flexShrink: 1,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
      </Pressable>
    </>
  )
}

export default CardButton
