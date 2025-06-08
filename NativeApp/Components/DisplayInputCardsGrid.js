import { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { useUpdateGameContext, useGameContext } from './GameContext.js'
import AnnotatedContext from './AnnotatedContext.js'

import CardButton from './CardButton.js'

const DisplayInputCardsGrid = ({ reDeal, isAnimated }) => {
  const { displayInputCardArray: cardsArray, choosingKey } = useGameContext()
  const { userInputCardPress } = useUpdateGameContext()
  const { annotated } = useContext(AnnotatedContext)

  let alterationSize = choosingKey ? 0.9 : annotated ? 0.3 : 1

  function setAnswer(inpt) {
    if (annotated) {
      return
    }
    let audioSrc = userInputCardPress(inpt)

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
              imgSource={x.imgSrc}
              key={`input${x.name}`}
              findAudioSourceFunction={userInputCardPress}
              animationDelay={index}
              reDeal={reDeal}
              animated={isAnimated}
              alterationSize={alterationSize}
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
              imgSource={x.imgSrc}
              key={`input${x.name}`}
              findAudioSourceFunction={userInputCardPress}
              animationDelay={index + dealAnimationDelay}
              reDeal={reDeal}
              animated={isAnimated}
              alterationSize={alterationSize}
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
