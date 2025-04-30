import React from 'react'
import { Text, View, Pressable } from 'react-native'

const Circle = ({
  fillBool,
  scoreCircleRadius,
  underLine,
  circlesInsideColor,
}) => {
  scoreCircleRadius = Math.floor(scoreCircleRadius)
  console.log('SCORE CIRCLE RADIUS', scoreCircleRadius, fillBool)

  return (
    <>
      <View
        style={[
          {},
          underLine && {
            borderRightColor: 'transparent',
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderBottomColor: 'black',
            borderWidth: 2,
            margin: 0,
            padding: 0,
            width: scoreCircleRadius * 1.1,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {fillBool === null ? (
          <View
            style={{
              width: scoreCircleRadius,
              height: scoreCircleRadius,
              margin: 0,
              padding: 0,

              borderColor: 'black',
              borderWidth: 1,
              borderRadius: scoreCircleRadius * 0.5,
              backgroundColor: circlesInsideColor,
            }}
          ></View>
        ) : fillBool ? (
          <View
            style={{
              width: scoreCircleRadius,
              height: scoreCircleRadius,
              margin: 0,
              padding: 0,
              borderRadius: scoreCircleRadius * 0.5,
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
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: scoreCircleRadius * 0.5,
              backgroundColor: circlesInsideColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                position: 'absolute',
                width: scoreCircleRadius * 0.3,
                height: scoreCircleRadius * 0.3,
                margin: 0,
                padding: 0,
                borderRadius: scoreCircleRadius * 0.5,
                backgroundColor: 'black',
              }}
            ></View>
          </View>
        )}
      </View>
    </>
  )
}
export default Circle
