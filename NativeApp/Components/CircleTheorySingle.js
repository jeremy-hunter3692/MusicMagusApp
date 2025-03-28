import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CircleTheorySingle = ({ text, circle, textStyle }) => {
  return (
    <View style={circle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  )
}

export default CircleTheorySingle
