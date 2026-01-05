import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  PanResponder,
} from 'react-native'
import React, { useState, useRef } from 'react'
import CardButton from '../CardButton.js'

const scrollRate = 50
const displayAmountAdjust = 5
let count = 0
let addedCards = false
let removedCards = false
let every50

const StaticImgs = ({ userAnswerSetter, cardsArray }) => {
  const [selected, setSelected] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [visibleItems, setVisibleItems] = useState(['Hi'])
  const [displayArray, setDisplayArray] = useState(cardsArray)
  console.log({ selected })
  const scrollViewRef = useRef(null)
  const prevScrollY = useRef(0)

  function isNumberInRange(number, min, max) {
    return number >= min && number < max
  }

  function addToDisplayArr() {}

  function handleSrollTwo(newScrollOffset) {
    const scrollY = newScrollOffset

    const scrollRateAsInt = Math.floor(scrollY / scrollRate)

    if (prevScrollY.current <= scrollY) {
      console.log('up')
      if (scrollRateAsInt > every50) {
        count = count >= 11 ? 0 : count + 1
        setSelected(count)
      }
    }
    if (prevScrollY.current >= scrollY) {
      console.log('down')
      if (scrollRateAsInt < every50) {
        count = count <= 0 ? 11 : count - 1
        console.log(count)
        setSelected(count)
      }
    }
    every50 = scrollRateAsInt
    prevScrollY.current = scrollY
  }

  function indexInLimits(offset) {
    let result =
      selected + offset > cardsArray.length - 1
        ? selected + offset - cardsArray.length
        : offset + selected

    return result
  }

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,

      // When the user starts to move their finger
      onPanResponderMove: (event, gestureState) => {
        // Update the scroll offset based on the gesture movement

        const newScrollOffset = scrollOffset - gestureState.dy
        setScrollOffset(newScrollOffset)
        handleSrollTwo(newScrollOffset)
        // Manually update the ScrollView's content offset
        // scrollViewRef.current.scrollTo({ y: newScrollOffset })
      },
    })
  ).current

  return (
    <>
      <View>
        {cardsArray[selected] ? (
          <CardButton
            data={cardsArray[selected]}
            source={cardsArray[selected].imgSrc}
            position={styles.selectedCard}
          />
        ) : (
          ''
        )}
      </View>
      <View style={styles.imgCont}>
        <View
          style={styles.scrollArea}
          {...panResponder.panHandlers}
          ref={scrollViewRef}
        >
          <Image
            source={cardsArray[indexInLimits(2)].imgSrc}
            style={{ ...styles.card, top: 1 * scrollRate }}
          />
          <Image
            source={cardsArray[indexInLimits(1)].imgSrc}
            style={{ ...styles.cardTwo, top: 2 * scrollRate }}
          />
          <Image
            source={cardsArray[selected].imgSrc}
            style={{ ...styles.selectedCard, top: 3 * scrollRate }}
          />
        </View>
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
  cardTwo: {
    position: 'absolute',
    width: 100,
    height: 150,
    margin: 10,
    padding: 5,
    zIndex: 1,
  },
  selectedCard: {
    position: 'absolute',
    top: 0,
    left: 25,
    margin: 10,
    padding: 5,
    width: 100,
    height: 150,

    zIndex: 2,
  },
  scrollArea: {
    height: 100,
  },
})
export default StaticImgs
