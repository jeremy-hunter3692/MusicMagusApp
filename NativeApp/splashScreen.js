import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

const blankCard = require('../assets/blankcard.png')

const SplashScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#4F8EF7" />
    <Text style={styles.text}>Loading...</Text>
  </View>
)

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
