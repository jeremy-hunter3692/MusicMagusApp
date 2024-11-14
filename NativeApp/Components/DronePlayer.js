import React, { useEffect, useRef, useState } from 'react'
import { Audio } from 'expo-av'
import { Pressable, Text } from 'react-native'
import { DoubleBassDrones } from '../data/DroneAudioSources'
let soundObj = null
let fadeTimeout = null

//look up graphs for fading logic
//
const fade = (initVolume, toVolume, duration = 10) =>
  new Promise((resolve, reject) => {
    if (initVolume === toVolume) return resolve()

    if (fadeTimeout) {
      clearTimeout(fadeTimeout)
    }

    const steps = 100 // Number of steps for the fade transition
    const stepDuration = duration / steps
    const start = Math.floor(initVolume * 10)
    const end = Math.floor(toVolume * 10)
    const volumeStep = (end - start) / steps
    let currVolume = start

    const loop = async () => {
      if (Math.round(currVolume) !== end || Math.round(currVolume) < 0.1 ) {
  
        currVolume += volumeStep
        let volumeStatus = currVolume / 10
        console.log(volumeStatus)
        await soundObj.setVolumeAsync(volumeStatus)

        fadeTimeout = setTimeout(loop, stepDuration)
      } else {
        console.log('else')
        await soundObj.setVolumeAsync(toVolume)
        clearTimeout(fadeTimeout)
        fadeTimeout = null
        resolve()
      }
    }

    fadeTimeout = setTimeout(loop, stepDuration)
  })

async function getCurrentVolume(soundObj) {
  try {
    const status = await soundObj.getStatusAsync()
    return status.volume // Returns a value between 0.0 and 1.0
  } catch (error) {
    console.error('Error getting volume:', error)
    return null
  }
}

// // Usage:
// const setVolume = (volume) => {
//   console.log("Setting volume to:", volume)
//   // Actual volume-setting logic here
// }
// const fade = createFader(0.5, setVolume) // 0.5 is the initial volume

// fade(1).then(() => console.log("Fade complete"))

const DronePlayer = ({ rootValueProp, dronePlaying }) => {
  const rootValue = DoubleBassDrones[1].audioSrc // rootValueProp
  console.log(rootValue)
  // const [currentDrone, setCurrentDrone] = useState()

  const loadAndPlayDrone = async () => {
    if (rootValue) {
      soundObj = await loadSound(rootValue)
      await soundObj.playAsync()
    }
  }

  const loadSound = async (rootValue) => {
    let returnSoundObj
    try {
      const initialStatus = {
        volume: 1,
        isLooping: true,
      }
      const { sound } = await Audio.Sound.createAsync(rootValue, initialStatus)
      returnSoundObj = sound
      // setCurrentDrone(sound)
      console.log('set current drone', rootValue, soundObj)
    } catch (error) {
      console.log('Error loading sound:', error)
    }
    return returnSoundObj
  }

  const stopDrone = async () => {
    let currentVol = await getCurrentVolume(soundObj)
    console.log({ currentVol })
    await fade(currentVol, 0)
    // await soundObj.pauseAsync()
    await soundObj.stopAsync()
    // await currentDrone.unloadAsync()
  }

  return (
    <>
      <Pressable onPress={() => loadAndPlayDrone()}>
        <Text>Start</Text>
      </Pressable>
      <Pressable onPress={() => stopDrone()}>
        <Text>Stop</Text>
      </Pressable>
    </>
  )
}

export default DronePlayer
