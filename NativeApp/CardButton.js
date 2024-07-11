import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, View, useWindowDimensions } from 'react-native'
import { noteAudioSrc } from './data/NotesAudiosSrc'
let hasPlayed = true

const CardButton = ({
  onPress,
  data,
  source,
  autoPlay = false,
  answer,
  findAudioSourceFunction,

}) => {
  const { width } = useWindowDimensions()
  const cardWidth = width * 0.138
  const cardHeight = cardWidth * 1.5
  const [note, setNote] = useState()
  const [playBool, setPlayBool] = useState()

  function cardButtonOnPress(inpt) {
    if (autoPlay === true) {
      let answerNote = onPress(answer)
      setNote(answerNote)
    }

    let res = findAudioSourceFunction ? findAudioSourceFunction(inpt) : ''
    onPress(inpt)
    res ? setNote(res) : ''
    note ? setPlayBool((bool) => !bool) : ''
    hasPlayed = true
  }
  useEffect(() => {
    hasPlayed = false
    let timeOutId = setTimeout(() => {
      autoPlay && !hasPlayed && answer ? cardButtonOnPress(data) : ''
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [answer])

  return (
    <>
      <PlaySound inpt={note} playBool={playBool} />
      <Pressable
        onPress={() => {
          cardButtonOnPress(data)
        }}
        style={{
          marginHorizontal: 0,
          marginVertical: 5,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: cardWidth,
          height: cardHeight, //</>* 3,
        }}
      >
        <Image
          source={source}
          style={{
            flex: 1,
            margin: 0,
            padding: 0,

            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            // margin: 0,
            // width: cardWidth * 1.5,
            // height: cardWidth * 3,
          }}
          // style={position || { width: 100, height: 150, margin: 5 }}
        />
      </Pressable>
    </>
  )
}

export default CardButton
