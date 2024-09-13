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
  setAnnotatedCard,
  annotated,
}) => {
  function droneSetter() {
    rootCardPress()
  }

  return (
    <>
      <View style={styles.questionCardsCont}>
        <CardButton
          cardSize={cardSize}
          data={firstCard}
          source={firstCard.value.imgSrc}
          style={questionCards}
          onPress={droneSetter}
          annotated={annotated}
          setAnnotatedCard={setAnnotatedCard}
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
          annotated={annotated}
          setAnnotatedCard={setAnnotatedCard}
          autoPlay={true}
        />

        {/* {resultDisplay ? ( */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <CardButton
            cardSize={cardSize}
            data={answer?.name}
            source={answer?.imgSrc}
            style={questionCards}
            annotated={annotated}
            setAnnotatedCard={setAnnotatedCard}
          />{' '}
        </Animated.View>
        {/* ) : ( */}
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          <CardButton
            cardSize={cardSize}
            source={blankCard}
            style={questionCards}
          />
          {/* )} */}{' '}
        </Animated.View>
      </View>
    </>
  )
}

export default QuestionCards

const questionCards = {
  // height: 100,
  // width: 100,
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
