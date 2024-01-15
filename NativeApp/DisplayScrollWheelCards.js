import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import CardButton from './CardButton.js'

const scrollRate = 50

const DisplayScrollWheelCards = ({ userAnswerSetter, cardsArray }) => {
  const [selected, setSelected] = useState(0)
  // const [prevWheelPos, setPrevWheelPos] = useState(0)
  const [display, setDisplay] = useState(0)

  function setAnswer(inpt) {
    console.log('set Answer clicked')
  }

  function setNextSelected(event) {
    const scrollY = Math.floor(event.nativeEvent.contentOffset.y)

    setSelected(Math.floor(scrollY / scrollRate))
  }

  return (
    <>
      <View style={styles.imgCont}>
        {cardsArray[selected] ? (
          <CardButton
            data={cardsArray[selected]}
            source={cardsArray[selected].imgSrc}
            position={styles.selectedCard}
          />
        ) : (
          ''
        )}
        <ScrollView
          style={styles.scrollView}
          onScroll={setNextSelected}
          scrollEventThrottle={50}
        >
          <View key={0}>
            <Image
              source={cardsArray[0].imgSrc}
              style={{ ...styles.card, top: 0 }}
            />
          </View>
          <View key={1}>
            <Image
              source={cardsArray[1].imgSrc}
              style={{ ...styles.card, top: 40 }}
            />
          </View>
          <View key={3}>
            <Image
              source={cardsArray[2].imgSrc}
              style={{ ...styles.card, top: 80 }}
            />
          </View>
        </ScrollView>
        {display}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imgCont: {
    flex: 1,
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: 100,
    height: 150,
    margin: 10,
    padding: 5,
  },
  selectedCard: {
    position: 'absolute',
    top: -100,
    left: 350,
    width: 100,
    height: 150,
    margin: 10,
    padding: 5,
    zIndex: 1,
  },
  scrollView: {
    borderWidth: 1, // Border width
    borderColor: 'black', // Border color
    borderRadius: 8, // Border radius (optional)
    height: 100,
  },
})
export default DisplayScrollWheelCards
