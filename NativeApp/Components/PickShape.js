import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const PickShape = ({ questionAB }) => {
  const [aMode, setAMode] = useState(true)

  questionAB(aMode)

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => setAMode((x) => (x = !x))}>
          <View style={styles.triangle}>
            <Text style={{ top: -55, color: 'white' }}>
              {aMode ? 'A' : 'B'}
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderTopWidth: 100,
    borderStyle: 'solid',
    borderRadius: 90,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    // transform: [{ rotate: '180deg' }],
  },
})

export default PickShape
