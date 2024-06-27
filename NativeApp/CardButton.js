import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, View, useWindowDimensions } from 'react-native'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'

let hasPlayed = false
const CardButton = ({
  onPress,
  data,
  source,
  autoPlay = false,
  reTrig,
  findAudioSourceFunction,
  position,
}) => {
  const { height, width, scale, fontScale } = useWindowDimensions()
  const cardWidth = width * 0.1
  const [note, setNote] = useState()
  const [playBool, setPlayBool] = useState()

  function cardButtonOnPress(inpt) {
    // let noteSource = findNote(inpt.name, noteAudioSrc)
    let res = findAudioSourceFunction(inpt)
    onPress(inpt)
    console.log('res', res, 'inpt', inpt)
    setNote(res)
    note ? setPlayBool((bool) => !bool) : ''
    autoPlay = hasPlayed ? true : false
  }
  useEffect(() => {
    //need clean up timoutId somehow
    hasPlayed = false
    // autoPlay ? console.log('use', hasPlayed) : ''
    setTimeout(() => {
      autoPlay && !hasPlayed ? cardButtonOnPress(data) : ''
    }, 1000)
  }, [reTrig])

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
