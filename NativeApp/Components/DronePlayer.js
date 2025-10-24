// import React, { useEffect, useRef } from 'react'
// import { Text, Pressable } from 'react-native'
// import { Audio } from 'expo-av'
// import { DoubleBassDrones } from '../data/DroneAudioSources'
// import { useGameContext } from './GameContext'

// let drone = null // Declare it outside of the component
// let droneTwo = null // Declare it outside of the component

// const DronePlayer = () => {
//   const { droneAudioSrc, dronePlaying } = useGameContext()
//   const rootValue = droneAudioSrc || null

//   useEffect(() => {
//     if (dronePlaying) {
//       // Stop any existing drones before starting new ones
//       if (drone) stopDrone(drone)
//       if (droneTwo) stopDrone(droneTwo)

//       // Load and play drones if dronePlaying is true
//       if (dronePlaying) {
//         loadAndPlayDrone()
//       }
//     }

//     // Cleanup function to stop and unload drones
//     return () => {
//       if (drone) stopDrone(drone)
//       if (droneTwo) stopDrone(droneTwo)
//     }
//   }, [rootValue, dronePlaying])

//   const loadAndPlayDrone = async () => {
//     if (rootValue) {
//       drone = await loadSound(rootValue) // Store the sound object globally
//       droneTwo = await loadSound(rootValue)

//       const statusDOne = await drone.getStatusAsync()
//       statusDOne.isLoaded
//         ? await drone.playAsync()
//         : console.log('Drone sound not loaded')
//       let timeDelay = statusDOne.durationMillis * 0.5
//       let secondDroneID = setTimeout(async () => {
//         const statusDTwo = await drone.getStatusAsync()
//         statusDTwo.isLoaded
//           ? await droneTwo.playAsync()
//           : console.log('Drone sound not loaded')
//       }, timeDelay)
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
//     } catch (error) {
//       console.log('Error loading sound:', error)
//     }
//     return returnSoundObj
//   }

//   const fadeOutAndStop = async (soundObj, duration = 300) => {
//     if (soundObj) {
//       const status = await soundObj.getStatusAsync()
//       if (!status.isLoaded) return
//       const steps = 30 // Increase the number of steps for smoother fade-out
//       const stepDuration = duration / steps
//       const initialVolume = 0.7 // Assuming initial volume is 0.7
//       const volumeStep = initialVolume / steps

//       for (let i = 0; i < steps; i++) {
//         await soundObj.setVolumeAsync(initialVolume - volumeStep * i)
//         await new Promise((resolve) => setTimeout(resolve, stepDuration))
//       }

//       await soundObj.stopAsync()
//       await soundObj.unloadAsync()
//     }
//   }
//   const stopDrone = async (soundObj) => {
//     if (soundObj) {
//       await fadeOutAndStop(soundObj)
//     } else {
//       console.log('No sound object available')
//     }
//   }

//   return null
// }

// export default DronePlayer

import React, { useEffect, useRef } from 'react'
import { Audio } from 'expo-av'
import { useGameContext } from './GameContext'

