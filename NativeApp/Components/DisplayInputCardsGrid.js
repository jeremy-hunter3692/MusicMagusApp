import { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { useUpdateGameContext, useGameContext } from './GameContext.js'
import AnnotatedContext from './AnnotatedContext.js'

import CardButton from './CardButton.js'

const DisplayInputCardsGrid = ({ reDeal, isAnimated }) => {
  const { displayInputCardArray: cardsArray, choosingKey } = useGameContext()
  const { userInputCardPress, getAudioSrcIdxFromCardReducer } =
    useUpdateGameContext()
  const { annotated } = useContext(AnnotatedContext)

  //gpt shit for keys pressed
  // const viewRef = useRef(null)
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     console.log('key', e.key)
  //   }

  //   const node = viewRef.current
  //   if (node) {
  //     node.addEventListener('keydown', handleKeyDown)
  //   }
  //   return () => {
  //     if (node) node.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])
  //////////////////////////////

  let alterationSizing = choosingKey ? 1 : annotated ? 0.3 : 1

  function setAnswer(inpt) {
    //Check is just for extra backup?
    if (annotated) {
      return
    }
    userInputCardPress(inpt)
    let audioSrc = getAudioSrcIdxFromCardReducer(inpt)
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
              animationDelay={index}
              reDeal={reDeal}
              animated={isAnimated}
              alterationSizing={alterationSizing}
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
              animationDelay={index + dealAnimationDelay}
              reDeal={reDeal}
              animated={isAnimated}
              alterationSizing={alterationSizing}
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
