import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

const PickShape = ({ questionAB, width }) => {
  const [abBool, setabBool] = useState(true)
  const pickWidth = width * 0.04
  function toggleBool() {
    const newAbBool = !abBool
    setabBool(newAbBool)
    questionAB(newAbBool)
  }

  useEffect(() => {
    handleFlip() // Flip the card to 180 degrees
  }, [abBool])

  const flipAnimation = useSharedValue(0)

  // Front side animation style
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipAnimation.value,
      [0, 180],
      [0, 180],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipAnimation.value < 90 ? 1 : 0,
    }
  })

  // Back side animation style
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipAnimation.value,
      [0, 180],
      [180, 360],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipAnimation.value > 90 ? 1 : 0,
    }
  })

  // Function to handle the flip
  const handleFlip = () => {
    const animationSpeed = 200
    if (abBool) {
      flipAnimation.value = withTiming(0, { duration: animationSpeed })
    } else {
      flipAnimation.value = withTiming(180, { duration: animationSpeed })
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          top: -width * 0.01,
          padding: width * 0.01,
          marginHorizontal: width * 0.1,
        },
      ]}
    >
      <Pressable onPress={toggleBool}>
        <Animated.View
          style={[
            styles.triangle,
            {
              borderLeftWidth: pickWidth,
              borderRightWidth: pickWidth,
              borderTopWidth: pickWidth * 1.4,
            },
            frontAnimatedStyle,
          ]}
        >
          <Text style={styles.textFront}>{'A'}</Text>
        </Animated.View>
      </Pressable>

      <Pressable onPress={toggleBool}>
        <Animated.View
          style={[
            styles.triangle,
            {
              borderLeftWidth: pickWidth,
              borderRightWidth: pickWidth,
              borderTopWidth: pickWidth * 1.4,
            },
            styles.backCard,
            backAnimatedStyle,
          ]}
        >
          <Text style={styles.textBack}>{'B'}</Text>
        </Animated.View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,

    borderStyle: 'solid',
    borderRadius: 90,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute', // Ensures overlap of both sides
  },
  textFront: {
    color: 'white',
    // position: 'absolute', // Ensures text is centered within the triangle
    top: -55,
  },
  textBack: {
    color: 'blue',
    // position: 'absolute', // Ensures text is centered within the triangle
    top: -55,
  },
  backCard: {
    // Additional styling for back card if needed
    backfaceVisibility: 'hidden',
    borderTopColor: 'white',
  },
})

export default PickShape
