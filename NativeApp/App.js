import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { keys, getIntervalNo } from './KeyCards'

// const displayingKeys = printAccidentalNos()
// console.log(keys)
function howManyCircles(array) {
  console.log(array)
  return array.map((x) =>
    x === true ? <View style={styles.circleFull}></View> : console.log(x)
  )
}

function displayCirclesHex(array) {
  return array.map((x, idx) => fillCricleBool(x, idx))
}

function fillCricleBool(inpt, key) {
  return inpt ? (
    <View key={key} style={styles.circleFull}></View>
  ) : (
    <View key={key} style={styles.circleOutline}></View>
  )
}

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>
          {`Number of Accidentals in each Key\n`}
          {keys.map((x, idx) => (
            <>
              <Text key={idx}>
                {`${x.name} :   ${getIntervalNo(
                  x.intervals,
                  true
                )} Accidentals\n`}
                {/* {displayCirclesHex(x.intervals)} */}
                {'\n'}
              </Text>
              <View style={styles.hexContainer}>
                <View style={styles.outColumn}>
                  {fillCricleBool(x.intervals[5])}
                  {fillCricleBool(x.intervals[4])}
                </View>
                <View style={styles.column}>
                  {fillCricleBool(x.intervals[6])}
                  {fillCricleBool(x.intervals[0])}
                  {fillCricleBool(x.intervals[3])}
                </View>
                <View style={styles.outColumn}>
                  {fillCricleBool(x.intervals[1])}
                  {fillCricleBool(x.intervals[2])}
                </View>
              </View>
              {'\n'}
              {'\n'}
            </>
          ))}
        </Text>
        <StatusBar style="auto" />
      </View>
    </>
  )
}

const bgColor = 'white'

const styles = StyleSheet.create({
  hexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: { padding: 0, alignItems: 'center' },
  outColumn: { padding: 0, alignItems: 'center', marginVertical: 5 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Going to need to change margin and probably other stuff as a variable to keep hex intact
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
    backgroundColor: bgColor,
  },
})
