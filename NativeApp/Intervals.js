//Green for root tree
//Minor blue - sea creatures
//Major Orange  - land creature
//Red for tirtone  - ambibians
//Perfect are purple -flying creature
//each has symbols for how close in semitones it is to the nearest root note
export const intervals = [
  { name: '1', distanceToRoot: 0, up: false , imgSrc:''},
  { name: 'b2', distanceToRoot: 1, up: false , imgSrc:''},
  { name: '2', distanceToRoot: 2, up: false , imgSrc:''},
  { name: 'b3', distanceToRoot: 3, up: false, imgSrc:'' },
  { name: '3', distanceToRoot: 4, up: false , imgSrc:''},
  { name: '4', distanceToRoot: 5, up: false , imgSrc:''},
  { name: '#4/b5', distanceToRoot: 6, up: null, imgSrc:''},
  { name: '5', distanceToRoot: 5, up: true , imgSrc:''},
  { name: 'b6', distanceToRoot: 4, up: true , imgSrc:''},
  { name: '6', distanceToRoot: 3, up: true, imgSrc:'' },
  { name: 'b7', distanceToRoot: 2, up: true, imgSrc:'' },
  { name: '7', distanceToRoot: 1, up: true , imgSrc:''},
]

