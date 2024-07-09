import React, { useState } from 'react'
import QuestionHolder from './QuestionHolder'
import { StatusBar } from 'expo-status-bar'
import { View, useWindowDimensions } from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'

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
          borderWidth: 15,
          borderColor: 'black',
          borderRadius: 10,
          margin:0,
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

const bgColor = '#194f0c'
