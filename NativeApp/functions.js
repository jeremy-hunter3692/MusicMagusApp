import { intervals } from './Intervals'

export function getCorrectAnswer(rootNote, questionValue) {
  let distInSemiTones = rootNote - questionValue
  let trueDist =
    rootNote > questionValue ? 12 - distInSemiTones : distInSemiTones
  return intervals[Math.abs(trueDist)].name
}
