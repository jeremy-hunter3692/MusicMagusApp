//Key - tw for F# and Gb none for CFlat of CSharp

//Symbols with root in the centre then 2 - 7 7being on the top
//denotes where the accidentals are

export const keys = [
  { name: 'C', intervals: [false, false, false, false, false, false, false] },
  { name: 'Db', intervals: [true, true, false, true, true, true, false] },
  { name: 'D', intervals: [false, false, true, false, false, false, true] },
  { name: 'Eb', intervals: [true, false, false, true, true, false, false] },
  { name: 'E', intervals: [false, true, true, false, false, true, true] },
  { name: 'F', intervals: [false, false, false, true, false, false, false] },
  { name: 'F#', intervals: [true, true, true, false, true, true, true] },
  { name: 'G', intervals: [false, false, false, false, false, false, true] },
  { name: 'Ab', intervals: [true, true, false, true, true, false, false] },
  { name: 'A', intervals: [false, false, true, false, false, true, true] },
  { name: 'Bb', intervals: [true, false, false, true, false, false, false] },
  { name: 'B', intervals: [false, true, true, false, true, true, true] },
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
