import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { keys } from '../data/KeyCards.js'
import { noteAudioSrc } from '../data/NotesAudiosSrc.js'

import CardButton from './CardButton.js'
import { noteNames } from '../data/NoteCards.js'

const DisplayCardsGrid = ({
  userAnswerSetter,
  cardsArray,
  findNoteFunction,
  stylesBool,
  cardOnPress,
  cardSize,
  reDeal,
  isAnimated,
}) => {
  function setAnswer(inpt) {
    // console.log('displayCards', inpt)
    //input as card with im src
    // console.log('set inpt', inpt)
    //find the note based off the interval
    // let source = findNote(inpt.name, noteAudioSrc)
    // let res = source ? cardOnPress(source) : cardOnPress(inpt)
    userAnswerSetter(inpt)
    return null
  }
  const dealAnimationDelay = 5
  const firstHalfArray = cardsArray.slice(0, cardsArray.length / 2)
  const secondHalfArray = cardsArray.slice(
    cardsArray.length / 2,
    cardsArray.length
  )

  return (
    <>
      <View style={stylesBool ? styles.imgContTopBorder : styles.imgContTop}>
        {firstHalfArray?.map((x, index) => {
          return (
            <CardButton
              cardSize={cardSize}
              onPress={setAnswer}
              data={x}
              source={x.imgSrc}
              key={x.name}
              findAudioSourceFunction={findNoteFunction}
              animationDelay={index}
              reDeal={reDeal}
              animated={isAnimated}
            />
          )
        })}
      </View>
      <View
        style={stylesBool ? styles.imgContBottomBorder : styles.imgContBottom}
      >
        {secondHalfArray?.map((x, index) => {
          return (
            <CardButton
              cardSize={cardSize}
              onPress={setAnswer}
              data={x}
              source={x.imgSrc}
              key={x.name}
              findAudioSourceFunction={findNoteFunction}
              animationDelay={index + dealAnimationDelay}
              reDeal={reDeal}
              animated={isAnimated}
            />
          )
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imgContTop: {
    flexDirection: 'row',
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgContTopBorder: {
    borderColor: 'pink',
    borderWidth: 2,
    backgroundColor: 'blue',
    flexDirection: 'row',
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgContBottom: {
    flexDirection: 'row',
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imgContBottomBorder: {

    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
export default DisplayCardsGrid
