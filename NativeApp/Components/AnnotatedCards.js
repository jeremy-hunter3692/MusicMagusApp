import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { keys } from '../data/KeyCards.js'
import {
  getAccidentalNames,
  replaceFlatsForSharps,
} from '../functions/functions.js'

const AnnotatedCards = ({ data }) => {
  const fontSize = 40

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
        <Text style={styles.textMain}>
          Key: {data?.value.name} Month refers to blah blah blah blah blah blah
        </Text>
        <Text style={styles.textMain}>
          Relative Minor: {relativeMinor} Minor
        </Text>
      </View>

      {/* Second column with image */}
      <View style={styles.imageColumn}>
        <Image
          source={data?.value.imgSrc}
          testID="image"
          style={styles.image}
        />
      </View>

      {/* Third column with text */}
      <View style={styles.column}>
        <Text></Text>
        <Text style={styles.textMain}>
          Accidentals: {noOfAccidentals + ':' + ' ' + sanitisedAccidentalsNames}
        </Text>
      </View>
    </View>
  )
}

export default AnnotatedCards
