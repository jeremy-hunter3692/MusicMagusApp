import React, { useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native'
import AnnotatedCards from './AnnotatedCards'

import { keys } from '../data/KeyCards'
import { noteNames } from '../data/NoteCards'
import { intervals } from '../data/IntervalCards'
import { getDataForAnnotated } from '../functions/functions.js'

const ExploreCards = () => {
  const [cardsIdx, setCardsIdx] = useState(0)
  const [cardFocus, setCardFocus] = useState({ value: keys[0] })
  //maybe use as props instead?
  const { width, height } = useWindowDimensions()
  const cardWidth = width > height ? width * 0.05 : width * 0.07
  const cardHeight = cardWidth * 1.5

  // const { bottomRText, bottomLText, topRtext, topLText } =
  //   getDataForAnnotated(cardFocus)
  console.log(width / 10, height / 10)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'columns',

      padding: 1,
    },
    images: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: 0,
    },
    image: {
      width: cardWidth,
      height: cardHeight,
    },
    annotated: {
      flex: 3,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.images}>
        <Pressable onPress={() => setCardsIdx((x) => (x + 1) % 12)}>
          <Image source={keys[cardsIdx].imgSrc} style={styles.image} />
        </Pressable>
        <Pressable>
          <Image source={intervals[cardsIdx].imgSrc} style={styles.image} />
        </Pressable>
        <Pressable>
          <Image source={noteNames[cardsIdx].imgSrc} style={styles.image} />
        </Pressable>
      </View>
      <View style={styles.annotated}>
        <AnnotatedCards data={cardFocus} />
      </View>
    </View>
  )
}

export default ExploreCards
