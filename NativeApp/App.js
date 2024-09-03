import React, { useState } from 'react'
import QuestionHolder from './Components/QuestionHolder'
import { StatusBar } from 'expo-status-bar'
import { View, useWindowDimensions, SafeAreaView } from 'react-native'
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

  const bgColor = 'purple' //'#060'
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 0,
          maxHeight: height,
          maxWidth: width,
          borderWidth: 1,
          borderColor: 'black',
          // marginTop: 15,
          padding: 0,
          backgroundColor: bgColor,
          flexDirection: 'column',
          shadowColor: 'black',
          // shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 35,
          // Android Elevation
          elevation: 5,
        }}
      >
        <QuestionHolder />
      </SafeAreaView>
    </>
  )
}
