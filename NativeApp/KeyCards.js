//Key - tw for F# and Gb none for CFlat of CSharp

//Symbols with root in the centre then 2 - 7 7being on the top
//denotes where the accidentals are

// const c = { name: 'C', intervals: [false, false, false, false, false, false] }
// const db = { name: 'Db', intervals: [true, false, true, true, true, false] }
// const d = { name: 'D', intervals: [false, true, false, false, false, true] }
// const eb = { name: 'Eb', intervals: [false, false, true, true, false, false] }
// const e = { name: 'E', intervals: [true, true, false, false, true, true] }
// const f = { name: 'F', intervals: [false, false, true, false, false, false] }
// const fs = { name: 'F#', intervals: [true, true, false, true, true, true] }
// const g = { name: 'G', intervals: [false, false, false, false, false, true] }
// const ab = { name: 'Ab', intervals: [true, false, false, true, false, false] }
// const a = { name: 'A', intervals: [false, true, true, false, true, true] }
// const bb = { name: 'Bb', intervals: [false, false, true, false, false, false] }
// const b = { name: 'B', intervals: [true, true, false, true, true, true] }

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
//MAKE THIS REUSEABLE 
export function returnRandomkeyCard() {
  let idx = Math.floor(Math.random() * keys.length) //should probably hard code this for saftey
  return keys[idx]
}

returnRandomkeyCard()
