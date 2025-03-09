import React from 'react'
import { Text, View, Pressable } from 'react-native'

const Circle = ({ fillBool, scoreCircleRadius, underLine }) => {
  // console.log(fillBool)

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
            width: scoreCircleRadius * 1.5,
            // marginTop: 'auto',
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
              border: 'solid',
              borderColor: 'black',
              borderRadius: scoreCircleRadius * 0.5,
              backgroundColor: 'transparent',
            }}
          ></View>
        ) : fillBool ? (
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
              borderRadius: scoreCircleRadius * 0.5,
              backgroundColor: 'transparent',
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
                borderRadius: scoreCircleRadius * 0.3,
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
