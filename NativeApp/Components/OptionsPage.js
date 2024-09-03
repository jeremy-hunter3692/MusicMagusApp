import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const OptionsPage = ({selectDroneAudio,}) => {

  




  return(<>
  <Text>OPTIONS:</Text>
  <Pressable onPress={selectDroneAudio()}></Pressable>
  <Pressable onPress={droneOnOff()}></Pressable>
  {/* <Pressable onPress={}></Pressable>
  <Pressable onPress={}></Pressable>
  <Pressable onPress={}></Pressable>
  <Pressable onPress={}></Pressable> */}
  
  </>


  ) 
}

export default OptionsPage
