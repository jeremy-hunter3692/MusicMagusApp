import React from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'

const CardButton = ({ onPress, data, source }) => {
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View>
        <Image source={source} style={{ width:100, height: 150 , margin: 5}} />
        <Text></Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardButton
