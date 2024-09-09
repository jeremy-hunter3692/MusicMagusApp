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
  const [questionType, setQuestionType] = useState('Interval')
  const [annotatedCardDisplay, setAnnotatedCardDisplay] = useState(false)

  const [start, setStart] = useState(false)

  const { width, height } = useWindowDimensions()

  function getKey(musicKey) {
    setHexKey(musicKey)
  }

  function appLevel(inpt) {
    console.log('TODO-App level', inpt)
  }
  function changeQuestionType(inpt) {
    console.log('change top', inpt)
    let type = inpt === 1 ? 'Interval' : inpt === 2 ? 'Note' : 'Key'
    setQuestionType(type)
  }

  const bgColor = 'purple' //'#060'
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 0,
          maxHeight: height,
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
            backgroundColor: '#19af59',
            justifyContent: 'flex-end',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <QuestionIconButtons changeQuestionType={changeQuestionType} />
          <Pressable onPress={() => setAnnotatedCardDisplay((x) => !x)}>
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
              <Text style={{ color: 'purple' }}>?</Text>
            </View>
          </Pressable>
        </View>

        {annotatedCard ? (
          <>
            <AnnotatedCards data={annotatedCard} />
            <Pressable onPress={() => setDisplayOptions((x) => !x)}>
              <Text style={{ color: 'white' }}>
                {displayOptions ? 'Back' : 'Options'}
              </Text>
            </Pressable>
          </>
        ) : (
          <QuestionHolder
            questionType={questionType}
            setAnnotatedCard={setAnnotatedCard}
            annotatedCard={annotatedCard}
          />
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
})
