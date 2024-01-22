import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useState, useRef } from 'react'
import CardButton from './CardButton.js'

const scrollRate = 50
const displayAmountAdjust = 5
let count = 1
let addedCards = false
let removedCards = false
let every50
const DisplayScrollWheelCards = ({ userAnswerSetter, cardsArray }) => {
  const [selected, setSelected] = useState(0)
  const [visibleItems, setVisibleItems] = useState(['Hi'])
  const [displayArray, setDisplayArray] = useState(cardsArray)

  // const [display, setDisplay] = useState(0)
  const prevScrollY = useRef(1)
  console.log(displayArray.length, selected)
  // console.log(
  //   displayArray.length,
  //   { selected },
  //   { count },
  //   cardsArray.length * count,
  //   cardsArray.length * count + cardsArray.length * count
  // )
  function setAnswer(inpt) {
    console.log('set Answer clicked')
  }

  // function setNextSelected(event) {
  //   const scrollY = Math.floor(event.nativeEvent.contentOffset.y)
  //   const checkedY = scrollY > cardsArray.length * scrollRate ? 0 : scrollY

  //   setSelected(Math.floor(checkedY / scrollRate))
  // }
  function isNumberInRange(number, min, max) {
    return number >= min && number < max
  }

  function handleScroll(event) {
    if (displayArray.length > 24) {
      console.log('first if')
      displayArray.slice(cardsArray.length)
      console.log(displayArray.length)
    }
    const scrollY = event.nativeEvent.contentOffset.y

    if (prevScrollY.current < scrollY) {
      if (Math.floor(scrollY / scrollRate) < cardsArray.length) {
        setSelected(Math.floor(scrollY / scrollRate))
      } else {
        let intervalEveryCard = Math.floor(scrollY / scrollRate)
        if (
          !isNumberInRange(
            intervalEveryCard,
            cardsArray.length * count,
            cardsArray.length * count + cardsArray.length
          )
        ) {
          count++

          displayArray.slice(cardsArray.length)
          console.log(displayArray.length)

          console.log({ intervalEveryCard })
        }

        setSelected(intervalEveryCard - cardsArray.length * count)

        setDisplayArray(displayArray.concat(cardsArray))
      }
    } else {
      console.log('down')
    }

    prevScrollY.current = scrollY
  }

  function addToDisplayArr() {
    setDisplayArray(displayArray.concat(cardsArray))

    console.log('added2')
  }

  function removeFromDisplayArr() {
    setDisplayArray(displayArray.slice(cardsArray.length))
    console.log('removed')

    removedCards = true
  }
  function handleSrollTwo(e) {
    const scrollY = e.nativeEvent.contentOffset.y
    const initArrLength = cardsArray.length
    const scrollRateAsInt = Math.floor(scrollY / scrollRate)

    if (prevScrollY.current <= scrollY) {
      if (scrollRateAsInt > every50) {
        // count >= 11 ? 0 : prevSelected + 1
        setSelected((prevSelected) =>
          prevSelected >= 11 ? 0 : prevSelected + 1
        )
      }
      ///////////////////////////
      if (
        selected > 4 &&
        selected < 7 &&
        displayArray.length > cardsArray.length * 4
      ) {
        removeFromDisplayArr()
      }
      // // console.log('up', addedCards, removedCards, scrollRateAsInt)
      if (
        selected > 4 &&
        selected < 7 &&
        displayArray.length < cardsArray.length * 5
      ) {
        addToDisplayArr()
      }
      //  else {
      //   setSelected(scrollRateAsInt)
      // }
    } else {
      console.log('down')
    }
    every50 = scrollRateAsInt
    prevScrollY.current = scrollY
  }

  return (
    <>
      {displayArray.map((x, idx) => (
        <Text key={idx}>{x.name}</Text>
      ))}
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
          onScroll={handleSrollTwo}
          scrollEventThrottle={100}
        >
          {/* {Array.from({ length: visibleItems }, (x, idx) => { */}

          {displayArray.map((x, idx) => {
            return (
              <View key={idx}>
                <Image
                  source={x.imgSrc}
                  style={{ ...styles.card, top: idx * scrollRate }}
                />
              </View>
            )
          })}
        </ScrollView>
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
