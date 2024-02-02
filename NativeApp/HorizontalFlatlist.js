import React from 'react'
import { View, FlatList, Text, StyleSheet, Image } from 'react-native'
import CardButton from './CardButton'
import { LinearGradient } from 'expo-linear-gradient'

const HorizontalFlatList = ({ cardsArray, userAnswerSetter }) => {
  // Render item component for the FlatList
  const renderItem = ({ item }) => (
    <CardButton
      source={item.imgSrc}
      resizeMode="contain"
      onPress={setAnswer}
      data={item.name}
      position={styles.item}
    />
  )

  function setAnswer(inpt) {
    console.log('set', inpt)
    userAnswerSetter(inpt)
  }

  const fadeColor = ['rgba(2,255,255,1)', 'transparent']

  return (
    <>
      <View style={styles.sideViews}></View>

      <View style={styles.container}>
        <LinearGradient
          colors={fadeColor}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 1 }}
        />
        <LinearGradient
          colors={fadeColor}
          style={styles.gradientRight}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
        />
        <FlatList
          data={cardsArray}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.sideViews}></View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    height: 170,
    width: 500,
  },
  gradient: {
    position: 'absolute',
    width: 150,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '%60',
    zIndex: 2,
  },
  gradientRight: {
    position: 'absolute',
    width: 150,
    top: 0,
    left: 360,
    right: 0,
    bottom: 0,
    height: '%60',
    zIndex: 2,
  },
  item: {
    borderRadius: 5,
    margin: 5,
    marginTop: 0,
    padding: 0,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 100,
    shadowRadius: 5,
  },
  sideViews: {
    flex: 1,
    // borderColor: 'blue',
    // borderWidth: 5,
    color: 'white',
  },
})

export default HorizontalFlatList
