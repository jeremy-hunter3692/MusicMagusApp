import React from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'

const CardButton = ({ onPress, data, source, position }) => {
  console.log('styles', position.zIndex, position.top)
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View>
        <Image
          source={source}
          style={position || { width: 100, height: 150, margin: 5 }}
        />
        <Text></Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardButton
