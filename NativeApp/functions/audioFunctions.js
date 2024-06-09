import { Audio } from 'expo-av'
const fadeOutSpeed = 1000
const globalvolume = 0.6
const bassDroneVolume = 0.4
const fadeStartTime = 500

export const playNote = async (note) => {
  const source = note
  try {
    const initStatus = {
      volume: globalvolume,
      isLooping: false,
      shouldPlay: false,
    }
    const { sound } = await Audio.Sound.createAsync(source, initStatus)
    console.log('play note')
    sound.playAsync()
    return sound
  } catch (error) {
    console.log('Error playing sound:', error)
  }
}

export const playNoteForLooping = async (note) => {
  console.log('note started')
  const source = note
  try {
    const initStatus = {
      volume: bassDroneVolume,
      isLooping: true,
    }
    const { sound } = await Audio.Sound.createAsync(source, initStatus)
    await sound.playAsync()

    // sound.setOnPlaybackStatusUpdate((status) => {
    //   if (status.positionMillis > 5999) {
    //     console.log('Sound just finished a loop')
    //   }
    // })
    return sound
  } catch (error) {
    console.log('Error playing sound:', error)
  }
}

export const playLoop = async (note) => {
  let currentSound = await playNoteForLooping(note)
  let id
  let currentSoundTwo

  const wait = (t) =>
    new Promise((resolve, reject) => {
      id = setTimeout(async () => {
        currentSoundTwo = await playNoteForLooping(note)
        resolve(currentSoundTwo)
      }, t)
    })

  await wait(3000).then((res) => console.log('in wait', res))

  return {
    intervalId: id,
    currentSound: currentSound,
    currentSoundTwo: currentSoundTwo,
  }
}

// id = setTimeout(resolve(playNoteForLooping(note)), t)
// return { id, resolve }

// const currentSoundTwo = async () => {
//   return await wait(2900)
// }

// let id = setTimeout(() => {
//   currentSoundTwo = playNoteForLooping(note)
//   playNoteForLooping.then((res) => (currentSoundTwo = res))
// }, 2900)
// currentSound.then((res) => console.log('in prmose', res)) //await playNoteForLooping(note)
// console.log('in play loops', currentSound)

export function volumeFadeOutOrIn(sound, fadeIn, duration = fadeOutSpeed) {
  // console.log('fade', fadeIn)
  const updateInt = 100
  // console.log({ globalvolume }, typeof globalvolume)
  // causing a clicking issue in the fade out, probably because it's jumping fadeIn to a newvolume rather than working off the global?
  const inOrOut = fadeIn ? 1 : -1

  const initialVolume = fadeIn ? 0 : globalvolume
  const targetVolume = fadeIn ? globalvolume : 0
  // const steps = (globalvolume / rate) * upDown
  const totalSteps = duration / updateInt
  const steps = (targetVolume - initialVolume) / totalSteps
  // console.log({ inOrOut }, { steps }, { targetVolume }, { initialVolume })
  let newVolume = initialVolume
  let stepCount = 0

  const intervalId = setInterval(() => {
    if (stepCount >= totalSteps) {
      clearInterval(intervalId)
      // setTimeout(() => {
      //   sound.setVolumeAsync(targetVolume)
      // }, 100)
      // console.log(`Final volume set to ${targetVolume}`)
      return
    }

    newVolume += steps
    newVolume = Math.max(0.0, Math.min(1.0, newVolume)) // Clamp the volume
    sound.setVolumeAsync(newVolume)
    // console.log(`Step ${stepCount}: newVolume = ${newVolume}`)

    stepCount++
  }, updateInt)
  // newVolume += steps
  // newVolume = Math.max(0.0, Math.min(1.0, newVolume))
  // if (i % 10 === 0) {
  // console.log(`I ${i}: newVolume = ${newVolume} : I ${i}`)
  // }
  // sound.setVolumeAsync(newVolume)
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
