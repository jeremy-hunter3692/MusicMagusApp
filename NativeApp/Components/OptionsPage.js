import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
let option = 0
const OptionsPage = ({
  height,
  selectDroneAudio,
  droneOnOff,
  changeQuestionType,
}) => {
  const [droneOnButton, setDroneOnButton] = useState(true)
  const [droneSound, setDroneSound] = useState(true)
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

  function changeQuestion() {
    console.log('changes press', option)
    option = option >= 3 ? 0 : option + 1
    console.log(option)
    changeQuestionType(option)
  }

  return (
    <>
      <View style={{ ...styles.options, height: boxHeight }}>
        <Pressable onPress={droneSoundChange}>
          <Text>Change Drone</Text>
          <Text> {droneSound ? 'Double Bass' : 'Synth'} </Text>
        </Pressable>
      </View>
      <View style={{ ...styles.options, height: boxHeight }}>
        <Pressable onPress={droneSwitch}>
          <Text>Drone Off/On</Text>
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
        <Pressable onPress={changeQuestion}>
          <Text>Change Question</Text>
        </Pressable>
      </View>
    </>
  )
}

export default OptionsPage
const circleSize = 50
const styles = StyleSheet.create({
  options: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 1,
    margin: 1,
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    // Android Elevation
    elevation: 5,
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
})
