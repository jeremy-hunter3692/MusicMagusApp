import React, { useEffect, useRef } from 'react'
import { Text, Pressable } from 'react-native'
import { Audio } from 'expo-av'
import { DoubleBassDrones } from '../data/DroneAudioSources'
import { useGameContext } from './GameContext'

let drone = null // Declare it outside of the component
let droneTwo = null // Declare it outside of the component

const DronePlayer = () => {
  const { droneAudioSrc, dronePlaying } = useGameContext()
  const rootValue = droneAudioSrc || null
  
  useEffect(() => {
    // Stop any existing drones before starting new ones
    if (drone) stopDrone(drone)
    if (droneTwo) stopDrone(droneTwo)

    // Load and play drones if dronePlaying is true
    if (dronePlaying) {
      loadAndPlayDrone()
    }

    // Cleanup function to stop and unload drones
    return () => {
      if (drone) stopDrone(drone)
      if (droneTwo) stopDrone(droneTwo)
    }
  }, [rootValue, dronePlaying])

  const loadAndPlayDrone = async () => {
    if (rootValue) {
      drone = await loadSound(rootValue) // Store the sound object globally
      droneTwo = await loadSound(rootValue)
      await drone.playAsync()
      const status = await drone.getStatusAsync()
      let timeDelay = status.durationMillis * 0.5
      let secondDroneID = setTimeout(async () => {
        await droneTwo.playAsync()
      }, timeDelay)
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
    } catch (error) {
      console.log('Error loading sound:', error)
    }
    return returnSoundObj
  }

  const fadeOutAndStop = async (soundObj, duration = 300) => {
    if (soundObj) {
      const steps = 30 // Increase the number of steps for smoother fade-out
      const stepDuration = duration / steps
      const initialVolume = 0.7 // Assuming initial volume is 0.7
      const volumeStep = initialVolume / steps

      for (let i = 0; i < steps; i++) {
        await soundObj.setVolumeAsync(initialVolume - volumeStep * i)
        await new Promise((resolve) => setTimeout(resolve, stepDuration))
      }

      await soundObj.stopAsync()
      await soundObj.unloadAsync()
    }
  }
  const stopDrone = async (soundObj) => {
    if (soundObj) {
      await fadeOutAndStop(soundObj)
    } else {
      console.log('No sound object available')
    }
  }

  return null
}

export default DronePlayer
