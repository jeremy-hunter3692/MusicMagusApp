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

const DisplayScrollWheelCards = ({ userAnswerSetter, cardsArray }) => {
  const [selected, setSelected] = useState(0)
  const [visibleItems, setVisibleItems] = useState(['Hi'])
  const [displayArray, setDisplayArray] = useState(cardsArray)
  const [count, setCount] = useState(1)
  // const [display, setDisplay] = useState(0)
  const prevScrollY = useRef(1)
  console.log(
    { count },
    cardsArray.length * count,
    cardsArray.length * count + cardsArray.length * count
  )
  function setAnswer(inpt) {
    console.log('set Answer clicked')
  }

  // function setNextSelected(event) {
  //   const scrollY = Math.floor(event.nativeEvent.contentOffset.y)
  //   const checkedY = scrollY > cardsArray.length * scrollRate ? 0 : scrollY

  //   setSelected(Math.floor(checkedY / scrollRate))
  // }
  function isNumberInRange(number, min, max) {
    return number >= min && number <= max
  }

  function handleScroll(event) {
    const scrollY = event.nativeEvent.contentOffset.y

    if (prevScrollY.current < scrollY) {
      if (Math.floor(scrollY / scrollRate) < cardsArray.length) {
        setSelected(Math.floor(scrollY / scrollRate))
      } else {
        let intervalEveryCard = Math.floor(scrollY / scrollRate)
        console.log(intervalEveryCard)
        !isNumberInRange(
          intervalEveryCard,
          cardsArray.length * count,
          cardsArray.length * count + cardsArray.length
        )
          ? setCount((x) => x + 1)
          : ''

        //check if a 50 has gone past.
        //increase subcount
        setSelected(intervalEveryCard - cardsArray.length * count - 1)
        setDisplayArray(displayArray.concat(cardsArray))
        // setSelected(
        //   Math.floor(scrollY / scrollRate) - cardsArray.length * count
        // )

        // setSelected(
        //   Math.floor(scrollY / scrollRate) - cardsArray.length * count3
        // )

        // setCount((x) => x + 1):''
      }

      // selected > cardsArray.length - 3
      //   ? setDisplayArray(displayArray.concat(cardsArray))
      //   : console.log('no add')
    } else {
      console.log('down')
    }
    //have a reset of scrollY when above cross over length
    // let crossOverLength = cardsArray.length * scrollRate
    // let tempSelected = Math.floor(scrollY / scrollRate)
    // setVisibleItems([tempSelected])

    // if (scrollY >= crossOverLength) {
    //   console.log('if', cardsArray.length * scrollRate)
    //   setSelected(Math.floor(tempSelected - cardsArray.length))
    //   setDisplayArray(displayArray.concat(cardsArray))
    // } else {
    //   console.log('else', Math.floor(tempSelected / scrollRate))
    //   setSelected(tempSelected)

    // }
    prevScrollY.current = scrollY
  }

  return (
    <>
      <Text>{visibleItems}</Text>{' '}
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
          onScroll={handleScroll}
          scrollEventThrottle={50}
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
