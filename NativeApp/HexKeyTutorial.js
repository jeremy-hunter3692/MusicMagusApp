import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

const bgcolor = 'white'

const HexKeyTutorial = ({ musicKey }) => {
  return (
    <>
      <View style={styles.hexContainer}>
        <View style={styles.outColumn}>
          <View style={styles.circleOutline}>
            <Text>6</Text>
          </View>

          <View style={styles.circleOutline}>
            {' '}
            <Text>5</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.circleOutline}>
            {' '}
            <Text>7</Text>
          </View>

          <View style={styles.circleOutline}>
            <Text>Root</Text>
          </View>
          <View style={styles.circleOutline}>
            {' '}
            <Text>4</Text>
          </View>
        </View>
        <View style={styles.outColumn}>
          <View style={styles.circleOutline}>
            {' '}
            <Text>2</Text>
          </View>
          <View style={styles.circleOutline}>
            {' '}
            <Text>3</Text>
          </View>
        </View>
      </View>
    </>
  )
}

const size = 100

const styles = StyleSheet.create({
  hexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: { padding: 0, alignItems: 'center' },
  outColumn: { padding: 0, alignItems: 'center', marginVertical: size * 0.5 },
  //going to need to change margin and probably other stuff as a variable to keep hex intact
  circleFull: {
    width: size,
    height: size,
    margin: 0,
    padding: 0,
    borderRadius: size * 0.5, // Half of the width and height to make it a perfect circle
    backgroundColor: 'black',
  },
  circleOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    margin: size * 0.1,
    padding: 0,
    border: 'solid',
    borderColor: 'black',
    borderRadius: size * 0.5, // Half of the width and height to make it a perfect circle
    backgroundColor: 'white',
  },
})

export default HexKeyTutorial
