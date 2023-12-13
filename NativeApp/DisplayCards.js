import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { intervals } from './Intervals.js'
import CardButton from './CardButton.js'
import Button from './Button.js'

const DisplayCards = ({ userAnswerSetter, cardsArray }) => {
  console.log(cardsArray)
  function setAnswer(inpt) {
    userAnswerSetter(inpt)
  }

  return (
    <>
      <View style={styles.imgCont}>
        {cardsArray.map((x, idx) => {
          return (
            <TouchableOpacity onPress={setAnswer}>
              <CardButton onPress={setAnswer} data={x.name} source={x.imgSrc} />
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
export default DisplayCards
