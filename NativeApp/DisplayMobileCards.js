import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CardButton from './CardButton.js'

const DisplayMobileCards = ({ userAnswerSetter, cardsArray }) => {
  const [selected, setSelected] = useState(null)
  function setAnswer(inpt) {
    setSelected((prevSelected) => (prevSelected === inpt ? null : inpt))
    userAnswerSetter(inpt.name)
  }
  console.log('sel', selected)
  return (
    <>
      <View style={styles.imgCont}>
        {selected ? (
          <CardButton
            data={selected}
            source={selected.imgSrc}
            position={styles.selectedCard}
          />
        ) : (
          console.log('no')
        )}
        {cardsArray?.map((x, idx) => {
          return (
            <TouchableOpacity key={idx} onPress={() => setAnswer(x)}>
              {x.name === selected?.name ? (
                <View key={idx}>
                  {console.log('if', x.name, selected.name)}
                  <CardButton
                    onPress={setAnswer}
                    data={x}
                    source={x.imgSrc}
                    position={{ ...styles.card, top: idx * 25, zIndex: 10 }}
                  />
                </View>
              ) : (
                <View key={idx}>
                  <CardButton
                    onPress={setAnswer}
                    data={x}
                    source={x.imgSrc}
                    position={{ ...styles.card, top: idx * 25, zIndex: 0 }}
                  />
                </View>
              )}
            </TouchableOpacity>
          )
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
    position: 'absolute',
    width: 100,
    height: 150,
    margin: 10,
    padding: 5,
  },
  selectedCard: {
    position: 'absolute',
    left: 150,
    width: 100,
    height: 150,
    margin: 10,
    padding: 5,
    zIndex: 1,
  },
})
export default DisplayMobileCards
