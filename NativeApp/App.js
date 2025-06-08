import React, { useState } from 'react'
import MainGamePage from './Components/MainGamePage'
import OptionsPage from './Components/OptionsPage.js'
import AnnotatedCard from './Components/AnnotatedCards.js'
import HexKeyWithCards from './Components/HexKeyWithCards.js'
import TheoryCirlces from './Components/TheoryCircles.js'
import ExploreCards from './Components/ExploreCards.js'
import ScaleExplore from './Components/ScaleExplore.js'

import { GameContextProvider } from './Components/GameContext.js'
import ThemeContext from './Components/ThemeContext.js'
import AnnotatedContext from './Components/AnnotatedContext.js'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'

const themeInit = {
  primaryColor: 'purple',
  secondaryColor: '#19af59',
  annotatedBackGroundColor: 'rgba(51, 23, 73, 0.99)',
}
const secondaryTheme = {
  primaryColor: 'black',
  secondaryColor: 'purple',
  annotatedBackGroundColor: 'rgba(51, 23, 73, 0.99)',
}

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

  const font = { fontScale: width / 90, fontColor: 'white', fontType: 'Arial' }
  const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardSize = {
    cardWidth: cardWidth,
    cardHeight: cardWidth * 1.5,
  }
  const scoreCirclesSize = height / 20
  const dimensions = { width: width, height: height }

  // function getKey(musicKey) {
  //   setHexKey(musicKey)
  // }

  function handleAnnotatedClick(inpt) {
    annotatedCard ? setAnnotatedCard(null) : setAnnotatedCard(inpt)
  }

  function setAnnotatedMode() {
    annotatedCard ? setAnnotatedCard(null) : ''
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
    annotatedCardDisplay ? setAnnotatedCardDisplay(false) : ''
    setShowOptions((x) => (x = !x))
  }

  const randomMagusModeButton = {
    margin: 4,
    padding: 4,
    color: theme.primaryColor,
    fontSize: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderColor: theme.secondaryColor,
    borderWidth: 3,
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
            ? theme.annotatedBackGroundColor
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
        <ThemeContext.Provider
          value={{
            font,
            theme,
            changeTheme,
            cardSize,
            dimensions,
            scoreCirclesSize,
            animationsOn,
          }}
        >
          <AnnotatedContext.Provider
            value={{
              annotatedCard,
              annotated: annotatedCardDisplay,
              setAnnotatedCard: handleAnnotatedClick,
              setAnnotatedMode,
            }}
          >
            {annotatedCard ? (
              <View style={styles.annotated}>
                <AnnotatedCard />
              </View>
            ) : (
              <GameContextProvider>
                <MainGamePage
                  isRandomAllQuestionTypes={isRandom}
                  isAnimated={animationsOn}
                  setShowOptions={showOptionsSetter}
                  showOptions={showOptions}
                  dimensions={{ width, height }}
                  buttonTheme={randomMagusModeButton}
                />
              </GameContextProvider>
            )}
          </AnnotatedContext.Provider>
          {showOptions && (
            <View style={styles.options}>
              <OptionsPage
                height={height}
                changeTheme={changeTheme}
                randomQuestionsSetter={randomQuestionsSetter}
                setAnimations={setAnimations}
                isAnimated={animationsOn}
                setShowOptions={showOptionsSetter}
                theme={theme}
                buttonTheme={randomMagusModeButton}
              />
            </View>
          )}
          {/*  <ExploreCards />
        <TheoryCirlces /> 
        <ScaleExplore />*/}
        </ThemeContext.Provider>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  options: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',

    zIndex: 10,
  },
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
