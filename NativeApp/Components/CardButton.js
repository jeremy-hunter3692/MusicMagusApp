import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, Text, View, useWindowDimensions } from 'react-native'


let hasPlayed = true

const CardButton = ({
  onPress,
  data,
  source,
  autoPlay = false,
  answer,
  findAudioSourceFunction,
  cardSize,
  annotated,
  setAnnotatedCard,
}) => {
  const [note, setNote] = useState()
  const [playBool, setPlayBool] = useState()
  const { cardWidth, cardHeight } = cardSize || {}

  useEffect(() => {
    if (annotated) {
      return
    }
    hasPlayed = false
    let timeOutId = setTimeout(() => {
      autoPlay && !hasPlayed && answer ? cardButtonOnPress(data) : ''
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [answer])

  function cardButtonOnPress(inpt) {
    if (annotated) {
      setAnnotatedCard(data)
    } else {
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
  }

  return (
    <>
      <PlaySound inpt={note} playBool={playBool} />

      <Pressable
        onPress={() => {
          cardButtonOnPress(data)
        }}
        style={{
          marginHorizontal: 1,
          marginVertical: 5,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: cardHeight,
          maxWidth: cardWidth,
          height: cardHeight,
          width: cardWidth,
        }}
      >
        <Image
          source={source}
          testID={`image`}
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            flexShrink: 1,
            resizeMode: 'contain',
          }}
          
        />
      </Pressable>
    </>
  )
}

export default CardButton
