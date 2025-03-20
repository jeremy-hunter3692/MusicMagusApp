import React, { useEffect, useRef } from 'react'
import { Text, Pressable } from 'react-native'
import { Audio } from 'expo-av'
import { DoubleBassDrones } from '../data/DroneAudioSources'

let soundObj = null // Declare it outside of the component

const DronePlayer = ({ rootValue, dronePlaying }) => {
  console.log(rootValue)
  const renderCount = useRef(0)


  useEffect(() => {
    loadAndPlayDrone()
  })

  const loadAndPlayDrone = async () => {
    if (rootValue) {
      soundObj = await loadSound(rootValue) // Store the sound object globally
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
    } catch (error) {
      console.log('Error loading sound:', error)
    }
    return returnSoundObj
  }

  const stopDrone = async () => {
    if (soundObj) {
      console.log(soundObj)
      await soundObj.setIsMutedAsync(true) // Muting the sound
    } else {
      console.log('No sound object available')
    }
  }

  return <></>
}

export default DronePlayer

// import React, { useEffect, useRef, useState } from 'react'
// import { Audio } from 'expo-av'
// import { Pressable, Text } from 'react-native'
// import { DoubleBassDrones } from '../data/DroneAudioSources'
// let soundObj = null
// let fadeTimeout = null

// //look up graphs for fading logic and if that's related to the crackling
// //gpt fade func
// const fade = (initVolume, toVolume, duration) =>
//   new Promise((resolve, reject) => {
//     if (initVolume === toVolume) return resolve()

//     if (fadeTimeout) {
//       clearTimeout(fadeTimeout) // Clear any existing timeout
//     }

//     const steps = 500 // Increase steps for smoother transitions
//     const stepDuration = duration / steps // Step duration in ms
//     const volumeStep = (toVolume - initVolume) / steps

//     let currVolume = initVolume

//     const loop = async () => {
//       // Adjust volume and clamp between 0 and 1
//       currVolume = Math.max(0, Math.min(1, currVolume + volumeStep))
//       console.log(currVolume)
//       await soundObj.setVolumeAsync(currVolume)

//       // Check if volume is close to the target
//       if (Math.abs(currVolume - toVolume) < 0.01) {
//         await soundObj.setVolumeAsync(toVolume) // Ensure exact target volume
//         clearTimeout(fadeTimeout) // Clear the timeout once done
//         fadeTimeout = null
//         resolve()
//       } else {
//         fadeTimeout = setTimeout(loop, stepDuration)
//       }
//     }

//     fadeTimeout = setTimeout(loop, stepDuration)
//   })
// const quickFade = async () => {
//   await soundObj.setVolumeAsync(0.5)
//   await soundObj.setVolumeAsync(0.3)
//   await soundObj.setVolumeAsync(0.1)
//   await soundObj.setVolumeAsync(0)
// }

// async function getCurrentVolume(soundObj) {
//   try {
//     const status = await soundObj.getStatusAsync()
//     return status.volume // Returns a value between 0.0 and 1.0
//   } catch (error) {
//     console.error('Error getting volume:', error)
//     return null
//   }
// }

// const DronePlayer = ({ rootValueProp, dronePlaying }) => {
//   const renderCount = useRef(0)
//   useEffect(() => {
//     renderCount.current += 1
//     console.log(` Drone Component rendered ${renderCount.current} times`)
//   })
//   const rootValue = DoubleBassDrones[1].audioSrc // rootValueProp
//   // const [currentDrone, setCurrentDrone] = useState()

//   const loadAndPlayDrone = async () => {
//     if (rootValue) {
//       soundObj = await loadSound(rootValue)
//       await soundObj.playAsync()
//     }
//   }

//   const loadSound = async (rootValue) => {
//     let returnSoundObj
//     try {
//       const initialStatus = {
//         volume: 0.7,
//         isLooping: true,
//       }
//       const { sound } = await Audio.Sound.createAsync(rootValue, initialStatus)
//       returnSoundObj = sound
//       // setCurrentDrone(sound)
//       // console.log('set current drone', rootValue, soundObj)
//     } catch (error) {
//       console.log('Error loading sound:', error)
//     }
//     return returnSoundObj
//   }

//   const stopDrone = async () => {
//     // let currentVol = await getCurrentVolume(soundObj)
//     console.log(soundObj)
//     await soundObj.setIsMutedAsync(true)

//   }

//   return (
//     <>
//       <Pressable onPress={() => loadAndPlayDrone()}>
//         <Text>Start</Text>
//       </Pressable>
//       <Pressable onPress={() => stopDrone()}>
//         <Text>Stop</Text>
//       </Pressable>
//     </>
//   )
// }

// export default DronePlayer
