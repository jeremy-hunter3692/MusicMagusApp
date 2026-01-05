import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'

const bgcolor = 'white'
const size = 100

const stylesArr = ['white', 'blue', 'red']

const HexKeyWithCards = ({ musicKey }) => {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0])
  const [circleColor, setCircleColor] = useState(
    data.map((x) => styleReturn(x))
  )

  function styleReturn(inpt) {
    let color = stylesArr[inpt]
    return {
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      margin: size * 0.1,
      padding: 0,
      border: 'solid',
      borderColor: 'black',
      borderRadius: size * 0.5, // Half of the width and height to make it a perfect circle
      background: color,
    }
  }

  function clickHander(inpt) {
    setData((prev) => {
      const newData = [...prev]
      newData[inpt] = newData[inpt] === 2 ? 0 : newData[inpt] + 1
      setCircleColor(newData.map((x) => styleReturn(x)))
      return newData
    })
  }

  return (
    <>
      <View style={styles.hexContainer}>
        <View style={styles.outColumn}>
          <Pressable onPress={() => clickHander(5)} data={data[5]}>
            <View style={circleColor[5]}>
              <Text>6</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => clickHander(4)} data={data[4]}>
            <View style={circleColor[4]}>
              <Text>5</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.column}>
          <Pressable onPress={() => clickHander(6)} data={data[6]}>
            <View style={circleColor[6]}>
              <Text>7</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => clickHander(0)} data={data[0]}>
            <View style={circleColor[0]}>
              <Text>Root</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => clickHander(3)} data={data[3]}>
            <View style={circleColor[3]}>
              <Text>4</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.outColumn}>
          <Pressable onPress={() => clickHander(1)} data={data[1]}>
            <View style={circleColor[1]}>
              <Text>2</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => clickHander(2)} data={data[2]}>
            <View style={circleColor[2]}>
              <Text>3</Text>
            </View>
          </Pressable>
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
  //going to need to change margin and probably other stuff as a variable to keep hex intact
  circleFull: {
    width: size,
    height: size,
    margin: 0,
    padding: 0,
    borderRadius: size * 0.5, // Half of the width and height to make it a perfect circle
    backgroundColor: 'black',
  },
})

export default HexKeyWithCards
