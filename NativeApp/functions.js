import { intervals } from './Intervals'

export function getCorrectAnswer(rootNote, questionValue) {
  console.log(rootNote, questionValue)
  let distInSemiTones = rootNote - questionValue
  let trueDist =
    rootNote > questionValue ? 12 - distInSemiTones : distInSemiTones
  console.log(trueDist)
  return intervals[Math.abs(trueDist)].name
}

export function returnRandomCard(array) {
  let idx = Math.floor(Math.random() * array.length) //could hard code this for saftey?
  return { value: array[idx], idx: idx }
}
