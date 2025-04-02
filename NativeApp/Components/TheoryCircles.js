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
// const cirlcesData = [
//   {
//     text: 'b6',
//     color: 'black',
//     backgroundColor: 'aqua',
//     source: clampIdx(keysIdx + 8),
//   },
//   {
//     text: 'b5',
//     color: 'black',
//     backgroundColor: 'red',
//     source: clampIdx(keysIdx + 6),
//   },
//   {
//     text: '6',
//     color: 'black',
//     backgroundColor: 'orange',
//     source: clampIdx(keysIdx + 9),
//   },

//   {
//     text: '5',
//     color: 'black',
//     backgroundColor: 'purple',
//     source: clampIdx(keysIdx + 7),
//   },
//   {
//     text: 'b7',
//     color: 'black',
//     backgroundColor: 'aqua',
//     source: clampIdx(keysIdx + 10),
//   },
//   {
//     text: '7',
//     color: 'black',
//     backgroundColor: 'orange',
//     source: clampIdx(keysIdx + 11),
//   },

//   {
//     text: '4',
//     color: 'black',
//     backgroundColor: 'purple',
//     source: clampIdx(keysIdx + 5),
//   },
//   {
//     text: '#4',
//     color: 'black',
//     backgroundColor: 'red',
//     source: clampIdx(keysIdx + 6),
//   },
//   {
//     text: '2',
//     color: 'black',
//     backgroundColor: 'orange',
//     source: clampIdx(keysIdx + 2),
//   },
//   {
//     text: '3',
//     color: 'black',
//     backgroundColor: 'orange',
//     source: clampIdx(keysIdx + 4),
//   },
//   {
//     text: 'b2',
//     color: 'black',
//     backgroundColor: 'aqua',
//     source: clampIdx(keysIdx + 1),
//   },
//   {
//     text: 'b3',
//     color: 'black',
//     backgroundColor: 'aqua',
//     source: clampIdx(keysIdx + 3),
//   },
//   {
//     text: 'R',
//     color: 'black',
//     zIndex: 9999,
//     source: clampIdx(keysIdx),
//   },
// ]

// const [positions] = useState({
//   2: createInitPositions(),
//   3: createInitPositions(),
//   4: createInitPositions(),
//   5: createInitPositions(),
//   6: createInitPositions(),
//   7: createInitPositions(),
//   b2: createInitPositions(),
//   b3: createInitPositions(),
//   b5: createInitPositions(),
//   b6: createInitPositions(),
//   b7: createInitPositions(),
//   '#4': createInitPositions(),
//   R: createInitPositions(),
// })
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
const createInitPositions = () => ({})

const circleNames = [
  'b2',
  '2',
  'b3',
  '3',
  '4',
  '#4',
  'b5',
  '5',
  'b6',
  '6',
  'b7',
  '7',
  'R',
]
const circleNamesIdxForNotse = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11, 0]
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
function makePositions(inptArr) {
  const returnObj = {}
  inptArr.forEach(
    (x) =>
      (returnObj[x] = { x: new Animated.Value(0), y: new Animated.Value(0) })
  )
  return returnObj
}

const TheoryCircles = () => {
  const [keysIdx, setKeysIdx] = useState(0)
  const [selectedCircles, setSelected] = useState([])
  const [positions] = useState(makePositions(circleNames))

  //TO DO probably not use effect for this
  useEffect(() => {
    const moveCirclesTimeout = setTimeout(() => moveCircles(), 1000)
    const moveSelectedTimeout = setTimeout(() => {
      let selection = ['R', 'b7', '2']
      setSelected(selection)
      // moveSelectedCircles(selection)
    }, 4000)

    return () => {
      clearTimeout(moveCirclesTimeout)
      clearTimeout(moveSelectedTimeout)
    }
  }, [])

  const cirlcesData = circleNames.map((x, idx) => {
    let retObj = { text: x, color: 'black', backgroundColor: 'orange' }
    if (x === '4' || x === '5') {
      retObj.backgroundColor = 'purple'
    }
    if (x === '#4' || x === 'b5') {
      retObj.backgroundColor = 'red'
    }
    if (x === 'R') {
      retObj.backgroundColor = 'green'
    }
    if (x === 'b3' || x === 'b6' || x === 'b7' || x === 'b2') {
      retObj.backgroundColor = 'aqua'
    }
    retObj.source = returnAudioSrcForCirlces(
      keysIdx + circleNamesIdxForNotse[idx]
    )
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
