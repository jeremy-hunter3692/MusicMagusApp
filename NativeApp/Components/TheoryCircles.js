// import React, { useState } from 'react'
// import { Animated, View, Text, StyleSheet } from 'react-native'
// import CircleTheorySingle from './CircleTheorySingle'

// const scoreCircleRadius = 100
// const marginCircleValue = 1
// const TheoryCircles = () => {
//   const [positions] = useState({
//     2: {
//       x: new Animated.Value(-scoreCircleRadius - marginCircleValue),
//       y: new Animated.Value((scoreCircleRadius + marginCircleValue) / 2),
//     },
//     3: {
//       x: new Animated.Value(-scoreCircleRadius - marginCircleValue),
//       y: new Animated.Value(-(scoreCircleRadius + marginCircleValue) / 2),
//     },
//     4: {
//       x: new Animated.Value(0),
//       y: new Animated.Value(-scoreCircleRadius - marginCircleValue),
//     },
//     5: {
//       x: new Animated.Value(scoreCircleRadius + marginCircleValue),
//       y: new Animated.Value(-(scoreCircleRadius + marginCircleValue) / 2),
//     },
//     6: {
//       x: new Animated.Value(scoreCircleRadius + marginCircleValue),
//       y: new Animated.Value((scoreCircleRadius + marginCircleValue) / 2),
//     },
//     7: {
//       x: new Animated.Value(0),
//       y: new Animated.Value(scoreCircleRadius + marginCircleValue),
//     },
//     b2: {
//       x: new Animated.Value(-2 * (scoreCircleRadius + marginCircleValue)),
//       y: new Animated.Value(scoreCircleRadius),
//     },
//     b3: {
//       x: new Animated.Value(
//         -2 * (scoreCircleRadius + marginCircleValue + marginCircleValue)
//       ),
//       y: new Animated.Value(-scoreCircleRadius),
//     },
//     b5: {
//       x: new Animated.Value(
//         2 * (scoreCircleRadius + marginCircleValue + marginCircleValue)
//       ),
//       y: new Animated.Value(-scoreCircleRadius + marginCircleValue),
//     },
//     b6: {
//       x: new Animated.Value(
//         2 * (scoreCircleRadius + marginCircleValue + marginCircleValue)
//       ),
//       y: new Animated.Value(scoreCircleRadius),
//     },
//     b7: {
//       x: new Animated.Value(0),
//       y: new Animated.Value(
//         scoreCircleRadius + scoreCircleRadius + marginCircleValue
//       ),
//     },
//     '#4': {
//       x: new Animated.Value(0),
//       y: new Animated.Value(
//         -scoreCircleRadius - scoreCircleRadius - marginCircleValue
//       ),
//     },
//     R: { x: new Animated.Value(0), y: new Animated.Value(0) },
//   })

//   const moveCircle = (key, targetX, targetY) => {
//     Object.keys(positions).forEach((key) => {
//       const position = positions[key]

//       if (!position) {
//         console.error(`Invalid key: ${key}`)
//         return
//       }
//       // Animate the circle at the given index to the specific target X and Y values
//       Animated.parallel([
//         Animated.timing(position.x, {
//           toValue: 0,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(position.y, {
//           toValue: 0,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//       ]).start()
//     })
//   }
//   setTimeout(() => moveCircle(), 2000)

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftOuterColumn}>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'aqua' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'b6'}
//           />
//         </View>

//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'red' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'b5'}
//           />
//         </View>
//       </View>
//       <View style={styles.leftInnerColumn}>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'orange' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'6'}
//           />
//         </View>

//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'purple' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'5'}
//           />
//         </View>
//         {/* <View
//           style={{
//             justifyContent: 'center',
//             marginTop: 10,
//           }}
//         >
//           <Text style={[styles.text, { color: 'white' }]}>Enharmonic</Text>
//           <Text style={[styles.text, { color: 'white' }]}>Same Pitch</Text>
//         </View> */}
//       </View>
//       <View style={styles.centerColumn}>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'aqua' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'b7'}
//           />
//         </View>

