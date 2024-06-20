import React, { useState } from 'react'
import playSound from './NotePlayer'
import { Pressable, Image, Text, View, useWindowDimensions } from 'react-native'

const CardButton = ({ onPress, data, source, position }) => {
  const { height, width, scale, fontScale } = useWindowDimensions()
  const cardWidth = width * 0.1

  return (
    <Pressable
      onPress={() => {
        let result = onPress(data)

        console.log(result)
        playSound(result)
      }}
      style={{
        margin: 0,
        width: cardWidth,
        height: cardWidth * 2,
      }}
    >
      <View
        style={{
          flex: 1,
          margin: 0,
          // borderWidth: 1,

          width: cardWidth,
          height: cardWidth * 2,
        }}
      >
        <Image
          source={source}
          style={{
            flex: 1,
            margin: 0,
            width: cardWidth,
            height: cardWidth * 2,
            resizeMode: 'contain',
          }}
          // style={position || { width: 100, height: 150, margin: 5 }}
        />
      </View>
    </Pressable>
  )
}

export default CardButton
