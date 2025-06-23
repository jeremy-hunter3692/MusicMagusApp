import React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const blankCard = require('../assets/blankcard.png')

const SplashScreen = () => {
  const flipCardannimation = useSharedValue(0)
  return (
    <View style={styles.container}>
      <Image source={blankCard} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#4F8EF7',
  },
})

export default SplashScreen
