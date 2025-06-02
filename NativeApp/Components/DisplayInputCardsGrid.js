import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import CardButton from './CardButton.js'

import { useContext } from 'react'
import { useGameContext, useGameContextUpdate } from './CardsContext.js'
import AnnotatedContext from './AnnotatedContext.js'
import ThemeContext from './ThemeContext.js'

const DisplayInputCardsGrid = ({ findNoteFunction, reDeal, isAnimated }) => {
  const {
    questionCard,
    displayInputCardArray: cardsArray,
    userAnswerSetter,
  } = useGameContext()
  const { annotated } = useContext(AnnotatedContext)

  function setAnswer(inpt) {
    if (annotated) {
      return
    }
    let audioSrc = findNoteFunction(inpt)
    userAnswerSetter(inpt)
    return audioSrc
  }

  const dealAnimationDelay = 5
  const firstHalfArray = cardsArray.slice(0, cardsArray.length / 2)
  const secondHalfArray = cardsArray.slice(
    cardsArray.length / 2,
    cardsArray.length
  )

  return (
    <>
      <View style={styles.imgContTop}>
        {firstHalfArray?.map((x, index) => {
          return (
            <CardButton
              onPressPropFunction={setAnswer}
              data={{ value: x }}
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
      <View style={styles.imgContBottom}>
        {secondHalfArray?.map((x, index) => {
          return (
            <CardButton
              onPressPropFunction={setAnswer}
              data={{ value: x }}
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

  imgContBottom: {
    flexDirection: 'row',
    marginTop: 0,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
export default DisplayInputCardsGrid
