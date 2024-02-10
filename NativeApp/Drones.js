import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Image, Button } from 'react-native'
import { Audio } from 'expo-av'
let playing = true
const fadeOutSpeed = 50000
const timeDelay = 4000
const Drones = ({ note }) => {
  const [currentPlayingDrone, setCurrentPlayingDrone] = useState()
  const [intervalId, setIntervalId] = useState()

  const playDrone = async () => {
    let thing = await startSound()
    fadeOut(thing, false)
  }

  const playLoop = async () => {
    playDrone()
    let id = setInterval(() => playDrone(), timeDelay)
    setIntervalId(id)
  }

  function fadeOut(audioSound, upDown) {
    return setTimeout(() => {
      console.log('fade')
      setVolume(audioSound, upDown)
    }, timeDelay)
  }

  const startSound = async () => {
    console.log('start')
    const source = note.value.audioSrc
    const status = { volume: 1 }
    try {
      const { sound } = await Audio.Sound.createAsync(source, status)
      await sound.playAsync()
      return sound
    } catch (error) {
      console.log('Error playing sound:', error)
    }
  }

  async function setVolume(sound, up) {
    const upDown = up ? 1 : -1
    const volume = up ? 0 : 1
    const steps = fadeOutSpeed
    for (let i = 0; i < steps; i++) {
      const rate = (1 / steps) * upDown
      const newVolume = volume + rate * i
      await sound.setVolumeAsync(newVolume)
      // console.log(up, upDown, newVolume)
    }
  }

  const stopSound = async () => {
    await sound.stopAsync()
  }

  function fauxVol() {
    sound ? setVolume(1, 10000) : console.log('no sound')
  }
  //clean up
  useEffect(() => {
    return currentPlayingDrone
      ? () => currentPlayingDrone.unloadAsync()
      : undefined
  }, [currentPlayingDrone])

  return (
    <View>
      {/* <Button title="Play Drone" onPress={playLoop} /> */}
      {/* //TO DO figure out global sound object and fade out */}
      <Button title="Stop Drone" onPress={() => clearInterval(intervalId)} />
      {/* <Button title="fade" onPress={fauxVol} /> */}
    </View>
  )
}

export default Drones
