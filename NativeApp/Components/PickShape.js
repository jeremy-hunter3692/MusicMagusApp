import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

const PickShape = ({ questionAB }) => {
  const [abBool, setabBool] = useState(true)

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
    <View style={styles.container}>
      <Pressable onPress={toggleBool}>
        {/* Front side */}
        <Animated.View style={[styles.triangle, frontAnimatedStyle]}>
          <Text style={styles.textFront}>{'A'}</Text>
        </Animated.View>
      </Pressable>
      {/* Back side */}
      <Pressable onPress={toggleBool}>
        <Animated.View
          style={[styles.triangle, styles.backCard, backAnimatedStyle]}
        >
          <Text style={styles.textBack}>{'B'}</Text>
        </Animated.View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: -50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 110,
    
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderTopWidth: 100,
    borderStyle: 'solid',
    borderRadius: 90,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Ensures overlap of both sides
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
