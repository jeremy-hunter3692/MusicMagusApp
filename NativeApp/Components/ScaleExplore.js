import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import CardButton from './CardButton'
import {
  returnScaleCards,
  generateModesSemiToneIncrements,
  getDataForAnnotated,
} from '../functions/functions'
import { keys } from '../data/KeyCards'
import { intervals } from '../data/IntervalCards'
import { noteNames } from '../data/NoteCards'
import DisplayCardsGrid from './DisplayCardsGrid'
import HexKey from './HexKeyCiclesDisplay'

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
  const [selectedRoot, setSelectedRoot] = useState(noteNames[1])
  const [accidentals, setAccidentals] = useState('0')

  const cardHeight = 150
  const cardWidth = 100

  useEffect(() => {
    // console.log('use', modeIDX, scale)
    getNewCards()
  }, [rootIDX, modeIDX])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'purple',
      justifyContent: 'flex-start',
    },
    allScalesContainer: {
      // borderColor: 'white',
      // borderWidth: 2,
      width: '55%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      backgroundColor: 'purple',
    },
    scalesAndParentKeyContainer: {
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    parentKeyCont: {
      // borderColor: 'white',
      // borderWidth: 2,
      flexDirection: 'column',
      height: '80%',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    scalesContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'purple',
    },
    modeConts: {
      backgroundColor: 'green',
      width: cardWidth,
      height: cardWidth / 2,
      color: 'white',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modeText: {
      color: 'white',
      fontSize: 20,
    },
    rowImage: {
      maxHeight: cardHeight,
      maxWidth: cardWidth,
      width: cardWidth,
      height: cardHeight,
    },
    rowImageCont: {
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    selectingImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
  })

  function getNewCards() {
    let newNoteScale = returnScaleCards(noteNames[rootIDX], modesArray[modeIDX])
    setScale(newNoteScale)
    setSelectedRoot(noteNames[rootIDX])
    let res = getParentKey(newNoteScale)
    let accidentals = getDataForAnnotated({ value: res })
    setAccidentals(accidentals.bottomRText)
    setParentKey(res === undefined ? keys[rootIDX] : res)
  }

  function sumUpToIdx(arr, idx) {
    return arr.slice(0, idx).reduce((acc, val) => acc + val, 0)
  }

  function getParentKey(newNoteScale) {
    let scale = modesArray[0]
    let semitoneDistance = sumUpToIdx(scale, modeIDX)
    let actualIdx =
      (((rootIDX - semitoneDistance) % keys.length) + keys.length) % keys.length
    return keys[actualIdx]
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
      <View style={styles.allScalesContainer}>
        <Text style={styles.modeText}>Select Root Note:</Text>
        <View style={[styles.rowImageCont, { width: '80%', height: '40%' }]}>
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

        <View style={styles.scalesAndParentKeyContainer}>
          <View style={styles.scalesContainer}>
            <View style={styles.rowImageCont}>
              {modeNames.map((x, idx) => {
                let selected = idx === modeIDX
                return (
                  <Pressable
                    style={[
                      styles.modeConts,
                      selected && {
                        backgroundColor: 'purple',
                        borderRadius: 10,
                        borderColor: 'white',
                        borderWidth: 2,
                      },
                    ]}
                    onPress={() => setModeIDX(idx)}
                  >
                    <Text style={styles.modeText}>{x}</Text>
                  </Pressable>
                )
              })}
            </View>
            <View style={styles.rowImageCont}>
              {scale.map((x) => {
                return (
                  <Image source={noteNames[x].imgSrc} style={styles.rowImage} />
                )
              })}
            </View>
            {intervalActulIDX()}
          </View>
        </View>
      </View>
      <View style={styles.parentKeyCont}>
        <Text style={styles.modeText}>Root Note </Text>
        <Image source={selectedRoot.imgSrc} style={styles.rowImage} />
        <Text style={styles.modeText}>Parent Key </Text>
        <Image source={parentKey.imgSrc} style={styles.rowImage} />
        <Text style={styles.modeText}>
          {parentKey.name} scale starting from degree {modeIDX + 1} {'\n'}
          {accidentals}
        </Text>
        <View>
          <HexKey musicKey={parentKey} bgColor={'purple'} />
        </View>
      </View>
    </View>
  )
}

export default ScaleExplore
