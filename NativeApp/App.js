import React, { useState } from 'react'
import QuestionHolder from './QuestionHolder'
import { StatusBar } from 'expo-status-bar'
import { View, useWindowDimensions } from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [start, setStart] = useState(false)

  const { width, height } = useWindowDimensions()

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
          maxHeight: height,
          maxWidth: width,
          borderWidth: 15,
          borderColor: 'black',
    
          marginTop: 34,
          padding: 0,
          backgroundColor: bgColor,
          flexDirection: 'column',
        }}
      >
        <QuestionHolder />
      </View>
    </>
  )
}

const bgColor = '#194f0c'