//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'orange' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'7'}
//           />
//         </View>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { zIndex: 9999 }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'R'}
//           />
//         </View>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'purple' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'4'}
//           />
//         </View>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'red' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'#4'}
//           />
//         </View>
//       </View>
//       <View style={styles.rightInnerColumn}>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'orange' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'2'}
//           />
//         </View>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'orange' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'3'}
//           />
//         </View>
//       </View>
//       <View style={styles.rightOuterColumn}>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'aqua' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'b2'}
//           />
//         </View>
//         <View>
//           <CircleTheorySingle
//             positions={positions}
//             circle={[styles.circle, { backgroundColor: 'aqua' }]}
//             textStyle={[styles.text, { color: 'black' }]}
//             text={'b3'}
//           />
//         </View>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerColumn: {
//     borderColor: 'white',
//     borderWidth: 2,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // position: 'relative',
//   },
//   leftInnerColumn: {
//     height: '%100',
//     flexDirection: 'column',
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   rightInnerColumn: {
//     height: '%100',
//     flexDirection: 'column',
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   leftOuterColumn: {
//     flex: 1,
//     height: '40%',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//   },
//   rightOuterColumn: {
//     flex: 1,
//     height: '40%',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   circle: {
//     width: scoreCircleRadius,
//     height: scoreCircleRadius,
//     margin: marginCircleValue,
//     padding: 0,
//     border: 'solid',
//     borderColor: 'black',
//     borderRadius: scoreCircleRadius * 0.5,
//     backgroundColor: 'green',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// })

// export default TheoryCircles
import React, { useState } from 'react'
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
const createInitPositions = () => ({
  x: new Animated.Value(0),
  y: new Animated.Value(0),
})

const TheoryCircles = () => {
  const [keysIdx, setKeysIdx] = useState(0)
  // const [selected, setSelected] = useState(keys[keysIdx])

  const [positions] = useState({
    2: createInitPositions(),
    3: createInitPositions(),
    4: createInitPositions(),
    5: createInitPositions(),
    6: createInitPositions(),
    7: createInitPositions(),
    b2: createInitPositions(),
    b3: createInitPositions(),
    b5: createInitPositions(),
    b6: createInitPositions(),
    b7: createInitPositions(),
    '#4': createInitPositions(),
    R: createInitPositions(),
  })

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
    const animationTime = 2000
    const animations = Object.keys(positions).map((key) => {
      const position = positions[key]
      const target = targetPositions[key]
      if (!position || !target) {
        console.error(`Invalid key: ${key}`)
        return null
      }
      // Animate the circle at the given index to the specific target X and Y values
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
  const moveSelectedCircles = () => {
    const animationTime = 50
    const animations = Object.keys(positions).map((key) => {
      const position = positions[key]
      const target = targetPositions[key]

      if (!position || !target) {
        console.error(`Invalid key: ${key}`)
        return null
      }

      // Animate the circle at the given index to the specific target X and Y values
      if (key != 'R' && key != '#4' && key != 'b5') {
        return Animated.parallel([
          Animated.timing(position.y, {
            toValue: target.y - 2,
            duration: animationTime,
            useNativeDriver: true,
          }),
        ])
      } else return
    })
    Animated.parallel(animations).start()
  }

  setTimeout(() => moveCircles(), 2000)
  setTimeout(() => moveSelectedCircles(), 6000)

  function clampIdx(inpt) {
    //TODO renameto return audio

    if (inpt > 11) {
      return noteAudioSrc[inpt - 12].audioSrc[2]
    } else {
      return noteAudioSrc[inpt].audioSrc[1]
    }
  }
  function incrementKey() {
    setKeysIdx((x) => (x === 11 ? 0 : x + 1))
  }

  const cirlcesData = [
    {
      text: 'b6',
      color: 'black',
      backgroundColor: 'aqua',
      source: clampIdx(keysIdx + 8),
      selectedBool: false,
    },
    {
      text: 'b5',
      color: 'black',
      backgroundColor: 'red',
      source: clampIdx(keysIdx + 6),
      selectedBool: false,
    },
    {
      text: '6',
      color: 'black',
      backgroundColor: 'orange',
      source: clampIdx(keysIdx + 9),
      selectedBool: false,
    },

    {
      text: '5',
      color: 'black',
      backgroundColor: 'purple',
      source: clampIdx(keysIdx + 7),
      selectedBool: false,
    },
    {
      text: 'b7',
      color: 'black',
      backgroundColor: 'aqua',
      source: clampIdx(keysIdx + 10),
      selectedBool: false,
    },
    {
      text: '7',
      color: 'black',
      backgroundColor: 'orange',
      source: clampIdx(keysIdx + 11),
      selectedBool: false,
    },

    {
      text: '4',
      color: 'black',
      backgroundColor: 'purple',
      source: clampIdx(keysIdx + 5),
      selectedBool: false,
    },
    {
      text: '#4',
      color: 'black',
      backgroundColor: 'red',
      source: clampIdx(keysIdx + 6),
      selectedBool: false,
    },
    {
      text: '2',
      color: 'black',
      backgroundColor: 'orange',
      source: clampIdx(keysIdx + 2),
      selectedBool: false,
    },
    {
      text: '3',
      color: 'black',
      backgroundColor: 'orange',
      source: clampIdx(keysIdx + 4),
      selectedBool: false,
    },
    {
      text: 'b2',
      color: 'black',
      backgroundColor: 'aqua',
      source: clampIdx(keysIdx + 1),
      selectedBool: false,
    },
    {
      text: 'b3',
      color: 'black',
      backgroundColor: 'aqua',
      source: clampIdx(keysIdx + 3),
      selectedBool: false,
    },
    {
      text: 'R',
      color: 'black',
      zIndex: 9999,
      source: clampIdx(keysIdx),
      selectedBool: false,
    },
  ]

  const sideBarData = [
    {
      text: 'equidistant',
      idx: 1,
    },
    {
      text: 'color notes',
      idx: 2,
    },
    {
      text: 'Going home notes',
      idx: 6,
    },
    {
      text: 'flatten notes',
      idx: 11,
    },
    {
      text: 'Home Tree/Root',
      idx: 12,
    },
  ]

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.imageView} onPress={() => incrementKey()}>
          <Image source={keys[keysIdx].imgSrc} style={styles.image} />
        </Pressable>

        <View style={styles.circlesContainer}>
          {cirlcesData.map((x) => {
            const {
              text,
              source,
              color,
              backgroundColor,
              zIndex,
              selectedBool,
            } = x

            return (
              <CircleTheorySingle
                key={text}
                positions={positions}
                circle={[styles.circle, { backgroundColor: backgroundColor }]}
                textStyle={styles.text}
                text={text}
                data={source}
                zIndex={zIndex}
                selectedBool={selectedBool}
              />
            )
          })}
        </View>
        <View style={styles.sideBarCont}>
          {sideBarData.map((x) => {
            {
              const { idx, text } = x

              return (
                <View style={styles.sideBarRowCont}>
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
