import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Image, Button } from 'react-native'
import { Audio } from 'expo-av'

const Drones = ({ note }) => {
  const [sound, setSound] = useState()

  const playSound = async () => {
    console.log(note.value)
    try {
      const { sound } = await Audio.Sound.createAsync(note.value.audioSrc)
      setSound(sound)
      await sound.playAsync()
    } catch (error) {
      console.log('Error playing sound:', error)
    }
    setVolume()
  }

  async function setVolume(volume) {
    try {
      await sound.setVolumeAsync(volume)
    } catch (error) {
      console.error('Failed to set volume:', error)
    }
  }

  async function fadeVolume(targetVolume, duration) {
    console.log('fade', sound, sound.volume)
    const initialVolume = await sound.getVolumeAsync()
    const volumeChange = targetVolume - initialVolume
    const intervalDuration = 100 // Adjust interval duration as needed
    const steps = duration / intervalDuration
    const volumeStep = volumeChange / steps

    for (let i = 0; i < steps; i++) {
      const newVolume = initialVolume + volumeStep * i
      await sound.setVolumeAsync(newVolume)
      await new Promise((resolve) => setTimeout(resolve, intervalDuration))
    }

    // Set final volume to ensure accuracy
    await sound.setVolumeAsync(targetVolume)
  }

  // Usage
  fadeVolume(0.5, 5000) // Fade volume to 50% over 5 seconds

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync()
    }
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined
  }, [sound])

  return (
    <View>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Stop Sound" onPress={stopSound} />
      <Button title="fade" onPress={fadeVolume(0, 1000)} />
    </View>
  )
}

export default Drones
