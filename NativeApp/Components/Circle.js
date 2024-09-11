import React from 'react'
import { Text, View, Pressable } from 'react-native'

const Circle = ({ fillBool, scoreCircleRadius }) => {
  return (
    <>
      {fillBool ? (
        <View
          style={{
            width: scoreCircleRadius,
            height: scoreCircleRadius,
            margin: 0,
            padding: 0,
            borderRadius: scoreCircleRadius * 0.5, // Half of the width and height to make it a perfect circle
            backgroundColor: 'black',
          }}
        ></View>
      ) : (
        <View
          style={{
            width: scoreCircleRadius,
            height: scoreCircleRadius,
            margin: 0,
            padding: 0,
            border: 'solid',
            borderColor: 'black',
            borderRadius: scoreCircleRadius * 0.5, // Half of the width and height to make it a perfect circle
            backgroundColor: 'transparent',
          }}
        ></View>
      )}
    </>
  )
}
export default Circle
