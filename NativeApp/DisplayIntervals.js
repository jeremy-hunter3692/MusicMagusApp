import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { intervals } from './Intervals.js'
import CardButton from './CardButton.js'
import Button from './Button.js'

const intervalImgs = [
  require('./assets/intervalCards/1.png'),
  require('./assets/intervalCards/b2.png'),
  require('./assets/intervalCards/2.png'),
  require('./assets/intervalCards/b3.png'),
  require('./assets/intervalCards/3.png'),
  require('./assets/intervalCards/4.png'),
  require('./assets/intervalCards/b5.png'),
  require('./assets/intervalCards/5.png'),
  require('./assets/intervalCards/b6.png'),
  require('./assets/intervalCards/6.png'),
  require('./assets/intervalCards/b7.png'),
  require('./assets/intervalCards/7.png'),
]

const DisplayIntervals = ({ userAnswerSetter }) => {
  function setAnswer(inpt) {
    userAnswerSetter(inpt)
  }

  return (
    <>
      <View style={styles.imgCont}>
        {intervals.map((x, idx) => {
          return (
            <TouchableOpacity onPress={setAnswer}>
              <CardButton
                onPress={setAnswer}
                data={x.name}
                source={intervalImgs[idx]}
              />
            </TouchableOpacity>
          ) //<Button onPress={setAnswer} data={x.name} titl4e={x.name} />
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imgCont: {
    flex: 1,
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    padding: 5,
  },
})
export default DisplayIntervals
