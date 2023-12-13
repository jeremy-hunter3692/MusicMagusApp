import { noteNames } from './NoteNames'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import CardButton from './CardButton'

const noteImgs = [
  require('./assets/noteCards/C.png'),
  require('./assets/noteCards/Db.png'),
  require('./assets/noteCards/D.png'),
  require('./assets/noteCards/Eb.png'),
  require('./assets/noteCards/E.png'),
  require('./assets/noteCards/F.png'),
  require('./assets/noteCards/Gb.png'),
  require('./assets/noteCards/G.png'),
  require('./assets/noteCards/Ab.png'),
  require('./assets/noteCards/A.png'),
  require('./assets/noteCards/Bb.png'),
  require('./assets/noteCards/B.png'),
]

function setAnswer(inpt) {
  console.log('card', inpt)
}

const DisplayNoteNames = () => {
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
