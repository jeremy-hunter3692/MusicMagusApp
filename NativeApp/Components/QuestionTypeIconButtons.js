import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const QuestionIconButtons = ({ changeQuestionType, annotated, bgColor }) => {
  const [underLine, setUnderline] = useState(1)
  const { width, height } = useWindowDimensions()
  const iconSize = height / 20


  function selectQType(inpt) {
    setUnderline(inpt)
    changeQuestionType(inpt)
  }

  const styles = StyleSheet.create({
    iconContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: bgColor,
    },
    container: {
      alignItems: 'flex-start',
      backgroundColor: bgColor,
      //TO DO make this computed with font size?
      // marginBottom: 5,
    },
    annotatedText: {
      color: 'white',
      fontWeight: 'bold',
      fontColor: 'white',
    },
    underLine: {
      zIndex: 2,
      borderColor: 'white',
      borderWidth: 2,
    },
    underCombo: { zIndex: 2, backgroundColor: 'transparent', height: 2 },
  })

  return (
    <>
      <View style={styles.iconContainer}>
        <View style={styles.container}>
          <Pressable onPress={() => selectQType(1)}>
            <View
              style={{
                backgroundColor: 'yellow',
                borderRadius: iconSize / 4,
                width: iconSize,
                height: iconSize,
              }}
            ></View>

            <View
              style={[
                styles.underCombo,
                !annotated && underLine === 1 ? styles.underLine : null,
              ]}
            ></View>
          </Pressable>
          {annotated && <Text style={styles.annotatedText}>Key</Text>}
        </View>
        <View style={styles.container}>
          <Pressable onPress={() => selectQType(2)}>
            <View
              style={{
                width: iconSize,
                height: iconSize,
                borderRadius: iconSize,
                backgroundColor: 'green',
              }}
            ></View>

            <View
              style={[
                styles.underCombo,
                !annotated & (underLine === 2) ? styles.underLine : null,
              ]}
            ></View>
          </Pressable>
          {annotated && <Text style={styles.annotatedText}>Interval </Text>}
        </View>
        <View style={styles.container}>
          <Pressable onPress={() => selectQType(3)}>
            <View
              style={{
                width: iconSize,
                height: iconSize,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  padding: 0,
                  // position: 'absolute',
                  // top: -50,
                  borderTopWidth: iconSize,
                  borderRightWidth: iconSize,
                  borderRightColor: 'transparent',
                  borderTopColor: 'transparent',
                  borderBottomWidth: iconSize, // Hypotenuse of the triangle
                  borderBottomColor: 'black',
                }}
              ></View>
            </View>

            <View
              style={[
                styles.underCombo,
                !annotated & (underLine === 3) ? styles.underLine : null,
              ]}
            ></View>
          </Pressable>
          {annotated && <Text style={styles.annotatedText}> Note</Text>}
        </View>
      </View>
    </>
  )
}

export default QuestionIconButtons
