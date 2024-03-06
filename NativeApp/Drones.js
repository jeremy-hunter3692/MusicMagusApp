import React, { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  Button,
  Pressable,
} from 'react-native'
import { Audio } from 'expo-av'
let playing = true
const fadeOutSpeed = 50000
const timeDelay = 4000
const Drones = ({ note }) => {
  const [currentPlayingDrone, setCurrentPlayingDrone] = useState()
  const [intervalId, setIntervalId] = useState()

  console.log(currentPlayingDrone)
  const playDrone = async () => {
    let thing = await startSound()
    setCurrentPlayingDrone(thing)
    fadeOut(thing, false)
  }

  const playLoop = () => {
    playDrone()
    let id = setInterval(() => playDrone(), timeDelay)
    setIntervalId(id)
  }

  function fadeOut(audioSound, upDown, rate = timeDelay) {
    return setTimeout(() => {
      console.log('fade')
      setVolume(audioSound, upDown)
    }, rate)
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
    clearInterval(intervalId)

    currentPlayingDrone.unloadAsync()
  }

  useEffect(() => {
    playLoop(note)
  }, [])

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
      <Pressable onPress={() => stopSound()}>
        <Text style={styles.button}>Stop Drone</Text>
      </Pressable>
      {/* <Button title="fade" onPress={fauxVol} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    color: 'white',
    margin: 5,
    padding: 10,
    backgroundColor: 'blue',
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 10,
  },
})

export default Drones
