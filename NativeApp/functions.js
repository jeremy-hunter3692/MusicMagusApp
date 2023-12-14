import { intervals } from './Intervals'


export function getCorrectAnswer(rootNote, questionValue) {
  // console.log(rootNote, questionValue)
  let distInSemiTones = rootNote.idx - questionValue.idx
  console.log('dist', distInSemiTones, rootNote, questionValue)
  let trueDist =
    rootNote.idx > questionValue.idx && rootNote.idx != 11
      ? 12 - distInSemiTones
      : distInSemiTones
  console.log('true', trueDist)
  return intervals[Math.abs(trueDist)].name
}

export function returnRandomCard(array) {
  let idx = Math.floor(Math.random() * array.length) //could hard code this for saftey?
  return { value: array[idx], idx: idx }
}

export function getAnswerKeyAndInterval(rootNote, questionValue, array) {
  let answerIdx = rootNote.idx + questionValue.idx

  let answer =
    answerIdx >= array.length
      ? array[answerIdx - array.length]
      : array[answerIdx]
  return answer.name
}
