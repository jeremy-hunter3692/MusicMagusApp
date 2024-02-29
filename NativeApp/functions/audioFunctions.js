import { Audio } from 'expo-av'
const fadeOutSpeed = 9000

export const playNote = async (note) => {
  console.log('start', note)
  const source = note
  const status = { volume: 1 }
  try {
    const { sound } = await Audio.Sound.createAsync(source, status)
    await sound.playAsync()
    // setTimeout(() => {
    //   setVolume(sound, false)
    // }, 1000)
  } catch (error) {
    console.log('Error playing sound:', error)
  }
}

export const playNoteAsDrone = async (note, timeDelay = 1000) => {
  console.log('start', note)
  const source = note
  const status = { volume: 1 }
  try {
    const { sound } = await Audio.Sound.createAsync(source, status)
    await sound.playAsync()
    setTimeout(() => {
      setVolumeFade(sound, false)
    }, timeDelay)
  } catch (error) {
    console.log('Error playing sound:', error)
  }
}

const startSound = async (note) => {
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

export async function setVolumeFade(sound, up) {
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
export const playDrone = async (note) => {
  let audioPlaying = await playNoteAsDrone(note, 5000)
  // fadeOutTimer(audioPlaying, false)
}

export const playLoop = async (note) => {
  playDrone(note)
  let id = setInterval(() => {
    console.log('triggered play drone')
    playDrone(note)
  }, 4000)

  return id
}

export function fadeOutTimer(sound, upDown) {
  return setTimeout(() => {
    setVolumeFade(sound, upDown)
  }, 4000)
}

export function stopDrone(note) {}
