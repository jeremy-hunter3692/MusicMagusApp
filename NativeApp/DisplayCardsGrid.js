import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import { keys } from './KeyCards.js'
import CardButton from './CardButton.js'

const DisplayCardsGrid = ({ userAnswerSetter, cardsArray }) => {
  function setAnswer(inpt) {
    console.log('setAnswer', inpt)
    let audioSource = findNote(inpt)
    playNote(audioSource.audioSrc)

    userAnswerSetter(inpt)
  }

  function findNote(inpt) {
    const result = keys.filter((x) => x.name === inpt)
    return result[0]
  }

  const playNote = async (note) => {
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

  async function setVolume(sound, up) {
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

  const firstHalfArray = cardsArray.slice(0, cardsArray.length / 2)
  const secondHalfArray = cardsArray.slice(
    cardsArray.length / 2,
    cardsArray.length
  )

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imgCont}>
          {firstHalfArray?.map((x) => {
            return (
              <TouchableOpacity onPress={setAnswer}>
                <CardButton
                  onPress={setAnswer}
                  data={x.name}
                  source={x.imgSrc}
                />
              </TouchableOpacity>
            ) //<Button onPress={setAnswer} data={x.name} title={x.name} />
          })}
        </View>
        <View style={styles.imgCont}>
          {secondHalfArray?.map((x) => {
            return (
              <TouchableOpacity onPress={setAnswer}>
                <CardButton
                  onPress={setAnswer}
                  data={x.name}
                  source={x.imgSrc}
                />
              </TouchableOpacity>
            ) //<Button onPress={setAnswer} data={x.name} title={x.name} />
          })}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    flexDirection: 'column',
  },
  imgCont: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 0,

    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 5,
    padding: 5,
  },
})
export default DisplayCardsGrid
