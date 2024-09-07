import React, { useEffect, useState } from 'react'
import PlaySound from './SingleNotePlayer'
import { Pressable, Image, Text, View, useWindowDimensions } from 'react-native'
import { keys } from '../data/KeyCards.js'
import {
  getAccidentalNames,
  replaceFlatsForSharps,
} from '../functions/functions.js'
const AnnotatedCards = ({
  onPress,
  data,
  source,
  autoPlay = false,
  answer,
  findAudioSourceFunction,
  cardSize,
}) => {
  // console.log(data)
  const fontSize = 40

  let noOfAccidentals = data?.value.intervals.reduce(
    (count, value) => count + (value === true ? 1 : 0),
    0
  )
  let relativeMinor = keys[data.idx - 3]?.name
  //TODO below is broken
  relativeMinor = replaceFlatsForSharps('B', [relativeMinor])

  // Mapping over everthing here is probably ineffcient? doubtful it will inpact much though

  let getAccidentals = getAccidentalNames(data.value)
  let sanitisedAccidentalsNames = replaceFlatsForSharps(
    data.value.name,
    getAccidentals
  )

  return (
    <>
      <View style={{ padding: 40, width: '100%', height: '100%' }}>
        <Text style={{ zIndex: 5, color: 'white', fontSize: fontSize }}>
          {' '}
          Key: {data?.value.name}
        </Text>
        <Image
          source={data?.value.imgSrc}
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
        <View
          style={{
            zIndex: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: 'white',
              // alignSelf: 'flex-start',
              fontSize: fontSize,
            }}
          >
            {' '}
            Relative Minor: {relativeMinor}Minor
          </Text>
          <Text
            style={{
              color: 'white',
              // alignSelf: 'flex-end',
              fontSize: fontSize,
            }}
          >
            Accidentals: {noOfAccidentals + ' | ' + sanitisedAccidentalsNames}
          </Text>
        </View>
      </View>
    </>
  )
}

export default AnnotatedCards
