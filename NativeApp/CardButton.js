import React from 'react'
import { Pressable, Image, Text, View, Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const CardButton = ({ onPress, data, source, position }) => {
  // console.log('styles', position.zIndex, position.top)
  return (
    <Pressable onPress={() => onPress(data)}>
      <View style={{ flex: 1, margin: 0, padding: 0 }}>
        <Image
          source={source}
          style={{
            flex: 0.8,
            resizeMode: 'center',

            width: screenWidth / 6 -10 ,
            aspectRatio: 1,
            // height: '100%',
            margin: 0,
            padding: 1,
            borderRadius: 10,
          }}
          // style={position || { width: 100, height: 150, margin: 5 }}
        />
      </View>
    </Pressable>
  )
}

export default CardButton
