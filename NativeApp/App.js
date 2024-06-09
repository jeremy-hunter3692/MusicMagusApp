import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'
import Question from './Question'
import HexKeyTutorial from './HexKeyTutorial.js'
import HexKeyWithCards from './HexKeyWithCards.js'
import HexKey from './HexKeyCiclesDisplay'

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [start, setStart] = useState(false)

  const windowSize = useWindowDimensions()
  const { height, width, scale, fontScale } = useWindowDimensions()

  function getKey(musicKey) {
    setHexKey(musicKey)
  }

  function appLevel(inpt) {
    console.log('TODO-App level', inpt)
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          margin: 0,
          padding: 0,
          backgroundColor: bgColor,
          flexDirection: 'column',
        }}
      >
        <Question windowSize={windowSize} />
      </View>
    </>
  )
}

const bgColor = '#405d27'
