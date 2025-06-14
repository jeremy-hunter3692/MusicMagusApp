import React, { useContext, useState } from 'react'
import { Image, Text, View, StyleSheet, Pressable } from 'react-native'
import { getDataForAnnotated } from '../functions/functions.js'
import AnnotatedContext from './AnnotatedContext.js'
import ThemeContext from './ThemeContext.js'
import { ScrollView } from 'react-native-gesture-handler'

const AnnotatedCard = () => {
  const [zoomInText, setZoomInText] = useState(null)
  const { annotatedCard, setAnnotatedMode, annotatedBackGroundColor } =
    useContext(AnnotatedContext)
  const { font, theme } = useContext(ThemeContext)
  const { bottomRText, bottomLText, topRtext, topLText } =
    getDataForAnnotated(annotatedCard)
  const fontColor = 'white'
  const bgColor = annotatedBackGroundColor //theme.primaryColor
  const fontSize =
    typeof font.fontScale === 'number' && !isNaN(font.fontScale)
      ? font.fontScale * 1.5
      : 16
  console.log('font', fontSize, font.fontScale)
  const styles = StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      padding: 20,
      flexDirection: 'row',
      height: '100%',
      width: '100%',
    },
    textMain: {
      color: fontColor,
      fontSize: fontSize,
      alignItems: 'center',
    },
    textBoxesTop: {
      justifyContent: 'flex-start',
    },
    textBoxesBottom: {
      border: 3,
      justifyContent: 'flex-end',
    },
    column: {
      flex: 1,
      justifyContent: 'space-between',
      width: '90%',
      height: '90%',
    },
    imageColumn: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
    },
    zoomInTextCont: {
      flex: 1,
      backgroundColor: annotatedBackGroundColor,
      borderColor: 'blue',
      borderWidth: 2,
      color: fontColor,
      fontSize: fontSize * 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    zoomInTextView: {
      flex: 1,
      borderColor: 'red',
      borderWidth: 1,
      backgroundColor: theme.primaryColor,
      shadowRadius: 10,
      justifyContent: 'center',
      alignContent: 'center',
    },
    zoomInText: {
      flex: 1,
      borderColor: 'white',
      borderWidth: 1,
      color: fontColor,
      fontSize: fontSize * 1.5,
    },
  })
  return zoomInText ? (
    <Pressable
      style={styles.zoomInTextCont}
      onPress={() => setZoomInText(false)}
    >
      <View style={styles.zoomInTextView}>
        <Text style={styles.zoomInText}>{zoomInText}</Text>
      </View>
    </Pressable>
  ) : (
    <View style={styles.container}>
      <View style={styles.column}>
        <Pressable onPress={() => setZoomInText(topLText)}>
          <View style={styles.textBoxesTop}>
            <Text style={styles.textMain}>{topLText}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setZoomInText(bottomLText)}>
          <View style={styles.textBoxesBottom}>
            <Text style={styles.textMain}>{bottomLText}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.imageColumn}>
        <Image
          source={annotatedCard?.value?.imgSrc}
          testID="image"
          style={styles.image}
        />
      </View>
      <View style={styles.column}>
        <View style={styles.textBoxesTop}>
          <Pressable
            style={{ alignItems: 'center', padding: 5 }}
            onPress={setAnnotatedMode}
          >
            <Text
              style={[
                styles.textMain,
                {
                  color: bgColor,
                  backgroundColor: '#D3D3D3',
                  borderRadius: 10,
                  padding: 5,
                },
              ]}
            >
              Back
              {topRtext}
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={() => setZoomInText(bottomRText)}>
          <View style={styles.textBoxesBottom}>
            <Text style={styles.textMain}>{bottomRText}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default AnnotatedCard
