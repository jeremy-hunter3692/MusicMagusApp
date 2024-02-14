//Green for root tree
//Minor blue - sea creatures
//Major Orange  - land creature
//Red for tirtone  - ambibians
//Perfect are purple -flying creature
//each has symbols for how close in semitones it is to the nearest root note
export const intervals = [
  {
    name: '1',
    distanceToRoot: 0,
    up: false,
    imgSrc: require('../assets/intervalCards/1.png'),
  },
  {
    name: 'b2',
    distanceToRoot: 1,
    up: false,
    imgSrc: require('../assets/intervalCards/b2.png'),
  },
  {
    name: '2',
    distanceToRoot: 2,
    up: false,
    imgSrc: require('../assets/intervalCards/2.png'),
  },
  {
    name: 'b3',
    distanceToRoot: 3,
    up: false,
    imgSrc: require('../assets/intervalCards/b3.png'),
  },
  {
    name: '3',
    distanceToRoot: 4,
    up: false,
    imgSrc: require('../assets/intervalCards/3.png'),
  },
  {
    name: '4',
    distanceToRoot: 5,
    up: false,
    imgSrc: require('../assets/intervalCards/4.png'),
  },
  {
    name: '#4/b5',
    distanceToRoot: 6,
    up: null,
    imgSrc: require('../assets/intervalCards/b5.png'),
  },
  {
    name: '5',
    distanceToRoot: 5,
    up: true,
    imgSrc: require('../assets/intervalCards/5.png'),
  },
  {
    name: 'b6',
    distanceToRoot: 4,
    up: true,
    imgSrc: require('../assets/intervalCards/b6.png'),
  },
  {
    name: '6',
    distanceToRoot: 3,
    up: true,
    imgSrc: require('../assets/intervalCards/6.png'),
  },
  {
    name: 'b7',
    distanceToRoot: 2,
    up: true,
    imgSrc: require('../assets/intervalCards/b7.png'),
  },
  {
    name: '7',
    distanceToRoot: 1,
    up: true,
    imgSrc: require('../assets/intervalCards/7.png'),
  },
]

// export const intervalImgs = [
//   require('./assets/intervalCards/1.png'),
//   require('./assets/intervalCards/b2.png'),
//   require('./assets/intervalCards/2.png'),
//   require('./assets/intervalCards/b3.png'),
//   require('./assets/intervalCards/3.png'),
//   require('./assets/intervalCards/4.png'),
//   require('./assets/intervalCards/b5.png'),
//   require('./assets/intervalCards/5.png'),
//   require('./assets/intervalCards/b6.png'),
//   require('./assets/intervalCards/6.png'),
//   require('./assets/intervalCards/b7.png'),
//   require('./assets/intervalCards/7.png'),
// ]
