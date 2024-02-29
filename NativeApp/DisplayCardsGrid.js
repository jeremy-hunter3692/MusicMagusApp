import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { playNote, setVolume } from './functions/audioFunctions.js'
import { keys } from './data/KeyCards.js'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'
import CardButton from './CardButton.js'

const DisplayCardsGrid = ({ userAnswerSetter, cardsArray, cardOnPress }) => {
  function setAnswer(inpt) {
    // console.log('setAnswer', inpt)
    let source = findNote(inpt.name, noteAudioSrc).audioSrc['1']

    console.log(source)
    // playNote(source.audioSrc)
    cardOnPress(source)
    userAnswerSetter(inpt.name)
  }

  function findNote(inpt, array = keys) {
    console.log(inpt, array)
    const result = array.filter((x) => x.name === inpt)
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
          return <CardButton onPress={setAnswer} data={x} source={x.imgSrc} />
        })}
      </View>
      <View style={styles.imgContBottom}>
        {secondHalfArray?.map((x) => {
          return <CardButton onPress={setAnswer} data={x} source={x.imgSrc} />
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imgContTop: {
    // flex: 1,
    // widht: 300,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    marginBottom: 1,
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgContBottom: {
    // flex: 1,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
export default DisplayCardsGrid
