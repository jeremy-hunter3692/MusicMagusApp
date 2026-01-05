import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

const OptionsItemBox = ({ height }) => {}
return (
  <>
    <View style={{ ...styles.options, height: boxHeight }}>
      <Pressable onPress={droneSoundChange}>
        <Text>Change Drone</Text>
        <Text> {droneSound ? 'Double Bass' : 'Synth'} </Text>
      </Pressable>
    </View>
    <View style={styles.options}>
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
    <View style={styles.options}>
      <Pressable onPress={changeQuestion}>
        <Text>Change Question</Text>
      </Pressable>
    </View>
  </>
)

export default OptionsItemBox
