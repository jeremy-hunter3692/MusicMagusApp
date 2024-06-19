import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { playNote, setVolume } from './audioPlayer.js'
import { keys } from './data/KeyCards.js'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'

import CardButton from './CardButton.js'

const DisplayCardsGrid = ({ userAnswerSetter, cardsArray, cardOnPress }) => {
  function setAnswer(inpt) {
    //find the note based off the interval
    let source = findNote(inpt.name, noteAudioSrc)
    source ? cardOnPress(source) : cardOnPress(inpt)
    userAnswerSetter(inpt.name)
  }

  function findNote(inpt, array = keys) {
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
          return (
            <CardButton
              onPress={setAnswer}
              data={x}
              source={x.imgSrc}
              key={x.name}
            />
          )
        })}
      </View>
      <View style={styles.imgContBottom}>
        {secondHalfArray?.map((x) => {
          return (
            <CardButton
              onPress={setAnswer}
              data={x}
              source={x.imgSrc}
              key={x.name}
            />
          )
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imgContTop: {
    flex: 1,

    // backgroundColor: 'blue',
    flexDirection: 'row',
    marginBottom: 1,
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgContBottom: {
    flex: 1,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
export default DisplayCardsGrid
