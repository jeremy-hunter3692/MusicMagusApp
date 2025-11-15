import React, { useEffect } from 'react'
import { playSound } from './AudioManager'

const SingleNotePlayer = ({ audioSrc, shouldPlay }) => {
  useEffect(() => {
    console.log('use')
    if (audioSrc) {
      console.log('if', audioSrc, shouldPlay)
      playSound(audioSrc).catch(() => {})
    }
  }, [audioSrc, shouldPlay])

  return null
}

export default SingleNotePlayer
