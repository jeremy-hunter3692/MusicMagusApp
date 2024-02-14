import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { playNote, setVolume } from './functions/audioFunctions.js'
import { keys } from './data/KeyCards.js'
import CardButton from './CardButton.js'

const DisplayCardsGrid = ({ userAnswerSetter, cardsArray }) => {
  function setAnswer(inpt) {
    console.log('setAnswer', inpt)
    let source = findNote(inpt)
    playNote(source.audioSrc)
    userAnswerSetter(inpt)
  }
  function findNote(inpt) {
    const result = keys.filter((x) => x.name === inpt)
    return result[0]
  }

  const firstHalfArray = cardsArray.slice(0, cardsArray.length / 2)
  const secondHalfArray = cardsArray.slice(
    cardsArray.length / 2,
    cardsArray.length
  )

  return (
    <>
      <View style={styles.imgContTop}>
        {firstHalfArray?.map((x) => {
          return (
            <CardButton onPress={setAnswer} data={x.name} source={x.imgSrc} />
          )
        })}
      </View>
      <View style={styles.imgContBottom}>
        {secondHalfArray?.map((x) => {
          return (
            <CardButton onPress={setAnswer} data={x.name} source={x.imgSrc} />
          )
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imgContTop: {
    flex: 1,
    // widht: 300,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    marginBottom: 1,
    marginTop: 1,
    padding: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgContBottom: {
    flex: 1,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    marginBottom: 1,
    marginTop: 1,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
export default DisplayCardsGrid
