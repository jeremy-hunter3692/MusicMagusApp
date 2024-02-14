import React from 'react'
import { Pressable, Image, Text, View } from 'react-native'

const CardButton = ({ onPress, data, source, position }) => {
  // console.log('styles', position.zIndex, position.top)
  return (
    <Pressable onPress={() => onPress(data)}>
      <Image
        source={source}
        style={{
          // flex: 1,
          // resizeMode: 'cover',
          minWidth: 50,
          // backgroundColor: 'black',
          // width: screenWidth / 6 - 15,
          aspectRatio: 2 / 3,
          // height: '100%',
          margin: 0,

          // borderRadius: 10,
        }}
        // style={position || { width: 100, height: 150, margin: 5 }}
      />
    </Pressable>
  )
}

export default CardButton
