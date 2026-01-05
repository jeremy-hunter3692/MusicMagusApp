import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const Button = ({ onPress, title, data }) => {
  return (
    <TouchableOpacity onPress={() => onPress(data)} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default Button
