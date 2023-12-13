import { noteNames } from './NoteNames'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import CardButton from './CardButton'



const DisplayNoteNames = ({ userAnswerSetter }) => {
  function setAnswer(inpt) {
    userAnswerSetter()
    console.log('card', inpt)
  }

  return (
    <>
      <View style={styles.imgCont}>
        {noteNames.map((x, idx) => {
          return (
            <>
              <Text> {x.name}</Text>
              <TouchableOpacity onPress={setAnswer}>
                <CardButton
                  onPress={setAnswer}
                  data={x.name}
                  source={noteImgs[idx]}
                />
              </TouchableOpacity>
            </>
          )
        })}
      </View>
    </>
  )
}

export default DisplayNoteNames
const styles = StyleSheet.create({
  imgCont: {
    flex: 1,
    width: '%50',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
