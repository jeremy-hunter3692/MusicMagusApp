import { Audio } from 'expo-av'
const fadeOutSpeed = 80000
const globalvolume = 0.8
const fadeStartTime = 3000

export const playNote = async (
  note,
  fadeSpeed = fadeOutSpeed,
  fadeDelay = 1000
) => {
  const source = note
  try {
    const initStatus = { volume: 1, isLooping: true, shouldPlay: true }
    const { sound } = await Audio.Sound.createAsync(source, initStatus)
    sound.playAsync()
    setTimeout(() => {
      volumeFadeDownOrUp(sound, false, fadeSpeed)
    }, fadeDelay)

    return sound
  } catch (error) {
    console.log('Error playing sound:', error)
  }
}

export const playNoteForLooping = async (note) => {
  const source = note
  try {
    const initStatus = {
      volume: globalvolume,
      isLooping: true,
    }
    const { sound } = await Audio.Sound.createAsync(source, initStatus)
    await sound.playAsync()
    return sound
  } catch (error) {
    console.log('Error playing sound:', error)
  }
}

export const playLoop = async (note) => {
  let currentSound = await playNoteForLooping(note)
  console.log({ currentSound })
  let id = setInterval(() => {
    playNoteForLooping(note)
  }, fadeStartTime)

  return { intervalId: id, currentSound: currentSound }
}

export function volumeFadeDownOrUp(sound, up, rate = fadeOutSpeed) {
  // causing a clicking issue in the fade out, probably because it's jumping up to a newvolume rather than working off the global?

  const upDown = up ? 1 : -1
  const volume = up ? 0 : globalvolume

  for (let i = 0; i < rate; i++) {
    const steps = (1 / rate) * upDown
    const newVolume = volume + steps * i
    sound.setVolumeAsync(newVolume)
  }
}

// export const playNoteAsDrone = async (note, timeDelay = 1000) => {
//   console.log('start playNoteAsDrone:', note, timeDelay)
//   const source = note
//   const status = { volume: globalvolume, isLooping: true }
//   try {
//     const { sound } = await Audio.Sound.createAsync(source, status)
//     await sound.playAsync()
//     // setTimeout(() => {
//     //   volumeFadeDownOrUp(sound, false)
//     // }, timeDelay)
//     return sound
//   } catch (error) {
//     console.log('Error playing sound:', error)
//   }
// }
