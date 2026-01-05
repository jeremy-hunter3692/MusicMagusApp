import React, { useState, useEffect } from 'react'
import {
  Animated,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native'
import CircleTheorySingle from './CircleTheorySingle'
import { keys } from '../data/KeyCards'
import { noteAudioSrc } from '../data/NotesAudiosSrc'

const scoreCircleRadius = 100
const marginCircleValue = 4
const circleTextColor = 'black'

const circleOptionsMap = [
  { text: 'b2', color: circleTextColor, backgroundColor: 'aqua', idxOffset: 1 },
  {
    text: '2',
    color: circleTextColor,
    backgroundColor: 'orange',
    idxOffset: 2,
  },
  { text: 'b3', color: circleTextColor, backgroundColor: 'aqua', idxOffset: 3 },
  {
    text: '3',
    color: circleTextColor,
    backgroundColor: 'orange',
    idxOffset: 4,
  },
  {
    text: '4',
    color: circleTextColor,
    backgroundColor: 'purple',
    idxOffset: 5,
  },
  { text: '#4', color: circleTextColor, backgroundColor: 'red', idxOffset: 6 },
  { text: 'b5', color: circleTextColor, backgroundColor: 'red', idxOffset: 6 },
  {
    text: '5',
    color: circleTextColor,
    backgroundColor: 'purple',
    idxOffset: 7,
  },
  { text: 'b6', color: circleTextColor, backgroundColor: 'aqua', idxOffset: 8 },
  {
    text: '6',
    color: circleTextColor,
    backgroundColor: 'orange',
    idxOffset: 9,
  },
  {
    text: 'b7',
    color: circleTextColor,
    backgroundColor: 'aqua',
    idxOffset: 10,
  },
  {
    text: '7',
    color: circleTextColor,
    backgroundColor: 'orange',
    idxOffset: 11,
  },
  { text: 'R', color: circleTextColor, backgroundColor: 'green', idxOffset: 0 },
]

const sideBarData = [
  {
    text: 'equidistant',
    idx: 5,
  },
  {
    text: 'color notes',
    idx: 1,
  },
  {
    text: 'Going home notes',
    idx: 4,
  },
  {
    text: 'flatten notes',
    idx: 0,
  },
  {
    text: 'Home Tree/Root',
    idx: 12,
  },
]

function makePositions(inptArr) {
  const returnObj = {}
  inptArr.forEach(
    (x) =>
      (returnObj[x.text] = {
        x: new Animated.Value(0),
        y: new Animated.Value(0),
      })
  )
  return returnObj
}

const TheoryCircles = () => {
  const [keysIdx, setKeysIdx] = useState(0)
  const [selectedCircles, setSelected] = useState([])
  const [positions] = useState(makePositions(circleOptionsMap))

  //TO DO probably not use effect for this
  useEffect(() => {
    const moveCirclesTimeout = setTimeout(() => moveCircles(), 1000)
    // const moveSelectedTimeout = setTimeout(() => {
    //   let selection = ['R', 'b7', '2']
    //   setSelected(selection)
    //   // moveSelectedCircles(selection)
    // }, 4000)

    return () => {
      clearTimeout(moveCirclesTimeout)
      clearTimeout(moveSelectedTimeout)
    }
  }, [])

  const cirlcesData = circleOptionsMap.map((x) => {
    let retObj = { ...x }
    retObj.source = returnAudioSrcForCirlces(keysIdx + x.idxOffset)
    return retObj
  })

  function returnAudioSrcForCirlces(inpt) {
    return inpt > 11
      ? noteAudioSrc[inpt - 12].audioSrc[2]
      : noteAudioSrc[inpt].audioSrc[1]
  }

  function incrementKey() {
    setKeysIdx((x) => (x === 11 ? 0 : x + 1))
  }

  const outerX = 2 * (scoreCircleRadius + marginCircleValue)
  const almostOuterY = 1.2 * scoreCircleRadius + 2 * marginCircleValue
  const innerX = scoreCircleRadius + marginCircleValue
  const innerY = scoreCircleRadius / 2 + marginCircleValue
  const innerCenterY = scoreCircleRadius + marginCircleValue
  const outerCenterY = 2 * (scoreCircleRadius + marginCircleValue)
  const targetPositions = {
    2: {
      x: innerX,
      y: -innerY,
    },
    3: {
      x: innerX,
      y: innerY,
    },
    4: { x: 0, y: innerCenterY },
    5: {
      x: -innerX,
      y: innerY,
    },
    6: {
      x: -innerX,
      y: -innerY,
    },
    7: { x: 0, y: -innerCenterY },

    b2: {
      x: outerX,
      y: -almostOuterY,
    },
    b3: {
      x: outerX,
      y: almostOuterY,
    },
    b5: {
      x: -outerX,
      y: almostOuterY,
    },
    b6: {
      x: -outerX,
      y: -almostOuterY,
    },
    b7: { x: 0, y: -outerCenterY },
    '#4': { x: 0, y: outerCenterY },
    R: { x: 0, y: 0 }, // Center circle
  }
  const moveCircles = () => {
    const animationTime = 1000
    const animations = Object.keys(positions).map((key) => {
      const position = positions[key]
      const target = targetPositions[key]
      if (!position || !target) {
        console.error(`Invalid key: ${key}`)
        return null
      }
      return Animated.parallel([
        Animated.timing(position.x, {
          toValue: target.x,
          duration: animationTime,
          useNativeDriver: true,
        }),
        Animated.timing(position.y, {
          toValue: target.y,
          duration: animationTime,
          useNativeDriver: true,
        }),
      ])
    })
    Animated.parallel(animations).start()
  }
  const moveSelectedCircles = (selectedArr) => {
    const animationTime = 50
    const animations = Object.keys(positions).map((key) => {
      if (selectedArr.includes(key)) {
        const position = positions[key]
        const target = targetPositions[key]
        if (!position || !target) {
          console.error(`Invalid key: ${key}`)
          return null
        }
        return Animated.parallel([
          Animated.timing(position.y, {
            toValue: target.y - 10,
            duration: animationTime,
            useNativeDriver: true,
          }),
        ])
      }
    })
    Animated.parallel(animations).start()
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.imageView} onPress={() => incrementKey()}>
          <Image source={keys[keysIdx].imgSrc} style={styles.image} />
        </Pressable>
        <View style={styles.circlesContainer}>
          {cirlcesData.map((x) => {
            const { text, source, backgroundColor, zIndex } = x
            return (
              <CircleTheorySingle
                key={text}
                positions={positions}
                circle={[styles.circle, { backgroundColor: backgroundColor }]}
                textStyle={styles.text}
                text={text}
                data={source}
                zIndex={zIndex}
                selectedBool={selectedCircles.includes(text)}
              />
            )
          })}
        </View>
        <View style={styles.sideBarCont}>
          {sideBarData.map((x) => {
            {
              const { idx, text } = x
              return (
                <View key={text + 'sidebar'} style={styles.sideBarRowCont}>
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: cirlcesData[idx].backgroundColor,
                        position: 'relative',
                      },
                    ]}
                    textStyle={[styles.text, { color: 'black' }]}
                  ></View>
                  <Text style={styles.sideBarText}>{text}</Text>
                </View>
              )
            }
          })}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlesContainer: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: '100%',
    maxHeight: '100%',
    flexShrink: 1,
    resizeMode: 'contain',
    zIndex: 10,
  },
  imageView: {
    height: 100,
    width: 100,
  },
  circle: {
    width: scoreCircleRadius,
    height: scoreCircleRadius,
    margin: marginCircleValue,
    padding: 0,
    border: 'solid',
    borderColor: 'black',
    borderRadius: scoreCircleRadius * 0.5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sideBarText: {
    fontSize: 10,
    color: 'white',
  },
  sideBarCont: {
    flexDirection: 'column',
  },
  sideBarRowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
})

export default TheoryCircles
