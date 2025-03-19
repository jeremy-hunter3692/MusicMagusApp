import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
const pickImage = require('../assets/pickImageA.png')
const backPickImage = require('../assets/pickImageB.png')
const PickShape = ({ questionAB, width }) => {
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
      position: 'absolute',
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipAnimation.value < 90 ? 1 : 0,
      backfaceVisibility: 'hidden',
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
      position: 'absolute',
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipAnimation.value > 90 ? 1 : 0,
      backfaceVisibility: 'hidden',
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
    <View style={{ margin: 0, padding: 0 }}>
      <Pressable onPress={toggleBool}>
        <Animated.View style={[frontAnimatedStyle, { position: 'absolute' }]}>
          <Image
            style={{
              height: width * 1.2,
              width: width,
              resizeMode: 'contain',
            }}
            source={pickImage}
          ></Image>
        </Animated.View>

        <Animated.View style={[backAnimatedStyle, { position: 'absolute' }]}>
          <Image
            style={{
              height: width * 1.2,
              width: width,
              resizeMode: 'contain',
            }}
            source={backPickImage}
          ></Image>
        </Animated.View>
      </Pressable>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   triangle: {
//     width: 0,
//     height: 0,

//     borderStyle: 'solid',
//     borderRadius: 90,
//     backgroundColor: 'transparent',
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: 'blue',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // position: 'absolute', // Ensures overlap of both sides
//   },
//   textFront: {
//     color: 'white',
//     // position: 'absolute', // Ensures text is centered within the triangle
//     top: -55,
//   },
//   textBack: {
//     color: 'blue',
//     // position: 'absolute', // Ensures text is centered within the triangle
//     top: -55,
//   },
//   backCard: {
//     // Additional styling for back card if needed
//     backfaceVisibility: 'hidden',
//     borderTopColor: 'white',
//   },
// })

export default PickShape
