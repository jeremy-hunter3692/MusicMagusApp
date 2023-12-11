import { intervals } from './Intervals'

export function getCorrectAnswer(rootNote, questionValue) {
  console.log(rootNote.value.name, questionValue.value.name)
  let distInSemiTones = rootNote.idx - questionValue.idx
  let trueDist =
    rootNote > questionValue ? 12 - distInSemiTones : distInSemiTones
  return intervals[Math.abs(trueDist)].name
}

export function returnRandomCard(array) {
  let idx = Math.floor(Math.random() * array.length) //could hard code this for saftey?
  return { value: array[idx], idx: idx }
}
