import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const CircleHex = ({ idx, data, name, clickHandler, size }) => {
  return (
    <Pressable onPress={() => clickHandler(idx)}>
      <View
        style={
          data
            ? {
                alignItems: 'center',
                justifyContent: 'center',
                width: size,
                height: size,
                margin: 0,
                padding: 0,
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: size * 0.5,
                backgroundColor: 'black',
              }
            : {
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'black',
                width: size,
                height: size,
                margin: 0,
                padding: 0,
                borderRadius: size * 0.5,
                backgroundColor: 'white',
              }
        }
      >
        {/* <Text style={{ color: data ? 'white' : 'black' }}>{name}</Text> */}
      </View>
    </Pressable>
  )
}

export default CircleHex
