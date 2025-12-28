import React, { useEffect, useRef } from 'react'
import { Audio } from 'expo-av'
import { useGameContext } from './GameContext'

const DronePlayer = () => {
  const { droneAudioSrc, dronePlaying } = useGameContext()
  const srcRef = useRef(null) //
  const soundRef1 = useRef(null)
  const soundRef2 = useRef(null)
  const playingRef = useRef(false)
  const secondTimeoutRef = useRef(null)
  const requestIdRef = useRef(0)
  console.log('droneAudioSrc', droneAudioSrc, 'dronePlaying', dronePlaying)
  useEffect(() => {
    // When either source or playing flag changes, decide what to do
    const rootValue = droneAudioSrc
    const effectRequestId = ++requestIdRef.current
    const stopAndCleanup = async () => {
      // ...inside stopAndCleanup and fadeOutAndUnload...
      // console.log(
      //   'stopAndCleanup requestId',
      //   requestIdRef.current,
      //   'sounds:',
      //   sounds.length
      // )
      // cancel scheduled second-play
      if (secondTimeoutRef.current) {
        clearTimeout(secondTimeoutRef.current)
        secondTimeoutRef.current = null
      }

      // start fades/unloads but do NOT await the per-step fades (fire-and-forget)
      // this avoids blocking the JS thread while doing small awaited volume changes
      const sounds = [soundRef1.current, soundRef2.current].filter(Boolean)
      const fadePromises = sounds.map((s) => fadeOutAndUnload(s)) // returns a promise that resolves when fully unloaded
      // don't await here — allow cleanup to proceed immediately; keep promises running in background
      Promise.allSettled(fadePromises).catch(() => {})

      // clear refs immediately so reloading can proceed without waiting for background cleanup
      soundRef1.current = null
      soundRef2.current = null
      srcRef.current = null
      playingRef.current = false
    }

    const loadAndPlay = async (src, myId) => {
      try {
        const initialStatus = { volume: 0.5, isLooping: true }

        // create first sound
        const { sound: s1, status: status1 } = await Audio.Sound.createAsync(
          src,
          initialStatus
        )
        // bail out if a newer request started
        if (requestIdRef.current !== myId) {
          await s1.unloadAsync().catch(() => {})
          return
        }

        // create second sound
        const { sound: s2 } = await Audio.Sound.createAsync(src, initialStatus)
        if (requestIdRef.current !== myId) {
          await s1.unloadAsync().catch(() => {})
          await s2.unloadAsync().catch(() => {})
          return
        }

        soundRef1.current = s1
        soundRef2.current = s2
        srcRef.current = src

        // play first if loaded
        const loaded1 = (await s1.getStatusAsync()).isLoaded
        if (loaded1) {
          await s1.playAsync().catch(() => {})
        }

        // compute delay (half duration) if available
        const duration =
          status1.durationMillis ||
          (await s1.getStatusAsync()).durationMillis ||
          0
        const delay = duration ? Math.max(0, Math.floor(duration * 0.5)) : 0

        // clear any previous timeout
        if (secondTimeoutRef.current) {
          clearTimeout(secondTimeoutRef.current)
          secondTimeoutRef.current = null
        }

        // schedule second sound start; guard with myId to avoid stale play
        secondTimeoutRef.current = setTimeout(async () => {
          if (requestIdRef.current !== myId) return
          try {
            const st = await s2.getStatusAsync()
            if (st.isLoaded) {
              await s2.playAsync().catch(() => {})
            }
          } catch (e) {
            /* ignore errors starting second */
          }
        }, delay)

        playingRef.current = true
      } catch (error) {
        console.warn('DronePlayer loadAndPlay error', error)
        await stopAndCleanup()
      }
    }
    // Decide what to do based on props/context

    if (dronePlaying) {
      if (!droneAudioSrc) {
        // nothing to play
      } else if (srcRef.current !== droneAudioSrc) {
        // new source: stop existing then load new
        const myId = ++requestIdRef.current
        stopAndCleanup()
          .then(() => loadAndPlay(droneAudioSrc, myId))
          .catch(() => loadAndPlay(droneAudioSrc, myId))
      } else {
        // same source: if not playing, try to resume existing sounds
        if (!playingRef.current) {
          ;(async () => {
            try {
              if (soundRef1.current)
                await soundRef1.current.playAsync().catch(() => {})
              if (soundRef2.current) {
                if (!secondTimeoutRef.current) {
                  await soundRef2.current.playAsync().catch(() => {})
                }
              }
              playingRef.current = true
            } catch (e) {
              // fallback: reload fresh
              const myId = ++requestIdRef.current
              stopAndCleanup()
                .then(() => loadAndPlay(droneAudioSrc, myId))
                .catch(() => {})
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
      // ensure we attempt cleanup; cannot await here
      stopAndCleanup().catch(() => {})
      if (secondTimeoutRef.current) {
        clearTimeout(secondTimeoutRef.current)
        secondTimeoutRef.current = null
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droneAudioSrc, dronePlaying])

  // helper to fade out then unload a sound
  // Non-blocking fade + unload implementation.
  // Uses setInterval and calls setVolumeAsync without awaiting each call (reduces synchronous work).
  const fadeOutAndUnload = async (soundObj, duration = 300) => {
    if (!soundObj) return
    try {
      const status = await soundObj.getStatusAsync().catch(() => ({}))
      if (status && status.isLoaded) {
        await soundObj.stopAsync().catch(() => {})
      }
      await soundObj.unloadAsync().catch(() => {})
    } catch (e) {
      try {
        await soundObj.unloadAsync().catch(() => {})
      } catch (_) {}
    }
    // if (!soundObj) return Promise.resolve()

    // return new Promise((resolve) => {
    //   // get status; if not loaded just unload and resolve
    //   soundObj
    //     .getStatusAsync()
    //     .then((status) => {
    //       if (!status || !status.isLoaded) {
    //         soundObj.unloadAsync().catch(() => {})
    //         resolve()
    //         return
    //       }

    //       // reduce steps and avoid very small intervals (fewer async operations)
    //       const steps = 100 // fewer steps -> less JS work
    //       const stepDuration = Math.max(20, Math.floor(duration / steps))
    //       const initialVolume =
    //         typeof status.volume === 'number' ? status.volume : 0.7
    //       let stepIndex = 0

    //       const timer = setInterval(() => {
    //         stepIndex += 1
    //         // compute next volume (linear fade)
    //         const nextVol = Math.max(0, initialVolume * (1 - stepIndex / steps))

    //         // don't await setVolumeAsync to avoid blocking; best-effort
    //         soundObj.setVolumeAsync(nextVol).catch(() => {})

    //         if (stepIndex >= steps) {
    //           clearInterval(timer)
    //           // stop and unload once the fade is finished; await these since they're one-off ops
    //           soundObj
    //             .stopAsync()
    //             .catch(() => {})
    //             .then(() => soundObj.unloadAsync().catch(() => {}))
    //             .finally(() => {
    //               resolve()
    //             })
    //         }
    //       }, stepDuration)
    //     })
    //     .catch(() => {
    //       // couldn't get status — try unloading to be safe
    //       soundObj.unloadAsync().catch(() => {})
    //       resolve()
    //     })
    // })
  }

  return null
}

export default DronePlayer

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
