import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import CardButton from './CardButton'
import {
  returnScaleCards,
  generateModesSemiToneIncrements,
} from '../functions/functions'
import { keys } from '../data/KeyCards'
import { intervals } from '../data/IntervalCards'
import { noteNames } from '../data/NoteCards'
import DisplayCardsGrid from './DisplayCardsGrid'

const modesArray = generateModesSemiToneIncrements()

const initScale = returnScaleCards(keys[0], modesArray[0], noteNames)
const modeNames = [
  'Ionian',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian',
  'Locrian',
]
const ScaleExplore = () => {
  const [rootIDX, setRootIDX] = useState(0)
  const [modeIDX, setModeIDX] = useState(0)
  const [scale, setScale] = useState(initScale)
  const [parentKey, setParentKey] = useState(keys[0])

  const cardHeight = 150
  const cardWidth = 100

  useEffect(() => {
    getNewCards()
  }, [rootIDX, modeIDX])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'purple',
    },
    rowImage: {
      flex: 1,
      maxHeight: cardHeight,
      maxWidth: cardWidth,
      width: cardWidth,
      height: cardHeight,
    },
    rowImageCont: {
      flex: 1,
      borderColor: 'black',
      borderWidth: 1,
      width: cardWidth,
      height: cardHeight,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    selectingImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
  })

  function getNewCards() {
    let newNoteScale = returnScaleCards(keys[rootIDX], modesArray[modeIDX])
    setScale(newNoteScale)
    let res = getParentKey()

    setParentKey(res === undefined ? keys[rootIDX].imgSrc : res)
  }

  function getParentKey() {
    //TO DO RENAME THESE
    let res = scale.length - modeIDX
    let idx = scale[res]
    console.log('r', res, idx)
    return keys[idx]?.imgSrc
  }

  function intervalActulIDX() {
    let accumulator = 0
    return (
      <View style={styles.rowImageCont}>
        <Image
          source={intervals[0].imgSrc} // Use the image source for interval 0
          style={styles.rowImage}
        />
        {modesArray[modeIDX].map((x) => {
          accumulator = accumulator + x

          return (
            <Image
              key={`interval-${accumulator}`}
              source={intervals[accumulator].imgSrc}
              style={styles.rowImage}
            />
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={parentKey} style={styles.rowImage} />
      <View style={styles.rowImageCont}>
        {/* <DisplayCardsGrid
          cardsArray={keys}
          cardSize={{ cardHeight: cardHeight, cardWidth: cardWidth }}
        /> */}

        {keys.map((x, idx) => {
          let selected = x.name === keys[rootIDX]?.name
          return (
            <Pressable onPress={() => setRootIDX(idx)}>
              <Image
                source={x?.imgSrc}
                style={[
                  styles.rowImage,
                  selected && {
                    borderColor: 'green',
                    borderWidth: 3,
                  },
                ]}
              />
            </Pressable>
          )
        })}
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        {modeNames.map((x, idx) => {
          let selected = idx === modeIDX
          return (
            <Pressable
              style={{ width: cardWidth }}
              onPress={() => setModeIDX(idx)}
            >
              <Text
                style={[
                  { color: 'white' },
                  selected && {
                    borderColor: 'white',
                    borderWidth: 3,
                  },
                ]}
              >
                {x}
              </Text>
            </Pressable>
          )
        })}
      </View>
      {/* <Pressable onPress={()=>}>rooe</Pressable> */}

      <View style={styles.rowImageCont}>
        {scale.map((x) => {
          return <Image source={noteNames[x].imgSrc} style={styles.rowImage} />
        })}
      </View>
      {intervalActulIDX()}
    </View>
  )
}

export default ScaleExplore
