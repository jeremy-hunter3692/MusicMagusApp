import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
let option = 0
const circleSize = 50
const optionsPadding = 20
const OptionsPage = ({
  height,
  selectDroneAudio,
  droneOnOff,
  theme,
  changeTheme,
  randomQuestionsSetter,
  isAnimated,
  setAnimations,
  setShowOptions,
}) => {
  const [droneOnButton, setDroneOnButton] = useState(true)
  const [droneSound, setDroneSound] = useState(true)
  const [isRandomQuestion, setRandomQuestions] = useState(false)
  console.log('thg', theme)

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
      width: '%100',
    },
    options: {
      backgroundColor: 'white',
      borderColor: theme.primaryColor,
      borderWidth: 5,
      alignItems: 'center',
      flexDirection: 'row',
      padding: 5,
      margin: 3,
    },
    droneOn: {
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: circleSize,
      height: circleSize,
      borderColor: 'black',
      borderRadius: circleSize,
      margin: 5,
    },
    droneOff: {
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
    backTextCont: {
      alignSelf: 'flex-end',

      color: theme.secondaryColor,
      fontWeight: 'bold',
      margin: 4,
      borderColor: 'white',
      borderWidth: 2,
    },
    backText: {
      alignSelf: 'flex-end',
      color: 'white',
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
  // console.log({ droneSound })
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
        <View style={{ ...styles.options, height: boxHeight }}>
          <Pressable onPress={droneSoundChange}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headerText}>Drone Sound:</Text>
              <Text> {droneSound ? 'Double Bass' : 'Synth'} </Text>
            </View>
          </Pressable>
        </View>
        <View style={{ ...styles.options, height: boxHeight }}>
          <Pressable onPress={droneSwitch}>
            <Text style={styles.headerText}>Drone On/Off:</Text>
          </Pressable>
          {droneOnButton ? (
            <View style={styles.droneOn}>
              <Text>On</Text>
            </View>
          ) : (
            <View style={styles.droneOff}>
              <Text style={{ color: 'white' }}>Off</Text>
            </View>
          )}
        </View>
        <View style={{ ...styles.options, height: boxHeight }}>
          <Pressable onPress={changeTheme}>
            <Text style={styles.headerText}>Change Theme</Text>
          </Pressable>
        </View>
        <View style={{ ...styles.options, height: boxHeight }}>
          <Pressable onPress={setRandom}>
            <Text style={styles.headerText}>Randomised Questions: </Text>
            <Text style={styles.headerText}>
              {isRandomQuestion ? 'on' : 'off'}
            </Text>
          </Pressable>
        </View>
        <View style={{ ...styles.options, height: boxHeight }}>
          <Pressable onPress={setAnimated}>
            <Text style={styles.headerText}>Animations: </Text>
            <Text style={styles.headerText}>{isAnimated ? 'on' : 'off'}</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}

export default OptionsPage
