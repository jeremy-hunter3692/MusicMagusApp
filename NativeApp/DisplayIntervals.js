import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { intervals } from './Intervals.js'
import Button from './Button.js'

const DisplayIntervals = ({ userAnswerSetter }) => {
  function setAnswer(inpt) {
    userAnswerSetter(inpt)
    console.log('at disaply', inpt)
  }
  return (
    <Text>
      {intervals.map((x) => {
        return <Button onPress={setAnswer} data={x.name} title={x.name} />
      })}
    </Text>
  )
}
export default DisplayIntervals
