//GPT/useRef version. Working but no restart on second click - have to wait till sound ended
import React, { useState, useEffect, useRef } from 'react'
import { Audio } from 'expo-av'

const SingleNotePlayer = ({ audioSrc, shouldPlayBool }) => {
  //this will/should recieve an audioSrc source not a card or anything that needs destructuring
  // console.log('player', { audioSrc, shouldPlayBool })
  const [note, setNote] = useState()
  const isPlayingRef = useRef(false)

  useEffect(() => {
    return note
      ? () => {
          note.unloadAsync()
        }
      : undefined
  }, [note])

  useEffect(() => {
    playNote()
  }, [shouldPlayBool, audioSrc])

  const playNote = async () => {
    if (!audioSrc || isPlayingRef.current) return
    isPlayingRef.current = true
    // If thre's already a sound playing, unload it first
    if (note) {
      await note.unloadAsync()
      setNote(null)
    }
    const initialStatus = {
      volume: 0.5,
      isLooping: false,
    }
    try {
      const { sound } = await Audio.Sound.createAsync(audioSrc, initialStatus)
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

export default SingleNotePlayer
