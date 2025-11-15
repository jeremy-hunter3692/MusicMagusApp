import { Audio } from 'expo-av'

const soundCache = new Map()
let audioInitialized = false

export async function initAudioMode() {
  if (audioInitialized) return
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    })
    audioInitialized = true
  } catch (e) {
    console.warn('initAudioMode failed', e)
  }
}

async function loadSound(uri) {
  if (!uri) return null
  if (soundCache.has(uri)) return soundCache.get(uri)
  try {
    const { sound } = await Audio.Sound.createAsync(uri, { volume: 0.6, isLooping: false })
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status?.didJustFinish) sound.setPositionAsync(0).catch(() => {})
    })
    soundCache.set(uri, sound)
    return sound
  } catch (e) {
    console.error('loadSound failed', uri, e)
    return null
  }
}

export async function preloadSounds(list = [], concurrency = 3) {
  await initAudioMode()
  const queue = [...list]
  const workers = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (queue.length) {
      const uri = queue.shift()
      if (!uri) break
      if (!soundCache.has(uri)) {
        await loadSound(uri)
        await new Promise((r) => setTimeout(r, 40))
      }
    }
  })
  await Promise.all(workers)
}

export async function playSound(uri) {
  if (!uri) return
  await initAudioMode()
  let sound = soundCache.get(uri)
  if (!sound) sound = await loadSound(uri)
  if (!sound) return
  try {
    await sound.setPositionAsync(0)
    await sound.playAsync()
  } catch (e) {
    console.error('playSound error', e)
  }
}

export async function unloadAllSounds() {
  const promises = Array.from(soundCache.values()).map((s) => s.unloadAsync().catch(() => {}))
  await Promise.allSettled(promises)
  soundCache.clear()
}