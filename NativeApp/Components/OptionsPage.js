import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState, useContext } from 'react'
import ThemeContext from './ThemeContext.js'
import Animated from 'react-native-reanimated'

const OptionsPage = ({
  selectDroneAudio,
  droneOnOff,
  changeTheme,
  randomQuestionsSetter,

  setAnimations,
  setShowOptions,
  buttonTheme,
}) => {
  const [droneOnButton, setDroneOnButton] = useState(true)
  const [droneSound, setDroneSound] = useState(true)
  const [isRandomQuestion, setRandomQuestions] = useState(false)
  const {
    dimensions: { height, width },
    theme,
    font,
    animationsOn,
  } = useContext(ThemeContext)

  const circleSize = height / 20
  const optionsPadding = height / 30
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: optionsPadding,
      backgroundColor: theme.secondaryColor,
    },
    headerText: {
      fontWeight: 'bold',
    },
    line: {
      backgroundColor: theme.primaryColor,
      height: 1,
      margin: 10,
      width: '100%',
    },
    options: buttonTheme,
    // {
    //   backgroundColor: 'white',
    //   borderColor: theme.primaryColor,
    //   borderWidth: 5,
    //   alignItems: 'center',
    //   flexDirection: 'row',
    //   padding: 5,
    //   margin: 3,
    // },
    on: {
      backgroundColor: 'black',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: circleSize,
      height: circleSize,
      borderColor: 'black',
      borderRadius: circleSize,
      margin: 5,
    },
    off: {
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: circleSize,
      height: circleSize,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: circleSize,
      margin: 5,
    },
    backTextCont: {
      alignSelf: 'flex-end',
      color: theme.secondaryColor,
      fontWeight: 'bold',
      fontSize: font.fontSize,
      margin: 4,
      borderColor: 'white',
      borderWidth: 2,
    },
    backText: {
      alignSelf: 'flex-end',
      color: 'white',
      fontSize: font.fontSize,
      fontWeight: 'bold',
      margin: 5,
    },
  })

  function setAnimated() {
    setAnimations()
  }

  function setRandom() {
    setRandomQuestions((x) => (x = !x))
    randomQuestionsSetter()
  }
  const boxHeight = height * 0.1

  function droneSwitch() {
    setDroneOnButton((x) => !x)
    droneOnOff()
  }
  function droneSoundChange() {
    setDroneSound((x) => !x)
    selectDroneAudio()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.backTextCont}>
          <Pressable onPress={() => setShowOptions()}>
            <Text style={styles.backText}> Back </Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
        <View style={[styles.options, { height: boxHeight }]}>
          <Pressable onPress={droneSoundChange}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headerText}>Drone Sound:</Text>
              <Text> {droneSound ? 'Double Bass' : 'Synth'} </Text>
            </View>
          </Pressable>
        </View>
        <View style={[styles.options, { height: boxHeight }]}>
          <Text style={styles.headerText}>Drone On/Off:</Text>
          <Pressable onPress={droneSwitch}>
            {droneOnButton ? (
              <View style={styles.on}>
                <Text style={{ color: 'white' }}>On</Text>
              </View>
            ) : (
              <View style={styles.off}>
                <Text>Off</Text>
              </View>
            )}
          </Pressable>
        </View>
        <View style={[styles.options, { height: boxHeight }]}>
          <Text style={styles.headerText}>Change Theme</Text>
          <Pressable onPress={changeTheme}>
            {theme.primaryColor === 'purple' ? (
              <View style={styles.on}>
                <Text style={{ color: 'white' }}>Dark</Text>
              </View>
            ) : (
              <View style={styles.off}>
                <Text>Light</Text>
              </View>
            )}
          </Pressable>
        </View>
        <View style={[styles.options, { height: boxHeight }]}>
          <Text style={styles.headerText}>Randomised Questions: </Text>
          <Pressable onPress={setRandom}>
            {isRandomQuestion ? (
              <View style={styles.on}>
                <Text style={{ color: 'white' }}>On</Text>
              </View>
            ) : (
              <View style={styles.off}>
                <Text>Off</Text>
              </View>
            )}
          </Pressable>
        </View>
        <View style={[styles.options, { height: boxHeight }]}>
          <Text style={styles.headerText}>Animations: </Text>
          <Pressable onPress={setAnimated}>
            {animationsOn ? (
              <View style={styles.on}>
                <Text style={{ color: 'white' }}>On</Text>
              </View>
            ) : (
              <View style={styles.off}>
                <Text>Off</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </>
  )
}

export default OptionsPage
