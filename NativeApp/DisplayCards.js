import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import CardButton from './CardButton.js'


const DisplayCards = ({ userAnswerSetter, cardsArray }) => {

  function setAnswer(inpt) {
    userAnswerSetter(inpt)
  }

  return (
    <>
      <View style={styles.imgCont}>
        {cardsArray?.map((x) => {
          return (
            <TouchableOpacity onPress={setAnswer}>
              <CardButton onPress={setAnswer} data={x.name} source={x.imgSrc} />
            </TouchableOpacity>
          ) //<Button onPress={setAnswer} data={x.name} title={x.name} />
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
