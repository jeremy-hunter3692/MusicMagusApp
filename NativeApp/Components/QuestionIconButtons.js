import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import QuestionButton from './QuestionButton'
import { useWindowDimensions } from 'react-native'

const QuestionIconButtons = ({ changeQuestionType, annotated, bgColor }) => {
  const [underLine, setUnderline] = useState(1)

  function selectQType(inpt) {
    setUnderline(inpt)
    changeQuestionType(inpt)
  }

  // const keyIcon = require('../assets/KeyIcon.png')
  // const noteIcon = require('../assets/NoteIcon.png')
  // const intervalIcon = require('../assets/IntervalIcon.png')

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => selectQType(1)}>
          <View
            style={{
              backgroundColor: 'yellow',
              borderRadius: 10,
              width: 50,
              height: 50,
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
              width: 50,
              height: 50,
              borderRadius: 50,
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
              width: 50,
              height: 50,
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
                borderTopWidth: 50,
                borderRightWidth: 50,
                borderRightColor: 'transparent',
                borderTopColor: 'transparent',
                borderBottomWidth: 50, // Hypotenuse of the triangle
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
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    //TO DO make this computed with font size?
    marginBottom: 5,
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
export default QuestionIconButtons

//icons as images
{
  /* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: 30,
          height: 30,
          marginRight: 90,
          // backgroundColor: 'black',
        }}
      >
        <Image
          source={keyIcon}
          testID={`image`}
          style={{
            // flex: 1,
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            marginRight: 10,
            resizeMode: 'contain',
          }}
        />
        <Image
          source={intervalIcon}
          testID={`image`}
          style={{
            // flex: 1,
            margin: 0,
            padding: 0,
            width: '110%',
            height: '110%',
            maxHeight: '110%',
            // marginRight: 10,
            resizeMode: 'contain',
          }}
        />
        <Image
          source={noteIcon}
          testID={`image`}
          style={{
            // flex: 1,
            margin: 0,
            padding: 0,
            width: '200%',
            height: '200%',
            maxHeight: '200%',
            // marginRight: 10,
            resizeMode: 'contain',
          }}
        />
      </View> */
}
