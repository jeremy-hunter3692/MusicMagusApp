import React, { useEffect } from 'react'

import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'

const splashImage = require('./assets/iconReplacement.png')

const splashScreen = () => {
  return (
    <View style={[styles.container]}>
      <Image
        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        source={splashImage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default splashScreen
