import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from '../data/KeyCards'

function fillCricleBool(inpt, key) {
  return inpt ? (
    <View key={key} style={styles.circleFull}></View>
  ) : (
    <View key={key} style={styles.circleOutline}></View>
  )
}

const HexKey = ({ musicKey, bgColor }) => {
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
      {/* <Text>{`${getIntervalNo(musicKey.intervals, true)} Accidentals\n`}</Text> */}
    </>
  )
}
const circleSize = 30

const styles = StyleSheet.create({
  hexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  column: { padding: 0, alignItems: 'center' },
  outColumn: {
    padding: 0,
    alignItems: 'center',
    marginVertical: circleSize / 2,
  },
  //going to need to change margin and probably other stuff as a variable to keep hex intact
  circleFull: {
    width: circleSize,
    height: circleSize,
    margin: 0,
    padding: 0,
    borderRadius: circleSize / 2, // Half of the width and height to make it a perfect circle
    backgroundColor: 'black',
  },
  circleOutline: {
    width: circleSize,
    height: circleSize,
    margin: 0,
    padding: 0,
    border: 'solid',
    borderColor: 'black',
    borderRadius: circleSize / 2, // Half of the width and height to make it a perfect circle
    backgroundColor: 'purple', // TO DO PASS THIS AS A PROP POTENTIALLY TO FIT WITH BG COLOR
  },
})

export default HexKey
