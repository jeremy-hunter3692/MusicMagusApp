import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { intervals } from './Intervals.js'
console.log('int', intervals)
const DisplayIntervals = () => {
  return (
    <Text>
      {intervals.map((x) => {
        return `|${x.name}: ${x.up ? 'Up   ' : 'down   '}${x.distanceToRoot}|`
      })}
    </Text>
  )
}
export default DisplayIntervals
