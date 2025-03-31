import React from 'react'
import { Animated, View, Text, StyleSheet } from 'react-native'

const CircleTheorySingle = ({ text, source, circle, textStyle, positions }) => {
  const fixedCircle = { ...circle[0], ...circle[1] }
  console.log(source)
  return (
    <View>
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
            ref.measure((x, y, width, height, pageX, pageY) => {})
          }
        }}
      >
        <View style={circle}>
          <Text style={textStyle}>{text}</Text>
        </View>
        <View>
          <Text style={{ color: 'white' }}>
            {'           :' + source?.name}
          </Text>
        </View>
      </Animated.View>
    </View>
  )
}

export default CircleTheorySingle
