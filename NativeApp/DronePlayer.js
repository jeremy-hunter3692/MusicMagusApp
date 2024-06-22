import React, { useState, useEffect } from 'react'
import { Audio } from 'expo-av'
const fadeOutSpeed = 1000
const globalvolume = 0.6
const bassDroneVolume = 0.4
//TOO DOO CLEAN UP CONSOLE LOGS
const playNoteForLooping = async (note) => {
  // console.log('4PLAYLOOP')
  const source = note
  try {
    const initalStatus = {
      volume: bassDroneVolume,
      isLooping: true,
    }
    const { sound } = await Audio.Sound.createAsync(source, initalStatus)
    // console.log('pre 4loop resturn', sound)
    return sound
  } catch (error) {
    console.log('Error loding sound:', error)
  }
}
let timeoutId = null
let rootOne = null
let rootTwo = null

const DronePlayer = ({ rootValue, dronePlaying }) => {
  useEffect(() => {
    // console.log('USEstart', rootValue, dronePlaying)
    async function loadSoundObjs() {
      rootOne = await playNoteForLooping(rootValue)
      rootTwo = await playNoteForLooping(rootValue)
    }

    async function startUp() {
      await loadSoundObjs()

      // console.log('async in USe', rootOne, rootTwo)
      startDrone()
    }
    startUp()

    return () => {
      stopDrone()
    }
  }, [dronePlaying])

  const startDrone = async () => {
    if (rootOne) {
      // console.log('if root sound 1')
      await rootOne.playAsync()
    }
    if (rootTwo) {
      console.log('if root sound 2')
      timeoutId = setTimeout(async () => {
        await rootTwo.playAsync()
        // console.log('in timeout')
      }, 3000)
    }
  }

  const stopDrone = async () => {
    if (root) {
      await rootOne.stopAsync()
      await rootOne.unloadAsync()
    }
    if (rootTwo) {
      await rootTwo.stopAsync()
      await rootTwo.unloadAsync()
    }
    clearTimeout(timeoutId)
  }

  return null
}

export default DronePlayer
