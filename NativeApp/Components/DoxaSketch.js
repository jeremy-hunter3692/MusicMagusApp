import React from 'react';
import { View, StyleSheet } from 'react-native';

const DoxaSketch = () => {
  return (
    <View style={styles.container}>
      {/* D Shape */}
      <View style={styles.letterContainer}>
        <View style={styles.dVertical} />
        <View style={styles.dCurve} />
      </View>
      {/* O Shape */}
      <View style={styles.letterContainer}>
        <View style={styles.oCircle} />
      </View>
      {/* X Shape */}
      <View style={styles.letterContainer}>
        <View style={[styles.xLine, styles.xLine1]} />
        <View style={[styles.xLine, styles.xLine2]} />
      </View>
      {/* A Shape (Triangle) */}
      <View style={styles.letterContainer}>
        <View style={styles.aTriangle} />
        <View style={styles.aBar} />
      </View>
    </View>
  );
};

const SIZE = 60;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  letterContainer: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // D
  dVertical: {
    position: 'absolute',
    left: 0,
    width: 10,
    height: SIZE,
    backgroundColor: '#333',
    borderRadius: 1,
  },
  dCurve: {
    position: 'absolute',
    left: 10,
    width: SIZE - 10,
    height: SIZE,
    borderTopRightRadius: SIZE / 2,
    borderBottomRightRadius: SIZE / 2,
    borderWidth: 10,
    borderColor: '#333',
    borderLeftWidth: 0,
    backgroundColor: 'transparent',
  },
  // O
  oCircle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 10,
    borderColor: '#333',
    backgroundColor: 'transparent',
  },
  // X
  xLine: {
    position: 'absolute',
    width: SIZE , 
    height: 10, //thickness
    backgroundColor: '#333',
    borderRadius: 1,
    top: SIZE  / 2 ,
    left: 0,
  },
  xLine1: {
    transform: [{ rotate: '45deg' }],
  },
  xLine2: {
    transform: [{ rotate: '-45deg' }],
  },
  // A (Triangle)
  aTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: SIZE / 2,
    borderRightWidth: SIZE / 2,
    borderBottomWidth: SIZE,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#333',
    backgroundColor: 'transparent',
  },

});

export default DoxaSketch;