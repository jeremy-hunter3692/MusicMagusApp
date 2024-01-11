import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'

function fillCricleBool(inpt, key) {
  return inpt ? (
    <View key={key} style={styles.circleFull}></View>
  ) : (
    <View key={key} style={styles.circleOutline}></View>
  )
}
const bgcolor = 'white'

const HexKey = ({ musicKey }) => {
  return (
    <>
      <View style={styles.hexContainer}>
        <View style={styles.outColumn}>
          {fillCricleBool(musicKey?.intervals[5])}
          {fillCricleBool(musicKey?.intervals[4])}
        </View>
        <View style={styles.column}>
          {fillCricleBool(musicKey?.intervals[6])}
          {fillCricleBool(musicKey?.intervals[0])}
          {fillCricleBool(musicKey?.intervals[3])}
        </View>
        <View style={styles.outColumn}>
          {fillCricleBool(musicKey?.intervals[1])}
          {fillCricleBool(musicKey?.intervals[2])}
        </View>
      </View>
      <Text>{`${getIntervalNo(musicKey.intervals, true)} Accidentals\n`}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  hexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: { padding: 0, alignItems: 'center' },
  outColumn: { padding: 0, alignItems: 'center', marginVertical: 5 },
  //going to need to change margin and probably other stuff as a variable to keep hex intact
  circleFull: {
    width: 10,
    height: 10,
    margin: 0,
    padding: 0,
    borderRadius: 5, // Half of the width and height to make it a perfect circle
    backgroundColor: 'black',
  },
  circleOutline: {
    width: 10,
    height: 10,
    margin: 0,
    padding: 0,
    border: 'solid',
    borderColor: 'black',
    borderRadius: 5, // Half of the width and height to make it a perfect circle
    backgroundColor: 'white',
  },
})

export default HexKey
