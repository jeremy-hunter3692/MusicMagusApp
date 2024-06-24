import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, Text, View, useWindowDimensions } from 'react-native'

const CardButton = ({ onPress, data, source, autoPlay = false, position }) => {
  const { height, width, scale, fontScale } = useWindowDimensions()
  const cardWidth = width * 0.1
  const [note, setNote] = useState()
  const [playBool, setPlayBool] = useState()
  console.log('cbLoad', autoPlay)

  // useEffect(() => {
  //   console.log('use/reload?')
  //   setTimeout(() => (autoPlay ? cardButtonOnPress(data) : ''), 1000)
  // }, [])

  function cardButtonOnPress(inpt) {
    let res = onPress(inpt)
    setNote(res)
    setPlayBool((bool) => !bool)

  }



  return (
    <>
      <PlaySound inpt={note} playBool={playBool} />
      <Pressable
        onPress={() => {
          cardButtonOnPress(data)
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
    </>
  )
}

export default CardButton
