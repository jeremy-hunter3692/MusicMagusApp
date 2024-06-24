//GPT/useRef version. Working but no restart on second click - have to wait till sound ended
import React, { useState, useEffect, useRef } from 'react'
import { Audio } from 'expo-av'

const PlaySound = ({ inpt, playBool }) => {
  const [note, setNote] = useState(inpt)
  const isPlayingRef = useRef(false)

  console.log('note player', inpt, playBool)
  useEffect(() => {
    return note
      ? () => {
          note.unloadAsync()
        }
      : undefined
  }, [note])

  useEffect(() => {
    playNote()
  }, [playBool, inpt])

  const playNote = async () => {
    console.log('play note', note)
    if (!inpt || isPlayingRef.current) return

    isPlayingRef.current = true

    // If there's already a sound playing, unload it first
    if (note) {
      await note.unloadAsync()
      setNote(null)
    }

    const initialStatus = {
      volume: 0.5,
      isLooping: false,
    }

    try {
      const { sound } = await Audio.Sound.createAsync(inpt, initialStatus)
      setNote(sound)
      await sound.playAsync()

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync()
          setNote(null)
          isPlayingRef.current = false // Reset flag after unloading
        }
      })
    } catch (error) {
      console.error('Error playing sound:', error)
      isPlayingRef.current = false // Reset flag in case of error
    }
  }

  return null
}

export default PlaySound

//////////Original version creates click on note restart- could be fixed with a fade out before unload?
// import React, { useState, useEffect } from 'react'
// import { Audio } from 'expo-av'
// const fadeOutSpeed = 1000
// const globalvolume = 0.6
// const bassDroneVolume = 0.4

// const PlaySound = ({ inpt, playBool }) => {
//   const [note, setNote] = useState(null)
//   console.log('reloaded', inpt, note)
//   useEffect(() => {
//     return note
//       ? () => {
//           note.unloadAsync()
//         }
//       : undefined
//   }, [note])

//   useEffect(() => {
//     playNote(inpt)
//   }, [playBool, inpt])

//   const playNote = async (inpt) => {
//     if (!inpt) return
//     const initalStatus = {
//       volume: 0.5,
//       isLooping: false,
//     }
//     const { sound } = await Audio.Sound.createAsync(inpt, initalStatus)
//     setNote(sound)
//     await sound.playAsync()
//     sound.setOnPlaybackStatusUpdate(async (status) => {
//       if (status.didJustFinish) {
//         await sound.unloadAsync()
//         setNote(null) // Clear the note from state after unloading
//       }
//     })
//   }
// }

// export default PlaySound
