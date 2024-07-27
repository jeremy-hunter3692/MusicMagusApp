//Key - tw for F# and Gb none for CFlat of CSharp

//Symbols with root in the centre then 2 - 7 7being on the top
//denotes where the accidentals are

export const keys = [
  {
    name: 'C',
    intervals: [false, false, false, false, false, false, false],
    imgSrc: require('../assets/keyCards/C.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/C.mp3'),
  },
  {
    name: 'Db',
    intervals: [true, true, false, true, true, true, false],
    imgSrc: require('../assets/keyCards/Db.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Db.mp3'),
  },
  {
    name: 'D',
    intervals: [false, false, true, false, false, false, true],
    imgSrc: require('../assets/keyCards/D.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/D.mp3'),
  },
  {
    name: 'Eb',
    intervals: [true, false, false, true, true, false, false],
    imgSrc: require('../assets/keyCards/Eb.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Eb.mp3'),
  },
  {
    name: 'E',
    intervals: [false, true, true, false, false, true, true],
    imgSrc: require('../assets/keyCards/E.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/E.mp3'),
  },
  {
    name: 'F',
    intervals: [false, false, false, true, false, false, false],
    imgSrc: require('../assets/keyCards/F.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/F.mp3'),
  },
  {
    name: 'F#',
    intervals: [true, true, true, true, true, true, false],
    imgSrc: require('../assets/keyCards/Gb.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Gb.mp3'),
  },
  {
    name: 'G',
    intervals: [false, false, false, false, false, false, true],
    imgSrc: require('../assets/keyCards/G.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/G.mp3'),
  },
  {
    name: 'Ab',
    intervals: [true, true, false, true, true, false, false],
    imgSrc: require('../assets/keyCards/Ab.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Ab.mp3'),
  },
  {
    name: 'A',
    intervals: [false, false, true, false, false, true, true],
    imgSrc: require('../assets/keyCards/A.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/A.mp3'),
  },
  {
    name: 'Bb',
    intervals: [true, false, false, true, false, false, false],
    imgSrc: require('../assets/keyCards/Bb.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Bb.mp3'),
  },
  {
    name: 'B',
    intervals: [false, true, true, false, true, true, true],
    imgSrc: require('../assets/keyCards/B.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/B.mp3'),
  },
]

export function getIntervalNo(array, value) {
  return array.filter((x) => x === value).length
}

export function printAccidentalNos() {
  return keys.map((x) => [x.name, getIntervalNo(x.intervals, true)])
}
//MAKE THIS REUSEABLE--Done
// export function returnRandomkeyCard() {
//   let idx = Math.floor(Math.random() * keys.length) //should probably hard code this for saftey
//   return keys[idx]
// }
