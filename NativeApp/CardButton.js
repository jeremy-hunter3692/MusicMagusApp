import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, View, useWindowDimensions } from 'react-native'
import { getAltOctaveNotes } from './functions/functions'
import { noteAudioSrc } from './data/NotesAudiosSrc'
let hasPlayed = true

const CardButton = ({
  onPress,
  data,
  source,
  autoPlay = false,
  reTrig,
  answer,
  findAudioSourceFunction,
  position,
  root,
}) => {
  const { height, width, scale, fontScale } = useWindowDimensions()
  const cardWidth = width * 0.1
  const [note, setNote] = useState()
  const [playBool, setPlayBool] = useState()

  function cardButtonOnPress(inpt) {
    if (autoPlay === true) {
      console.log('auto')
      //ANSWEr ISNT BEIGMN PASSED DOWN?
      //TO DO -This all feels like a lot maybe do at top level and pass down
      let answerNote = noteAudioSrc.filter((x) => x.name === answer.name)
      let corrected = getAltOctaveNotes(answerNote[0], root, noteAudioSrc)

      setNote(corrected)
    }

    let res = findAudioSourceFunction ? findAudioSourceFunction(inpt) : ''
    onPress(inpt)
    res ? setNote(res) : ''
    note ? setPlayBool((bool) => !bool) : ''
    hasPlayed = true
  }
  useEffect(() => {
    hasPlayed = false
    console.log('use')
    // console.log('use answer', { autoPlay }, { answer })
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