const DronePlayer = () => {
  const { droneAudioSrc, dronePlaying } = useGameContext()
  const srcRef = useRef(null) // current source URI/require
  const soundRef1 = useRef(null)
  const soundRef2 = useRef(null)
  const playingRef = useRef(false)
  const secondTimeoutRef = useRef(null)

  useEffect(() => {
    // When either source or playing flag changes, decide what to do
    const rootValue = droneAudioSrc || null

    const stopAndCleanup = async () => {
      // cancel pending second play
      if (secondTimeoutRef.current) {
        clearTimeout(secondTimeoutRef.current)
        secondTimeoutRef.current = null
      }

      // fade out and unload both sounds if present
      await Promise.all([soundRef1.current, soundRef2.current].map(async (s) => {
        if (!s) return
        try {
          await fadeOutAndUnload(s)
        } catch (e) {
          // ignore individual errors during cleanup
        }
      }))

      soundRef1.current = null
      soundRef2.current = null
      srcRef.current = null
      playingRef.current = false
    }

    const loadAndPlay = async (src) => {
      try {
        // create two sound objects
        const initialStatus = { volume: 0.7, isLooping: true }
        const { sound: s1, status: status1 } = await Audio.Sound.createAsync(src, initialStatus)
        const { sound: s2 } = await Audio.Sound.createAsync(src, initialStatus)

        soundRef1.current = s1
        soundRef2.current = s2
        srcRef.current = src

        // play first if loaded
        const loaded1 = (await s1.getStatusAsync()).isLoaded
        if (loaded1) {
          await s1.playAsync()
        }

        // schedule second to start after half the duration (if available)
        const duration = status1.durationMillis || (await s1.getStatusAsync()).durationMillis || 0
        const delay = duration ? Math.max(0, Math.floor(duration * 0.5)) : 0

        // clear any existing timeout
        if (secondTimeoutRef.current) {
          clearTimeout(secondTimeoutRef.current)
          secondTimeoutRef.current = null
        }

        secondTimeoutRef.current = setTimeout(async () => {
          try {
            const st = await s2.getStatusAsync()
            if (st.isLoaded) {
              await s2.playAsync()
            }
          } catch (e) {
            // ignore
          }
        }, delay)

        playingRef.current = true
      } catch (error) {
        console.warn('DronePlayer loadAndPlay error', error)
        // clean partials if failed
        await stopAndCleanup()
      }
    }

    // Decide action:
    if (dronePlaying) {
      // if no source, nothing to play
      if (!rootValue) {
        // nothing to do
        return
      }
      // If source changed, stop old and load new
      if (srcRef.current !== rootValue) {
        // stop previous then load new
        stopAndCleanup().then(() => loadAndPlay(rootValue)).catch(() => loadAndPlay(rootValue))
      } else {
        // same source: if not currently playing, ensure playback
        if (!playingRef.current) {
          // try to resume existing sounds if present
          (async () => {
            try {
              if (soundRef1.current) await soundRef1.current.playAsync()
              if (soundRef2.current) {
                // ensure second scheduled or play immediately
                if (!secondTimeoutRef.current) {
                  await soundRef2.current.playAsync().catch(() => {})
                }
              }
              playingRef.current = true
            } catch (e) {
              // fallback: reload fresh
              stopAndCleanup().then(() => loadAndPlay(rootValue)).catch(() => {})
            }
          })()
        }
      }
    } else {
      // stop playback when flag turned off
      stopAndCleanup().catch(() => {})
    }

    // cleanup on unmount / effect re-run
    return () => {
      // do not await in cleanup synchronously; schedule
      if (secondTimeoutRef.current) {
        clearTimeout(secondTimeoutRef.current)
        secondTimeoutRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droneAudioSrc, dronePlaying])

  // helper to fade out then unload a sound
  const fadeOutAndUnload = async (soundObj, duration = 300) => {
    if (!soundObj) return
    try {
      const status = await soundObj.getStatusAsync()
      if (!status.isLoaded) {
        await soundObj.unloadAsync().catch(() => {})
        return
      }
      const steps = 20
      const stepDuration = Math.max(5, Math.floor(duration / steps))
      const initialVolume = status.volume ?? 0.7
      const volumeStep = initialVolume / steps
      for (let i = 0; i < steps; i++) {
        await soundObj.setVolumeAsync(Math.max(0, initialVolume - volumeStep * i))
        // small delay between volume steps
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => setTimeout(res, stepDuration))
      }
      await soundObj.stopAsync().catch(() => {})
      await soundObj.unloadAsync().catch(() => {})
    } catch (e) {
      // best-effort unload
      try {
        await soundObj.unloadAsync().catch(() => {})
      } catch (_) {}
    }
  }

  return null
}

export default DronePlayer