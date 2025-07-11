import React, { useEffect } from 'react'

import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

const blankCard = require('./assets/blankcard.png')

const AnimatedSplashScreen = () => {
  const flipCardannimation = useSharedValue(0)

  const handleFlip = () => {
    const animationSpeed = 1000
    flipCardannimation.value = withTiming(180, { duration: animationSpeed })
  }

  setTimeout(() => {
    console.log('Animation started')
    handleFlip()
  }, 2000)

  const frontAnimatedStyle = () =>
    useAnimatedStyle(() => {
      const rotateY = interpolate(
        flipCardannimation.value,
        [0, 180],
        [0, 180],
        Extrapolate.CLAMP
      )
      return {
        transform: [{ rotateY: `${rotateY}deg` }],
        opacity: card.value < 90 ? 1 : 0,
      }
    })

  return (
    <View style={[styles.container, frontAnimatedStyle]}>
      <Image
        style={{ width: '80%', height: '60%', resizeMode: 'contain' }}
        source={blankCard}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AnimatedSplashScreen
