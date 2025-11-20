import React, { useEffect, useState, useContext } from 'react'

import { Pressable, Image, StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

const imgSource = require('../assets/blankcard.png')

const SplashAnimation = ({ cardSize, width, height, animationTime }) => {
  const dealAnimationSpeed = 20
  const initDealDelay = 30
  const cardSizeScale = useSharedValue(1)
  const cardRotation = useSharedValue(0)
  const cardSpacing = { margin: 2, padding: 0 }
  const rotationEnd = 90

  useEffect(() => {
    setTimeout(() => {
      console.log('cardSize', cardSize)
      cardSizeScale.value = withTiming(0.3 || 0.3)
    }, animationTime )

    const rotTimer = setTimeout(() => {
      cardRotation.value = withTiming(rotationEnd, {
        duration: animationTime / 5,
      })
    }, animationTime / 2)

    return () => {
      clearTimeout(rotTimer)
    }
  }, [cardSize])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${cardRotation.value}deg` },
        { scale: cardSizeScale.value },
      ],
    }
  })

  const styles = StyleSheet.create({
    image: {
      height: height,
      width: width,
      resizeMode: 'contain',
    },
  })

  return (
    <Animated.View
      style={[
        {
          width: width,
          height: height,
          zIndex: 10,
          margin: 10,
          justifyContent: 'center',
          alignContent: 'center',
        },
        animatedStyle,
      ]}
    >
      <Image source={imgSource} testID={`image`} style={styles.image} />
    </Animated.View>
  )
}

export default SplashAnimation
