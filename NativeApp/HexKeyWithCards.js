import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import CircleHex from './CircleHex'

const size = 100

const stylesArr = ['white', 'blue', 'red']
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

  function clickHandler(inpt) {
    setData((prev) => {
      const newData = [...prev]

      newData[inpt] = !newData[inpt]

      return newData
    })
  }

  return (
    <>
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
            name={'2'}
            clickHandler={clickHandler}
            size={size}
          />
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
