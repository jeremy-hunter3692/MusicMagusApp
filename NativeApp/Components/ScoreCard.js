import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { returnScoreText } from '../functions/functions.js'
import { useGameContext, useUpdateGameContext } from './GameContext.js'
import ThemeContext from './ThemeContext.js'

const ScoreCard = ({ skip }) => {
  const { userScore, scoreCardDisplay } = useGameContext()
  const { skipQuestion, resetForNewGame } = useUpdateGameContext()
  const {
    font: { fontScale },
    cardSize,
  } = useContext(ThemeContext)

  const fontSize =
    typeof fontScale === 'number' && !isNaN(fontScale)
      ? Math.ceil(fontScale)
      : 8
  const styles = StyleSheet.create({

    hiddenContainer: {
      padding: 5,
      //This Three for margin and height and width is to match with images. TO DO: replace with a prop
      margin: 3,
      height: cardSize.cardHeight - 4,
      width: cardSize.cardWidth - 4,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    scoreText: {
      flexDirection: 'column',
      maxWidth: '100%',
      fontWeight: 'bold',
      justifyContent: 'flex-end',

      alignSelf: 'center',
      color: 'black',
      fontSize: Math.ceil(fontSize * 0.8),
    },
    quoteText: {
      maxWidth: '100%',
      fontWeight: '100',
      fontStyle: 'italic',
      justifyContent: 'center',
      alignSelf: 'center',
      color: 'black',
      fontSize: Math.ceil(fontSize * 0.7),
    },
    buttonText: {
      textAlign: 'center',
      color: 'black',
      alignSelf: 'center',
      fontSize: Math.ceil(fontSize * 0.8),
    },
  })

  return (
    <View
      style={[
        styles.hiddenContainer,
        (skip || scoreCardDisplay) && {
          backgroundColor: 'white', //rgba(255, 255, 255, 0.7)',
          borderColor: 'white',
          borderRadius: 6,
          borderWidth: 0.5,
        },
      ]}
    >
      {skip ? (
        <Pressable onPress={() => skipQuestion()}>
          <Text style={styles.buttonText}>Skip Question?</Text>
        </Pressable>
      ) : scoreCardDisplay ? (
        <>
          <Text style={styles.scoreText}>{userScore + '/12'}</Text>
          <Text style={styles.quoteText}>{returnScoreText(userScore)}</Text>
          <Pressable onPress={() => resetForNewGame()}>
            <Text style={styles.buttonText}>New Round?</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  )
}

export default ScoreCard
