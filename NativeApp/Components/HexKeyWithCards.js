import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Image, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import CircleHex from './CircleHex'
import { intervals as cardsArray } from '../data/IntervalCards'
import { noteNames } from '../data/NoteCards'

const size = 100

const HexKeyWithCards = ({ musicKey }) => {
  const [data, setData] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])

  const [root, setRoot] = useState(noteNames.find((x) => x.name === musicKey))

  function clickHandler(inpt) {
    setData((prev) => {
      const newData = [...prev]

      newData[inpt] = !newData[inpt]

      return newData
    })
  }

  function returnCorrectNoteCard(chosenRoot = musicKey) {
    let rootIdx = noteNames.findIndex((x) => x.name === chosenRoot)

    let source = ''
    let length = noteNames.length

    let count = 0
    let dataSlice = data.slice(1)

    if (data[0] === true) {
    } else {
      let result = dataSlice.map((x, idx) => {
        if (idx != 2 && idx != 6) {
          count = count + 2
          let finalIdx = 0
          finalIdx = count + rootIdx > length ? count - length : count
          finalIdx = finalIdx + rootIdx

          finalIdx = data[idx + 1] ? finalIdx - 1 : finalIdx

          source = noteNames[finalIdx]
        } else {
          count = count + 1
          let finalIdx = 0
          finalIdx = count + rootIdx > length ? count - length : count
          finalIdx = finalIdx + rootIdx
          finalIdx = data[idx + 1] ? finalIdx + 1 : finalIdx
          source = noteNames[finalIdx]
        }

        return (
          <Image
            source={source.imgSrc}
            style={{
              width: 100,
              height: 150,
            }}
          />
        )
      })

      return result
    }
  }

  function returnCorrectIntervalCard() {
    let skippedArr = data.slice(1)

    if (data[0] === true) {
    } else {
      let count = 1

      let result = skippedArr.map((x, idx) => {
        let source = cardsArray[0]
        if (count < 4 || idx === 5) {
          count === 3
            ? (source =
                x === true
                  ? cardsArray[idx + count + 1]
                  : cardsArray[idx + count])
            : (source =
                x === true
                  ? cardsArray[idx + count]
                  : cardsArray[idx + count + 1])
        } else {
          source =
            x === true ? cardsArray[idx + count - 1] : cardsArray[idx + count]
        }
        count > 4 ? '' : count++

        return (
          <Image
            source={source.imgSrc}
            style={{
              width: 100,
              height: 150,
            }}
          />
        )
      })
      return result
    }
  }

  return (
    <>
      <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <View style={styles.hexContainer}>
          <View style={styles.outColumn}>
            <CircleHex
              idx={5}
              data={data[5]}
              name={'6'}
              clickHandler={clickHandler}
              size={size}
            />

            <CircleHex
              idx={4}
              data={data[4]}
              name={'5'}
              clickHandler={clickHandler}
              size={size}
            />
          </View>
          <View style={styles.column}>
            <CircleHex
              idx={6}
              data={data[6]}
              name={'7'}
              clickHandler={clickHandler}
              size={size}
            />
            <CircleHex
              idx={0}
              data={data[0]}
              name={'Root'}
              clickHandler={clickHandler}
              size={size}
            />
            <CircleHex
              idx={3}
              data={data[3]}
              name={'4'}
              clickHandler={clickHandler}
              size={size}
            />
          </View>

          <View style={styles.outColumn}>
            <CircleHex
              idx={1}
              data={data[1]}
              name={'2'}
              clickHandler={clickHandler}
              size={size}
            />
            <CircleHex
              idx={2}
              data={data[2]}
              name={'3'}
              clickHandler={clickHandler}
              size={size}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {/* {cardsArray.map((x) => {
            return (
              <Image source={x.imgSrc} style={{ width: 100, height: 150 }} />
            )
          })} */}
          <Image
            source={cardsArray[0].imgSrc}
            style={{ width: 100, height: 150 }}
          />
          {returnCorrectIntervalCard()}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image source={root?.imgSrc} style={{ width: 100, height: 150 }} />
          {returnCorrectNoteCard()}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  hexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: { padding: 0, alignItems: 'center' },
  outColumn: { padding: 0, alignItems: 'center', marginVertical: size * 0.5 },
})

export default HexKeyWithCards
