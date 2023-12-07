//Green for root tree
//Minor blue - sea creatures
//Major Orange  - land creature
//Red for tirtone  - ambibians
//Perfect are purple -flying creature

//each has symbols for how close in semitones it is to the nearest root note
const intervals = [
  { name: '1', distanceToRoot: 0, up: false },
  { name: 'b2', distanceToRoot: 1, up: false },
  { name: '2', distanceToRoot: 2, up: false },
  { name: 'b3', distanceToRoot: 3, up: false },
  { name: '3', distanceToRoot: 4, up: false },
  { name: '4', distanceToRoot: 5, up: false },
  { name: '#4/b5', distanceToRoot: 6 },
  { name: '5', distanceToRoot: 5, up: true },
  { name: 'b6', distanceToRoot: 4, up: true },
  { name: '6', distanceToRoot: 3, up: true },
  { name: 'b5', distanceToRoot: 2, up: true },
  { name: '7', distanceToRoot: 1, up: true },
]
