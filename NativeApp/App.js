import React, { useState } from 'react'
import QuestionHolder from './Components/QuestionHolder'
import AnnotatedCards from './Components/AnnotatedCards'
import OptionsPage from './Components/OptionsPage.js'
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

export default function App() {
  const [hexKey, setHexKey] = useState(keys[0])
  const [annotatedCard, setAnnotatedCard] = useState()
  const [questionType, setQuestionType] = useState('Key')
  const [showOptions, setShowOptions] = useState(false)
  const [annotatedCardDisplay, setAnnotatedCardDisplay] = useState(false)

  const { width, height } = useWindowDimensions()

  function getKey(musicKey) {
    setHexKey(musicKey)
  }
  function appLevel(inpt) {
    console.log('TODO-App level', inpt)
  }
  function changeQuestionType(inpt) {
    console.log('change top', inpt)
    let type = inpt === 1 ? 'Key' : inpt === 2 ? 'Interval' : 'Note'
    setQuestionType(type)
  }

  function handleAnnotatedClick() {
    annotatedCard ? setAnnotatedCard(null) : ''
    setAnnotatedCardDisplay((x) => !x)
  }

  const bgColor = 'purple' //'#19af59'
  const secondaryColor = '#19af59'

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 0,
          maxHeight: '%100',
          maxWidth: width,
          // marginTop: 15,
          padding: 0,
          backgroundColor: bgColor,
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
            flex: 0.25,
            color: 'white',
            flexDirection: 'row',
            backgroundColor: secondaryColor,
            justifyContent: 'flex-end',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {annotatedCardDisplay && !annotatedCard && (
            <Text>Change Question Type Here---</Text>
          )}

          {!annotatedCard ? (
            <>
              <QuestionIconButtons
                changeQuestionType={changeQuestionType}
                annotated={annotatedCardDisplay}
              />
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
              style={{
                backgroundColor: 'white',
                width: 30,
                height: 30,
                borderRadius: 30,
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: bgColor }}>?</Text>
            </View>
          </Pressable>
        </View>

        {showOptions ? (
          <OptionsPage height={height} />
        ) : (
          <>
            {annotatedCard ? (
              <View style={styles.annotated}>
                {/* <AnnotatedCards data={annotatedCard} /> */}
              </View>
            ) : (
              <QuestionHolder
                bgColor={bgColor}
                secondaryColor={secondaryColor}
                questionType={questionType}
                setAnnotatedCard={setAnnotatedCard}
                annotated={annotatedCardDisplay}
              />
            )}
          </>
        )}
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
  },
  button: {
    //for icon cards
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19af59', //#003399
    margin: 4,
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
    width: '90%',
    height: '90%',
  },
})
