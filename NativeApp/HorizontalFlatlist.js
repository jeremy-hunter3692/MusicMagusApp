import React from 'react'
import { View, FlatList, Text, StyleSheet, Image } from 'react-native'
import CardButton from './CardButton'

const HorizontalFlatList = ({ cardsArray, userAnswerSetter }) => {
  // Render item component for the FlatList
  const renderItem = ({ item }) => (
    <CardButton
      source={item.imgSrc}
      resizeMode="contain"
      onPress={setAnswer}
      data={item.name}
    />
  )

  function setAnswer(inpt) {
    console.log('set', inpt)
    userAnswerSetter(inpt)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cardsArray}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: 'black',

    height: 100,
    width: 100,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
})

export default HorizontalFlatList
