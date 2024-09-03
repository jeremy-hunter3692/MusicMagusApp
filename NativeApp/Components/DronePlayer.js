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
    const { sound } = source
      ? await Audio.Sound.createAsync(source, initalStatus)
      : ''
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
  // console.log(dronePlaying, '-drone playing')
  useEffect(() => {
    async function loadSoundObjs() {
      rootOne = await playNoteForLooping(rootValue)
      rootTwo = await playNoteForLooping(rootValue)
    }

    async function startUp() {
      await loadSoundObjs()
      startDrone()
    }

    dronePlaying ? startUp() : stopDrone()

    return () => {
      // console.log('use return')
      stopDrone()
    }
  }, [dronePlaying, rootValue])

  const startDrone = async () => {
    if (rootOne) {
      // console.log('if root sound 1')
      await rootOne.playAsync()
    }
    if (rootTwo) {
      timeoutId = setTimeout(async () => {
        await rootTwo.playAsync()
        // console.log('in timeout')
      }, 3000)
    }
  }

  const stopDrone = async () => {
    if (rootOne) {
      // await fade(rootOne, bassDroneVolume, 0)
      // await rootOne.pauseAsync()
      await rootOne.stopAsync()
      await rootOne.unloadAsync()
    }
    if (rootTwo) {
      // await fade(rootTwo, bassDroneVolume, 0)
      // await rootTwo.pauseAsync()
      await rootTwo.stopAsync()
      await rootTwo.unloadAsync()
    }
    clearTimeout(timeoutId)
  }

  return null
}

const fade = (sound, fromVolume, toVolume) => {
  const fadeDuration = 150
  return new Promise((resolve, reject) => {
    console.log({ fromVolume })
    let isFading = true
    let fadeTimeout = null

    if (fadeTimeout) {
      clearTimeout(fadeTimeout)
    }

    const start = Math.floor(fromVolume * 10)
    const end = toVolume * 10
    let currVolume = start

    const loop = async () => {
      let count = 0
      if (currVolume !== end) {
        start < end ? currVolume++ : currVolume--
        count++
        // console.log(currVolume, 'count:', count)
        await sound.setVolumeAsync(currVolume / 10)
        fadeTimeout = setTimeout(loop, fadeDuration / 10)
      } else {
        clearTimeout(fadeTimeout)
        fadeTimeout = null
        isFading = false
        if (currVolume === 0) {
          // await sound.stopAsync()
        }
        // console.log('Done fading')
        resolve(true)
      }
    }

    fadeTimeout = setTimeout(loop, 10)
  })
}
export default DronePlayer
