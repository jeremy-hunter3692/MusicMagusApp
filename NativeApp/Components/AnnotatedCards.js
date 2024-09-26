import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { keys } from '../data/KeyCards.js'
import {
  getAccidentalNames,
  replaceFlatsForSharps,
} from '../functions/functions.js'

const AnnotatedCards = ({ data }) => {
  const fontSize = 25
  let bottomRText
  let bottomLText
  let topRtext
  let topLText

  let noOfAccidentals = data?.value.intervals.reduce(
    (count, value) => count + (value === true ? 1 : 0),
    0
  )
  let relativeMinor = keys[data.idx - 3]?.name
  relativeMinor = replaceFlatsForSharps('B', [relativeMinor])

  let getAccidentals = getAccidentalNames(data.value)
  let sanitisedAccidentalsNames = replaceFlatsForSharps(
    data.value.name,
    getAccidentals
  )

  topLText = `Key: ${data?.value.name} Month refers to blah blah blah blah blah blah`
  bottomLText = `Relative Minor: ${relativeMinor} Minor`
  bottomRText = `Accidentals: ${
    noOfAccidentals + ':' + ' ' + sanitisedAccidentalsNames
  }`
  topRtext = ''

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: '100%',
    },
    textMain: {
      color: 'white',
      fontSize: fontSize,
      borderColor: 'black',
      borderWidth: 1,
      maring: 2,
    },
    column: {
      flex: 1, // Each column takes equal space
      justifyContent: 'space-between',
      // paddingHorizontal: 10,
    },
    imageColumn: {
      flex: 1.5, // Image column slightly larger if needed
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  })

  return (
    <View style={styles.container}>
      {/* First column with text */}
      <View style={styles.column}>
        <Text style={styles.textMain}>{topLText}</Text>
        <Text style={styles.textMain}>
       { bottomLText}  
        </Text>
      </View>

      <View style={styles.imageColumn}>
        <Image
          source={data?.value.imgSrc}
          testID="image"
          style={styles.image}
        />
      </View>

      <View style={styles.column}>
        <Text>{topRtext}</Text>
        <Text style={styles.textMain}>{bottomRText}</Text>
      </View>
    </View>
  )
}

export default AnnotatedCards
