import React, { useState } from 'react'

import { Pressable, Image, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

const imgSource = require('../assets/blankcard.png')

const SplashAnimation = ({
  cardSize,
  width,
  height,
  animationTime,
  splashAnimationOff,
}) => {
  const [firstClickDone, setFirstClickDone] = useState(false)
  const cardSizeScale = useSharedValue(1)
  const cardRotation = useSharedValue(90)
  const cardYRotation = useSharedValue(0)
  const cardWidth = cardSize.width / 2 || 0.3
  const rotationEnd = 0

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 800 },
        { rotate: `${cardRotation.value}deg` },
        { rotateY: `${cardYRotation.value}deg` },
        { scale: cardSizeScale.value },
      ],
    }
  })

  const firstClickAnimation = () => {
    cardSizeScale.value = withTiming(cardWidth, {
      duration: animationTime / 4 || 1000,
    })
    cardRotation.value = withTiming(rotationEnd, {
      duration: animationTime / 2 || 1000,
    })
    setFirstClickDone(true)
  }

  const gameSelectAnimation = () => {
    const spinDuration = 600

    cardYRotation.value = withTiming(90, { duration: spinDuration })
    setTimeout(() => {
      splashAnimationOff()
    }, spinDuration + 500)
  }

  const triggerAnimation = () => {
    if (!firstClickDone) {
      firstClickAnimation()
      return
    }
    gameSelectAnimation()
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
    >
      <Pressable onPress={triggerAnimation}>
        <Animated.View
          style={[
            {
              backgroundColor: 'black',
              width: width,
              height: height,
              zIndex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            },
            animatedStyle,
          ]}
        >
          <Image
            source={imgSource}
            testID={`image`}
            style={{
              height: height,
              width: width,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
      </Pressable>
    </View>
  )
}

export default SplashAnimation
