import React from 'react'
import { Pressable, Image, Text, View, useWindowDimensions } from 'react-native'

const CardButton = ({ onPress, data, source, position }) => {
  // console.log('styles', position.zIndex, position.top)
  const { height, width, scale, fontScale } = useWindowDimensions()
  return (
    <Pressable onPress={() => onPress(data)}>
      <Image
        source={source}
        style={{
          // flex: 1,
          width: width * 0.09,

          // resizeMode: 'cover',
          // height: 'auto',
          // minWidth: 60,
          // backgroundColor: 'black',
          // width: screenWidth / 6 - 15,
          aspectRatio: 2 / 3,
          // height: '100%',
          margin: 5,

          // borderRadius: 10,
        }}
        // style={position || { width: 100, height: 150, margin: 5 }}
      />
    </Pressable>
  )
}

export default CardButton
