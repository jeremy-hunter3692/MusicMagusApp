import React, { useState } from 'react'
import { Animated, Pressable, View, Text, StyleSheet } from 'react-native'
import PlaySound from './SingleNotePlayer'

const CircleTheorySingle = ({
  text,

  circle,
  textStyle,
  positions,
  selectedBool,
  data,
}) => {
  const [playState, setPlayState] = useState(false)
  const [note, setNotes] = useState(null)
  //TODOOwas for old problem with Root note Z index might not need
  const fixedCircle = { ...circle[0], ...circle[1] }
  function cirlcePress() {
    setNotes(data)
  }

  return (
    <View>
      <PlaySound inpt={note} />
      <Animated.View
        key={text}
        style={[
          fixedCircle,
          {
            transform: [
              { translateX: positions[text].x },
              { translateY: positions[text].y },
            ],
          },
          selectedBool && styles.shadowBox,
        ]}
      >
        <Pressable onPress={cirlcePress} style={circle}>
          <Text style={textStyle}>{text}</Text>
        </Pressable>
        {/* <View> TO DOO this was for checking source prop passing correctlty
          <Text style={{ color: 'white' }}>
            {'           :' + source?.name}
          </Text>
        </View> */}
      </Animated.View>
    </View>
  )
}

export default CircleTheorySingle

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: 'white', // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Offset for the shadow
    shadowOpacity: 0.5, // Opacity of the shadow
    shadowRadius: 0.84, // Blur radius of the shadow
    elevation: 5,
  },
})
