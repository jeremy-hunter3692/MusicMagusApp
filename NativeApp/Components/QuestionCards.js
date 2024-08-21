import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import CardButton from './CardButton'

const blankCard = require('../assets/blankcard.png')

const QuestionCards = ({
  firstCard,
  secondCard,
  findNoteFunction,
  resultDisplay,
  answer,
  cardSize,
  rootCardPress,
  answerCardOnPress,
}) => {
  function droneSetter() {
    rootCardPress()
  }
  console.log({ cardSize })

  return (
    <>
      <View style={styles.questionCardsCont}>
        <CardButton
          cardSize={cardSize}
          data={firstCard}
          source={firstCard.value.imgSrc}
          style={questionCards}
          onPress={droneSetter}
        />
        <CardButton
          cardSize={cardSize}
          data={secondCard}
          root={firstCard}
          source={secondCard?.value.imgSrc}
          style={questionCards}
          answer={answer}
          onPress={answerCardOnPress}
          findAudioSourceFunction={findNoteFunction}
          autoPlay={true}
        />
        {resultDisplay ? (
          <CardButton
            cardSize={cardSize}
            data={answer?.name}
            source={answer?.imgSrc}
            style={questionCards}
          />
        ) : (
          <CardButton
            cardSize={cardSize}
            source={blankCard}
            style={questionCards}
          />
        )}
      </View>
    </>
  )
}

export default QuestionCards

const questionCards = {
  height: 100,
  width: 100,
}

const styles = StyleSheet.create({
  questionCardsCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 0,
    padding: 0,
  },
})
