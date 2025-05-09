import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, StyleSheet } from 'react-native'
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
  reDeal,
  autoPlay = false,
  answer,
  findAudioSourceFunction,
  cardSize,
  annotated,
  setAnnotatedCard,
  animationDelay,
  animated,
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
    scale.value = withSpring(initCardSizeValue)
    setTimeout(() => {
      dealAnimationTrigger(animationDelay)
    }, initDealDelay)
    hasPlayed = false
    let timeOutId = setTimeout(() => {
      autoPlay && !hasPlayed && answer ? cardButtonOnPress(data) : ''
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [answer, source, reDeal])

  function dealAnimationTrigger(cardDelayOrder) {
    setTimeout(() => {
      handlePressOut()
    }, cardDelayOrder * dealAnimationSpeed)
  }

  function cardButtonOnPress(inpt) {
    if (annotated) {
      setAnnotatedCard(inpt)
    } else {
      // check this for fixing sound first
      autoPlay === true ? setNote(onPress(answer)) : handlePressIn()
    }
    let res = findAudioSourceFunction ? findAudioSourceFunction(inpt) : null
    onPress(inpt)
    res ? setNote(res) : ''
    note ? setPlayBool((bool) => !bool) : null
    hasPlayed = true
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const handlePressIn = () => {
    scale.value = withSpring(1.1, {
      damping: 200,
      stiffness: 1000,
    })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 200,
      stiffness: 5000,
    })
  }

  return (
    <>
      {/* <PlaySound inpt={note} playBool={playBool} /> */}
      <Pressable
        testID={data?.name}
        onPressIn={() => {
          cardButtonOnPress(data)
        }}
        onPressOut={handlePressOut}
        style={[
          styles.pressable,
          {
            maxHeight: cardHeight,
            maxWidth: cardWidth,
            height: cardHeight,
            width: cardWidth,
          },
        ]}
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

const styles = StyleSheet.create({
  image: {
    flex: 1,
    //TO DO replace with a prop? and possible computed size
    margin: 2,
    padding: 0,
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    flexShrink: 1,
    resizeMode: 'contain',
  },
  pressable: {
    // marginHorizontal: 1,
    // marginVertical: 5,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CardButton
