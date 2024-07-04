import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { keys } from './data/KeyCards.js'
import { noteAudioSrc } from './data/NotesAudiosSrc.js'

import CardButton from './CardButton.js'
import { noteNames } from './data/NoteCards.js'

const DisplayCardsGrid = ({
  userAnswerSetter,
  cardsArray,
  findNoteFunction,
  cardOnPress,
}) => {
  function setAnswer(inpt) {
    //input as card with im src
    // console.log('set inpt', inpt)
    //find the note based off the interval
    // let source = findNote(inpt.name, noteAudioSrc)
    // let res = source ? cardOnPress(source) : cardOnPress(inpt)
    userAnswerSetter(inpt)
    return null
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
              findAudioSourceFunction={findNoteFunction}
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
              findAudioSourceFunction={findNoteFunction}
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
