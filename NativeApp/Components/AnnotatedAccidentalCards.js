import React from 'react'
import { View, Image, ScrollView, StyleSheet } from 'react-native'
import { getAccidentalNames } from '../functions/functions.js'
import { noteNames } from '../data/NoteCards.js'
const AnnotatedAccidentalCards = ({ keyCard, dimensions }) => {
  const images = []
  const { height: h } = dimensions || { height: 400 }

  if (keyCard != null && keyCard.intervals != null) {
    const accidentalNames = getAccidentalNames(keyCard)
    accidentalNames.map((name) => {
      const noteCard = noteNames.find((note) => note.name === name)
      return noteCard ? images.push(noteCard.imgSrc) : null
    })
  }
  const imagesTop = images.slice(0, 3)
  const imagesBottom = images.slice(3, 6)
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        padding: 3,
      }}
    >
      <View style={[styles.row]}>
        {imagesTop?.map((src, idx) => {
          const source = typeof src === 'string' ? { uri: src } : src

          return (
            <View key={idx + 'top'} style={{ flex: 1, margin: 0 }}>
              <Image
                testID="image"
                source={source}
                style={{ height: h / 4, width: '90%' }}
                resizeMode="contain"
              />
            </View>
          )
        })}
      </View>
      <View style={styles.row}>
        {imagesBottom?.map((src, idx) => {
          const source = typeof src === 'string' ? { uri: src } : src
          return (
            <View key={idx + 'bottom'} style={{ flex: 1, margin: 0 }}>
              <Image
                testID="image"
                source={source}
                style={{ height: h / 4, width: '90%' }}
                resizeMode="contain"
              />
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
})

export default AnnotatedAccidentalCards
