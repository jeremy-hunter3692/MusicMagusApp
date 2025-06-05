import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { returnScoreText } from '../functions/functions.js'
import { useGameContext, useUpdateGameContext } from './CardsContext.js'
import ThemeContext from './ThemeContext.js'

const ScoreCard = ({}) => {
  const { skip, userScore } = useGameContext()
  const { skipQuestion, resetForNewGame } = useUpdateGameContext()
  const { fontScale } = useContext(ThemeContext)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
    },
    scoreText: {
      flexDirection: 'column',
      maxWidth: '%100',
      fontWeight: 'bold',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      color: 'black',
      fontSize: fontScale,
    },
    quoteText: {
      maxWidth: '%100',
      fontWeight: 5,
      fontStyle: 'italic',
      justifyContent: 'center',
      alignSelf: 'center',
      color: 'black',
      fontSize: fontScale,
    },
    buttonText: {
      justifyContent: 'center',
      color: 'black',
      alignSelf: 'center',
      fontSize: fontScale * 0.8,
    },
  })

  return (
    <>
      {skip ? (
        <Pressable onPress={() => skipQuestion()}>
          <Text style={styles.buttonText}>Skip Question?</Text>
        </Pressable>
      ) : (
        <>
          <Text style={styles.scoreText}>{userScore + '/12'}</Text>
          <Text style={styles.quoteText}>{returnScoreText(userScore)}</Text>
          <Pressable onPress={() => resetForNewGame()}>
            <Text style={styles.buttonText}>New Round?</Text>
          </Pressable>
        </>
      )}
    </>
  )
}

export default ScoreCard
