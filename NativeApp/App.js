import React, { useState, useEffect } from 'react'
import MainGamePage from './Components/MainGamePage'
import OptionsPage from './Components/OptionsPage.js'
import AnnotatedCard from './Components/AnnotatedCards.js'
import HexKeyWithCards from './Components/HexKeyWithCards.js'
import TheoryCirlces from './Components/TheoryCircles.js'
import ExploreCards from './Components/ExploreCards.js'
import ScaleExplore from './Components/ScaleExplore.js'

import * as ScreenOrientation from 'expo-screen-orientation'

import { GameContextProvider } from './Components/GameContext.js'
import ThemeContext from './Components/ThemeContext.js'
import AnnotatedContext from './Components/AnnotatedContext.js'
import SplashAnimation from './Components/SplashAnimation.js'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native'
import { keys, getIntervalNo } from './data/KeyCards'

const annotatedBackGroundColor = 'rgba(21, 14, 35, 0.99)'
const themeInit = {
  primaryColor: 'purple',
  secondaryColor: '#19af59',
  annotatedBackGroundColor: annotatedBackGroundColor,
}
const secondaryTheme = {
  primaryColor: '#13482aff',
  secondaryColor: 'purple',
  annotatedBackGroundColor: annotatedBackGroundColor,
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
  const [showSplashAnimation, setShowSplashAnimation] = useState(true)
  const splashAnimation = 4000

  useEffect(() => {
    async function lock() {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        )
      } catch (e) {
        console.warn('Failed to lock orientation', e)
      }
    }
    lock()
  }, [])

  const { width, height } = useWindowDimensions()
  function splashAnimationOff() {
    setShowSplashAnimation(false)
  }

  const font = {
    fontScale: Math.ceil(width / 70),
    fontColor: 'white',
    fontType: 'Arial',
  }
  // const cardWidth = width > height ? width * 0.1 : width * 0.14
  const cardHeight = (height / 4) * 1.08

  const cardSize = {
    cardWidth: cardHeight * (2 / 3),
    cardHeight: cardHeight, //cardWidth * 1.5,
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
    margin: 2,
    padding: 4,
    color: theme.primaryColor,
    fontSize: font.fontScale,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderColor: theme.secondaryColor,
    borderWidth: 3,
    overflow: 'hidden',
  }

  if (showSplashAnimation) {
    return (
      <SplashAnimation
        cardSize={cardSize}
        width={width}
        height={height}
        animationTime={splashAnimation}
        splashAnimationOff={splashAnimationOff}
      />
    )
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
              annotatedBackGroundColor: annotatedBackGroundColor,
            }}
          >
            <GameContextProvider>
              {annotatedCard ? (
                <View style={styles.annotated}>
                  <AnnotatedCard />
                </View>
              ) : (
                <>
                  <MainGamePage
                    isRandomAllQuestionTypes={isRandom}
                    isAnimated={animationsOn}
                    setShowOptions={showOptionsSetter}
                    showOptions={showOptions}
                    dimensions={{ width, height }}
                    buttonTheme={randomMagusModeButton}
                  />

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
                </>
              )}
            </GameContextProvider>
          </AnnotatedContext.Provider>
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
