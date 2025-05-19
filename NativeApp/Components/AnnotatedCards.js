import React from 'react'
import { Image, Text, View, StyleSheet, Pressable } from 'react-native'
import { getDataForAnnotated } from '../functions/functions.js'

const AnnotatedCards = ({ data, setAnnotated, bgColor }) => {
  //TO DO font zise for this
  const fontSize = 25
  const { bottomRText, bottomLText, topRtext, topLText } =
    getDataForAnnotated(data)
  console.log('ano', data)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      padding: 20,
      flexDirection: 'row',
      height: '100%',
      width: '100%',
    },
    textMain: {
      color: 'white',
      fontSize: fontSize,
      alignItems: 'center',
      margin: 2,
      padding: 5,
    },
    column: {
      flex: 1, // Each column takes equal space
      justifyContent: 'space-between',
      // paddingHorizontal: 10,
    },
    imageColumn: {
      flex: 1.5, // Image column slightly larger if needed
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  })

  return (
    <View style={styles.container}>
      {/* First column with text */}
      <View style={styles.column}>
        <Text style={styles.textMain}>{topLText}</Text>
        <Text style={styles.textMain}>{bottomLText}</Text>
      </View>

      <View style={styles.imageColumn}>
        <Image
          source={data?.value.imgSrc}
          testID="image"
          style={styles.image}
        />
      </View>

      <View style={styles.column}>
        <Pressable
          style={{ alignItems: 'center', padding: 5 }}
          onPress={() => setAnnotated()}
        >
          <Text
            style={[
              styles.textMain,
              {
                backgroundColor: '#D3D3D3',
                borderRadius: 10,
                padding: 5,
                flex: 1,
              },
            ]}
          >
            Back
            {topRtext}
          </Text>
        </Pressable>
        <Text style={styles.textMain}>{bottomRText}</Text>
      </View>
    </View>
  )
}

export default AnnotatedCards
