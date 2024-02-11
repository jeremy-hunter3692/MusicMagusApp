import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import CardButton from './CardButton.js'

const DisplayCardsGrid = ({ userAnswerSetter, cardsArray }) => {
  function setAnswer(inpt) {
    console.log('set', inpt)
    userAnswerSetter(inpt)
  }

  const firstHalfArray = cardsArray.slice(0, cardsArray.length / 2)
  const secondHalfArray = cardsArray.slice(
    cardsArray.length / 2,
    cardsArray.length
  )

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imgCont}>
          {firstHalfArray?.map((x) => {
            return (
              <TouchableOpacity onPress={setAnswer}>
                <CardButton
                  onPress={setAnswer}
                  data={x.name}
                  source={x.imgSrc}
                />
              </TouchableOpacity>
            ) //<Button onPress={setAnswer} data={x.name} title={x.name} />
          })}
        </View>
        <View style={styles.imgCont}>
          {secondHalfArray?.map((x) => {
            return (
              <TouchableOpacity onPress={setAnswer}>
                <CardButton
                  onPress={setAnswer}
                  data={x.name}
                  source={x.imgSrc}
                />
              </TouchableOpacity>
            ) //<Button onPress={setAnswer} data={x.name} title={x.name} />
          })}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    flexDirection: 'column',
  },
  imgCont: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 0,

    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 5,
    padding: 5,
  },
})
export default DisplayCardsGrid
