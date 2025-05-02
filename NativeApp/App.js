import React, { useState } from 'react'
import MainQuestionPage from './Components/MainQuestionPage'
import AnnotatedCards from './Components/AnnotatedCards.js'
import HexKeyWithCards from './Components/HexKeyWithCards.js'
import TheoryCirlces from './Components/TheoryCircles.js'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  SafeAreaView,
} from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'

const themeInit = { primaryColor: 'purple', secondaryColor: '#19af59' }
const secondaryTheme = { primaryColor: 'black', secondaryColor: 'purple' }
const annotatedBackGroundColor = 'rgba(51, 23, 73, 0.99)'
let themeBool = true
export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [theme, setTheme] = useState(themeInit)
  const [annotatedCard, setAnnotatedCard] = useState()
  const [showOptions, setShowOptions] = useState(false)
  const [annotatedCardDisplay, setAnnotatedCardDisplay] = useState(false)
  const [animationsOn, setAnimationsOn] = useState(true)
  const [isRandom, setIsRandom] = useState(false)

  const { width, height } = useWindowDimensions()

  // function getKey(musicKey) {
  //   setHexKey(musicKey)
  // }
  // function appLevel(inpt) {
  //   console.log('TODO-App level', inpt)
  // }

  function handleAnnotatedClick(inpt) {
    annotatedCard ? setAnnotatedCard(null) : setAnnotatedCard(inpt)
    setAnnotatedMode()
  }

  function setAnnotatedMode() {
    setAnnotatedCardDisplay((x) => !x)
  }
  function changeTheme() {
    themeBool === true ? setTheme(secondaryTheme) : setTheme(themeInit)
    themeBool = !themeBool
  }

  function setAnimations() {
    setAnimationsOn((x) => (x = !x))
  }
  function randomQuestionsSetter() {
    setIsRandom((x) => (x = !x))
  }

  function showOptionsSetter() {
    setShowOptions((x) => (x = !x))
  }
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 0,
          maxHeight: '100%',
          maxWidth: width,
          // marginTop: 15,
          padding: 0,
          backgroundColor: annotatedCardDisplay
            ? annotatedBackGroundColor
            : theme.primaryColor,
          flexDirection: 'column',
          shadowColor: 'black',
          // shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 35,
          // Android Elevation
          elevation: 5,
        }}
      >
        {showOptions ? (
          <OptionsPage
            height={height}
            changeTheme={changeTheme}
            randomQuestionsSetter={randomQuestionsSetter}
            setAnimations={setAnimations}
            isAnimated={animationsOn}
            setShowOptions={showOptionsSetter}
          />
        ) : (
          <>
            {annotatedCard ? (
              <View style={styles.annotated}>
                <AnnotatedCards
                  data={annotatedCard}
                  setAnnotated={() => setAnnotatedCard(null)}
                  bgColor={annotatedBackGroundColor}
                />
              </View>
            ) : (
              <MainQuestionPage
                theme={theme}
                annotated={annotatedCardDisplay}
                isRandomAllQuestionTypes={isRandom}
                isAnimated={animationsOn}
                setShowOptions={showOptionsSetter}
                showOptions={showOptions}
                setAnnotatedCard={handleAnnotatedClick}
                setAnnotatedMode={setAnnotatedMode}
                dimensions={{ width, height }}
              />
            )}
          </>
        )}

        {/* <TheoryCirlces /> */}
      </SafeAreaView>
    </>
  )
}

// {displayOptions ? (
//   <>
//     <OptionsPage
//       selectDroneAudio={selectDroneAudio}
//       droneOnOff={droneOnOff}
//       changeQuestionType={changeQuestionType}
//     />
//   </>
const styles = StyleSheet.create({
  optionText: {
    color: 'purple',
    margin: 5,
  },
  button: {
    //for icon cards
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19af59', //#003399

    // borderWidth: 1,
    // borderColor: 'white',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomWidth: 0,
    //
    // shadowColor: 'black',
    // shadowOffset: { width: 2, height: 1.5 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // Android Elevation
    elevation: 5,
  },
  annotated: {
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '100%',
  },
})
