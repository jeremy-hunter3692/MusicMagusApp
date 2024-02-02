import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Image, Button } from 'react-native'
import { Audio } from 'expo-av'

const fadeOutSpeed = 50000
const timeDelay = 4000
const Drones = ({ note }) => {
  const [currentPlayingDrone, setCurrentPlayingDrone] = useState()

  const playSound = async () => {
    let thing = await startSound()
    // console.log('thing', thing)
    fadeOut(thing)
    setTimeout(() => startSound(), timeDelay - timeDelay / 4)
  }

  function fadeOut(audioSound) {
    return new Promise((resolve) =>
      setTimeout(async () => {
        console.log('fade')
        setVolume(1, audioSound)
        resolve()
      }, timeDelay)
    )
  }

  const startSound = async () => {
    console.log('start')
    const source = note.value.audioSrc
    const status = { volume: 1 }

    try {
      const { sound } = await Audio.Sound.createAsync(source, status)
      // setSound(sound)
      await sound.playAsync()
      return sound
    } catch (error) {
      console.log('Error playing sound:', error)
    }
  }

  function fauxVol() {
    sound ? setVolume(1, 10000) : console.log('no sound')
  }

  async function setVolume(volume, sound) {
    // console.log('setVol/fade', sound)
    const steps = fadeOutSpeed
    for (let i = 0; i < steps; i++) {
      const rate = volume / steps
      const newVolume = volume - rate * i
      await sound.setVolumeAsync(newVolume)
    }
  }

  const stopSound = async () => {
    await sound.stopAsync()
  }

  useEffect(() => {
    return currentPlayingDrone
      ? () => currentPlayingDrone.unloadAsync()
      : undefined
  }, [currentPlayingDrone])

  return (
    <View>
      <Button title="Play Drone" onPress={playSound} />
      //TO DO figure out global sound object and fade out
      <Button title="Stop Drone" onPress={stopSound} />
      {/* <Button title="fade" onPress={fauxVol} /> */}
    </View>
  )
}

export default Drones
