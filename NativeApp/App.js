import React, { useState } from 'react'
import QuestionHolder from './QuestionHolder'
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
          margin: 10,
          padding: 0,
          backgroundColor: bgColor,
          flexDirection: 'column',
        }}
      >
        {/* <Question windowSize={windowSize} /> */}
        <QuestionHolder windowSize={windowSize} />
      </View>
    </>
  )
}

const bgColor = '#196f0c'
