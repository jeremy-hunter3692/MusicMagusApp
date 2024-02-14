import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CardButton from '../CardButton.js'
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated'
const scrollRate = 50

const ScrollWheelExample = ({ cardsArray }) => {
  const [selected, setSelected] = useState(0)
  const [displayArray, setDisplayArray] = useState(cardsArray)
  const scrollY = useSharedValue(0)
  const animatedValue = useSharedValue(0)
  const scrollViewRef = useRef(null)

  const onScrollHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      // Update scrollY based on the vertical translation

      setSelected((prevSelected) => (prevSelected >= 11 ? 0 : prevSelected + 1))
      scrollY.value = event.translationY
    },
    onEnd: () => {
      // Handle any cleanup or finalization here if needed
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value }],
    }
  }, [animatedValue])

  return (
    <View style={{ flex: 1 }}>
      <Text>new thing{selected}</Text>
      <PanGestureHandler onGestureEvent={onScrollHandler}>
        <Animated.View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(event) => {
              // Update scrollY when the user scrolls using ScrollView
              scrollY.value = event.nativeEvent.contentOffset.y
            }}
          >
            {/* Your scrollable content goes here */}
            <View style={{ height: 1000 }}>
              <Text>Scrollable Content</Text>
            </View>
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>

      {/* Indicator or any other UI components */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            backgroundColor: 'blue',
          },
          animatedStyle,
        ]}
      />
    </View>
  )
}
export default ScrollWheelExample
