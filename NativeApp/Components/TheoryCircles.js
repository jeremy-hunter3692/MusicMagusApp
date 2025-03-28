import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CircleTheorySingle from './CircleTheorySingle'

const scoreCircleRadius = 100

const TheoryCircles = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftOuterColumn}>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'aqua' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'b6'}
          />
        </View>

        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'red' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'b5'}
          />
        </View>
      </View>
      <View style={styles.leftInnerColumn}>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'orange' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'6'}
          />
        </View>

        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'purple' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'5'}
          />
        </View>
        {/* <View
          style={{
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Text style={[styles.text, { color: 'white' }]}>Enharmonic</Text>
          <Text style={[styles.text, { color: 'white' }]}>Same Pitch</Text>
        </View> */}
      </View>
      <View style={styles.centerColumn}>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'aqua' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'b7'}
          />
        </View>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'orange' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'7'}
          />
        </View>
        <View>
          <CircleTheorySingle
            circle={styles.circle}
            textStyle={[styles.text, { color: 'black' }]}
            text={'R'}
          />
        </View>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'purple' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'4'}
          />
        </View>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'red' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'#4'}
          />
        </View>
      </View>
      <View style={styles.rightInnerColumn}>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'orange' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'2'}
          />
        </View>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'orange' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'3'}
          />
        </View>
      </View>
      <View style={styles.rightOuterColumn}>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'aqua' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'b2'}
          />
        </View>
        <View>
          <CircleTheorySingle
            circle={[styles.circle, { backgroundColor: 'aqua' }]}
            textStyle={[styles.text, { color: 'black' }]}
            text={'b3'}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftInnerColumn: {
    height: '%100',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  rightInnerColumn: {
    height: '%100',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  leftOuterColumn: {
    flex: 1,
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rightOuterColumn: {
    flex: 1,
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  circle: {
    width: scoreCircleRadius,
    height: scoreCircleRadius,
    margin: 2,
    padding: 0,
    border: 'solid',
    borderColor: 'black',
    borderRadius: scoreCircleRadius * 0.5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default TheoryCircles
