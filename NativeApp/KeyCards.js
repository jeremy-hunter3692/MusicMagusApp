//Key - tw for F# and Gb none for CFlat of CSharp

//Symbols with root in the centre then 2 - 7 7being on the top
//denotes where the accidentals are

export const keys = [
  {
    name: 'C',
    intervals: [false, false, false, false, false, false, false],
    imgSrc: require('./assets/keyCards/C.png'),
  },
  {
    name: 'Db',
    intervals: [true, true, false, true, true, true, false],
    imgSrc: require('./assets/keyCards/Db.png'),
  },
  {
    name: 'D',
    intervals: [false, false, true, false, false, false, true],
    imgSrc: require('./assets/keyCards/D.png'),
  },
  {
    name: 'Eb',
    intervals: [true, false, false, true, true, false, false],
    imgSrc: require('./assets/keyCards/Eb.png'),
  },
  {
    name: 'E',
    intervals: [false, true, true, false, false, true, true],
    imgSrc: require('./assets/keyCards/E.png'),
  },
  {
    name: 'F',
    intervals: [false, false, false, true, false, false, false],
    imgSrc: require('./assets/keyCards/F.png'),
  },
  {
    name: 'F#',
    intervals: [true, true, true, false, true, true, true],
    imgSrc: require('./assets/keyCards/Gb.png'),
  },
  {
    name: 'G',
    intervals: [false, false, false, false, false, false, true],
    imgSrc: require('./assets/keyCards/G.png'),
  },
  {
    name: 'Ab',
    intervals: [true, true, false, true, true, false, false],
    imgSrc: require('./assets/keyCards/Ab.png'),
  },
  {
    name: 'A',
    intervals: [false, false, true, false, false, true, true],
    imgSrc: require('./assets/keyCards/A.png'),
  },
  {
    name: 'Bb',
    intervals: [true, false, false, true, false, false, false],
    imgSrc: require('./assets/keyCards/Bb.png'),
  },
  {
    name: 'B',
    intervals: [false, true, true, false, true, true, true],
    imgSrc: require('./assets/keyCards/B.png'),
  },
]

export function getIntervalNo(array, value) {
  return array.filter((v) => v === value).length
}

export function printAccidentalNos() {
  return keys.map((x) => [x.name, getIntervalNo(x.intervals, true)])
}
//MAKE THIS REUSEABLE--Done
// export function returnRandomkeyCard() {
//   let idx = Math.floor(Math.random() * keys.length) //should probably hard code this for saftey
//   return keys[idx]
// }
