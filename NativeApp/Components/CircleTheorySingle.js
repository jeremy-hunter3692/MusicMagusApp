import React from 'react'
import { Animated, View, Text, StyleSheet } from 'react-native'

const CircleTheorySingle = ({ text, circle, textStyle, positions }) => {
  // console.log(text, circle)
  const fixedCircle = { ...circle[0], ...circle[1] }

  return (
    <Animated.View
      key={text}
      style={[
        fixedCircle,
        {
          transform: [
            { translateX: positions[text].x },
            { translateY: positions[text].y },
          ],
        },
      ]}
      ref={(ref) => {
        if (ref) {
          ref.measure((x, y, width, height, pageX, pageY) => {
            console.log('re', text, fixedCircle)
          })
        }
      }}
    >
      <View style={circle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </Animated.View>
  )
}

export default CircleTheorySingle
