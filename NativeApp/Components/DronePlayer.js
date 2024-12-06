import React, { useEffect, useRef, useState } from 'react'
import { Audio } from 'expo-av'
import { Pressable, Text } from 'react-native'
import { DoubleBassDrones } from '../data/DroneAudioSources'
let soundObj = null
let fadeTimeout = null

//look up graphs for fading logic and if that's related to the crackling
//gpt fade func
const fade = (initVolume, toVolume, duration) =>
  new Promise((resolve, reject) => {
    if (initVolume === toVolume) return resolve()

    if (fadeTimeout) {
      clearTimeout(fadeTimeout)
    }

    const steps = 100 // Increase number of steps for smoother transition
    const stepDuration = duration / steps
    const volumeStep = (toVolume - initVolume) / steps

    let currVolume = initVolume

    const loop = async () => {
      currVolume = Math.max(0, Math.min(1, currVolume + volumeStep)) // Clamp between 0 and 1
      await soundObj.setVolumeAsync(currVolume)
      // Check if the volume is close enough to the target
      if (Math.abs(currVolume - toVolume) < 0.01) {
        await soundObj.setVolumeAsync(toVolume) // Ensure final target volume is set
        clearTimeout(fadeTimeout)
        fadeTimeout = null
        resolve()
      } else {
        fadeTimeout = setTimeout(loop, stepDuration)
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

const DronePlayer = ({ rootValueProp, dronePlaying }) => {
  const rootValue = DoubleBassDrones[1].audioSrc // rootValueProp
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
        volume: 0.7,
        isLooping: true,
      }
      const { sound } = await Audio.Sound.createAsync(rootValue, initialStatus)
      returnSoundObj = sound
      // setCurrentDrone(sound)
      // console.log('set current drone', rootValue, soundObj)
    } catch (error) {
      console.log('Error loading sound:', error)
    }
    return returnSoundObj
  }

  const stopDrone = async () => {
    let currentVol = await getCurrentVolume(soundObj)
    await fade(currentVol, 0, 1)
    // await soundObj.pauseAsync()
    await soundObj.stopAsync()
    await currentDrone.unloadAsync()
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
