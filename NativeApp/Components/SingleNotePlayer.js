import React, { useEffect } from 'react'
import { playSound } from './AudioManager'

const SingleNotePlayer = ({ audioSrc, shouldPlay, mute }) => {


  useEffect(() => {
 
    if (audioSrc && !mute) {
    
      playSound(audioSrc).catch(() => {})
    }
  }, [audioSrc, shouldPlay])

  return null
}

export default SingleNotePlayer
