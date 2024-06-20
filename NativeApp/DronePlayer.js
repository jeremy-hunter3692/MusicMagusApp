import React, { useState, useEffect } from 'react'
import { Audio } from 'expo-av'
const fadeOutSpeed = 1000
const globalvolume = 0.6
const bassDroneVolume = 0.4

const DronePlayer = ({ rootValue, dronePlaying }) => {
  
  const [rootDronePlaying, setRootDronePlaying] = useState({
    id: '',
  })

  console.log('render audio player', dronePlaying)

  useEffect(() => {
    console.log('start', rootValue, dronePlaying)
    dronePlaying ? startDrone(rootValue) : stopDrone()
    setTimeout(() => {
      // answerCardOnPress(answer)
    }, 1000)
  }, [dronePlaying])

  const startDrone = async (note) => {
    const soundOne = await playNoteForLooping(note)
    let soundTwo = null
    let timeoutId = setTimeout(async () => {
      soundTwo = await playNoteForLooping(note)
      setRootDronePlaying((state) => ({ ...state, currentSoundTwo: soundTwo }))
    }, 2900)

    // console.log('start drone', soundOne, soundTwo, timeoutId)

    setRootDronePlaying({
      id: timeoutId,
      currentSound: soundOne,
      currentSoundTwo: soundTwo,
    })
  }

  const playNoteForLooping = async (note) => {
    console.log('note started')
    const source = note
    try {
      const initalStatus = {
        volume: bassDroneVolume,
        isLooping: true,
      }
      const { sound } = await Audio.Sound.createAsync(source, initalStatus)

      await sound.playAsync()

      // sound.setOnPlaybackStatusUpdate((status) => {
      //   if (status.positionMillis > 5999) {
      //     console.log('Sound just finished a loop')
      //   }
      // })
      return sound
    } catch (error) {
      console.log('Error playing sound:', error)
    }
  }

  function stopDrone() {
    if (rootDronePlaying.currentSoundTwo) {
      rootDronePlaying.currentSound.stopAsync()
      rootDronePlaying.currentSoundTwo.stopAsync()
      rootDronePlaying.currentSound.unloadAsync()
      rootDronePlaying.currentSoundTwo.unloadAsync()
    } else {
      rootDronePlaying.currentSound.stopAsync()
      rootDronePlaying.currentSound.unloadAsync()
      clearTimeout(rootDronePlaying.id)
    }
    setRootDronePlaying({
      id: null,
      currentSound: null,
      currentSoundTwo: null,
    })
  }

  return
}

export default DronePlayer
