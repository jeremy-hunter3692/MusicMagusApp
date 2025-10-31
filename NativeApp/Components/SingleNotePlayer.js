// //GPT/useRef version. Working but no restart on second click - have to wait till sound ended
// import React, { useState, useEffect, useRef } from 'react'
// import { Audio } from 'expo-av'

// const SingleNotePlayer = ({ audioSrc, shouldPlayBool }) => {
//   //this will/should recieve an audioSrc source not a card or anything that needs destructuring
//   // console.log('player', { audioSrc, shouldPlayBool })

//   const isPlayingRef = useRef(false)
//   const soundObjectRef = useRef(null)

//   useEffect(() => {
//     shouldPlayBool ? playNote() : null
//     return () => {
//       if (soundObjectRef.current) {
//         console.log('Cleaning if', soundObjectRef.current)
//         soundObjectRef.current.unloadAsync().catch((error) => {
//           console.error('Failed to unload sound:', error)
//         })
//       }
//     }
//   }, [shouldPlayBool, audioSrc])

//   const playNote = async () => {
//     if (!audioSrc || isPlayingRef.current) return
//     isPlayingRef.current = true
//     // If thre's already a sound playing, unload it first
//     if (note) {
//       try {
//         await note.unloadAsync()
//       } catch (error) {
//         console.error('Failed to unload sound:', error)
//       }
//       setNote(null)
//     }
//     const initialStatus = {
//       volume: 0.5,
//       isLooping: false,
//     }
//     try {
//       const { sound } = await Audio.Sound.createAsync(audioSrc, initialStatus)
//       setNote(sound)
//       await sound.playAsync()
//       sound.setOnPlaybackStatusUpdate(async (status) => {
//         if (status.didJustFinish) {
//           try {
//             await sound.unloadAsync()
//           } catch (error) {
//             console.error('Failed to unload sound after playback:', error)
//           }
//           setNote(null)
//           isPlayingRef.current = false
//         }
//       })
//     } catch (error) {
//       console.error('Error playing sound:', error)
//       isPlayingRef.current = false // Reset flag in case of error
//     }
//   }

//   return null
// }

// export default SingleNotePlayer
import React, { useEffect, useRef } from 'react'
import { Audio } from 'expo-av'

const soundCache = new Map()

const SingleNotePlayer = ({ audioSrc, shouldPlayBool }) => {
  const soundRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const loadAndPlay = async () => {
      if (!audioSrc) return

      // Check cache
      let sound = soundCache.get(audioSrc)
      if (!sound) {
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(audioSrc, {
            volume: 0,
            isLooping: false,
          })
          soundCache.set(audioSrc, newSound)
          sound = newSound
        } catch (error) {
          console.error('Failed to load sound:', error)
          return
        }
      }
      soundRef.current = sound

      if (shouldPlayBool) {
        try {
          await sound.setPositionAsync(0)
          await sound.playAsync()
          sound.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish) {
              await sound.setPositionAsync(0)
            }
          })
        } catch (error) {
          console.error('Error playing sound:', error)
        }
      }
    }

    loadAndPlay()

    return () => {
      // Optionally, you can unload sounds here if you want to free memory,
      // but if you want to cache for reuse, do not unload here.
      // If you want to clear the cache on app exit, do it in a higher-level component.
    }
  }, [audioSrc, shouldPlayBool])

  return null
}

export default SingleNotePlayer
