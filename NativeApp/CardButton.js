import React from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'

const CardButton = ({ onPress, data, source, position }) => {
  console.log(position)
  // console.log('styles', position.zIndex, position.top)
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={position}>
        <Image
          source={source}
          style={{
            width: 100,
            height: 150,
            marginLeft: 0,
            margineRight: 0,
            marginBottom: 0,
            padding: 0,
            borderRadius: 10,
          }}
          // style={position || { width: 100, height: 150, margin: 5 }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default CardButton
