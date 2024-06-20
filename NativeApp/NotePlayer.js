import { Audio } from 'expo-av'
const fadeOutSpeed = 1000
const globalvolume = 0.6
const bassDroneVolume = 0.4

const playSound = async (note) => {
  const source = note
  try {
    const initalStatus = {
      volume: globalvolume,
      isLooping: false,
    }
    const { sound } = await Audio.Sound.createAsync(source, initalStatus)
    console.log('play note', sound)
    // setSoundState(sound)
    await sound.playAsync()

    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        await sound.unloadAsync()
      }
    })
  } catch (error) {
    setSoundState(null)
    console.log('Error playing sound:', error)
  }
}

export default playSound
