import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { returnScoreText } from '../functions/functions.js'
import { useGameContext, useUpdateGameContext } from './CardsContext.js'
import ThemeContext from './ThemeContext.js'

const ScoreCard = ({ skip }) => {
  const { userScore, scoreCardDisplay } = useGameContext()
  const { skipQuestion, resetForNewGame } = useUpdateGameContext()
  const { fontScale, cardSize } = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white', //rgba(255, 255, 255, 0.7)',
      //TODOreplace this hardcoded margin
      borderColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      padding: 5,
      //This Three for margin and height and width is to match with images. TO DO: replace with a prop
      margin: 3,
      height: cardSize.cardHeight - 3,
      width: cardSize.cardWidth - 3,
      justifyContent: 'space-around',
      color: 'black',
    },
    hiddenContainer: {
      padding: 5,
      //This Three for margin and height and width is to match with images. TO DO: replace with a prop
      margin: 3,
      height: cardSize.cardHeight - 3,
      width: cardSize.cardWidth - 3,
      justifyContent: 'space-around',
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
    <View
      style={[
        styles.hiddenContainer,
        (skip || scoreCardDisplay) && styles.container,
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
