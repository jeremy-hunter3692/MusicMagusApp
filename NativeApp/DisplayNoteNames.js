import { noteNames } from './NoteNames'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

const DisplayNoteNames = () => {
  return <Text>{noteNames.map((x) => `(${x.name} /${x.imgSrc})`)}</Text>
}
export default DisplayNoteNames
