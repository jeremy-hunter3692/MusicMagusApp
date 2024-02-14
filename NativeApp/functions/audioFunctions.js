import { Audio } from 'expo-av'


export const playNote = async (note) => {
  console.log('start', note)
  const source = note
  const status = { volume: 1 }
  try {
    const { sound } = await Audio.Sound.createAsync(source, status)
    await sound.playAsync()
    setTimeout(() => {
      setVolume(sound, false)
    }, 1000)
  } catch (error) {
    console.log('Error playing sound:', error)
  }
}

export async function setVolume(sound, up) {
  console.log('setvol', sound)
  const fadeOutSpeed = 5000
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