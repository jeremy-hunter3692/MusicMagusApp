import React, { useState } from 'react'
import MainQuestionPage from './Components/MainQuestionPage'
import AnnotatedCards from './Components/AnnotatedCards'
import OptionsPage from './Components/OptionsPage.js'
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
import QuestionIconButtons from './Components/QuestionIconButtons.js'

const themeInit = { bgColor: 'purple', secondaryColor: '#19af59' }
const secondaryTheme = { bgColor: 'black', secondaryColor: 'purple' }
let themeBool = true

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [theme, setTheme] = useState(themeInit)
  const [annotatedCard, setAnnotatedCard] = useState()
  const [questionType, setQuestionType] = useState('Key')
  const [showOptions, setShowOptions] = useState(false)
  const [annotatedCardDisplay, setAnnotatedCardDisplay] = useState(false)
  const [animationsOn, setAnimationsOn] = useState(true)
  const [isRandom, setIsRandom] = useState(false)

  const { width, height } = useWindowDimensions()

  function getKey(musicKey) {
    setHexKey(musicKey)
  }
  function appLevel(inpt) {
    console.log('TODO-App level', inpt)
  }

  function changeQuestionType(inpt) {
    let type =
      inpt === 1
        ? 'Key'
        : inpt === 2
        ? 'Interval'
        : inpt === 3
        ? 'Note'
        : 'Random'
    setQuestionType(type)
  }

  function handleAnnotatedClick() {
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
          backgroundColor: theme.bgColor,
          flexDirection: 'column',
          shadowColor: 'black',
          // shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 35,
          // Android Elevation
          elevation: 5,
        }}
      >
        <View
          style={{
            margin: 0,
            fontWeight: 'bold',
            flex: 0.3,
            color: 'white',
            flexDirection: 'row',
            backgroundColor: theme.secondaryColor,
            justifyContent: 'flex-end',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {annotatedCardDisplay && !annotatedCard && (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontColor: 'white',
                margin: 10,
              }}
            >{`Change Question Type Here--->  `}</Text>
          )}

          {!annotatedCard ? (
            <>
              {!isRandom ? (
                <QuestionIconButtons
                  changeQuestionType={changeQuestionType}
                  annotated={annotatedCardDisplay}
                />
              ) : (
                <Text>Randomised Questions</Text>
              )}
              <Pressable onPress={() => setShowOptions((x) => (x = !x))}>
                <Text style={styles.optionText}>
                  {showOptions ? 'Back' : 'Options'}
                </Text>
              </Pressable>
            </>
          ) : (
            ''
          )}
          <Pressable onPress={handleAnnotatedClick}>
            <View
              style={[
                {},
                !annotatedCard && {
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Text style={{ color: theme.bgColor }}>
                {annotatedCard ? 'Back' : '?'}
              </Text>
            </View>
          </Pressable>
        </View>

        {showOptions ? (
          <OptionsPage
            height={height}
            changeTheme={changeTheme}
            randomQuestionsSetter={randomQuestionsSetter}
            setAnimations={setAnimations}
            isAnimated={animationsOn}
          />
        ) : (
          <>
            {annotatedCard ? (
              <View style={styles.annotated}>
                <AnnotatedCards
                  data={annotatedCard}
                  setAnnotated={handleAnnotatedClick}
                />
              </View>
            ) : (
              <MainQuestionPage
                bgColor={theme.bgColor}
                secondaryColor={theme.secondaryColor}
                questionType={questionType}
                setAnnotatedCard={setAnnotatedCard}
                annotated={annotatedCardDisplay}
                isRandom={isRandom}
                isAnimated={animationsOn}
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
