import { intervals } from '../data/Intervals'

export function getCorrectAnswer(rootNote, questionValue) {
  // console.log(rootNote, questionValue)
  let distInSemiTones = rootNote.idx - questionValue.idx
  // console.log('dist', distInSemiTones, rootNote, questionValue)
  let trueDist =
    rootNote.idx > questionValue.idx && rootNote.idx != 11
      ? 12 - distInSemiTones
      : distInSemiTones
  // console.log('true', trueDist, intervals[Math.abs(trueDist)])
  return intervals[Math.abs(trueDist)]
}

export function returnRandomCard(array) {
  //TODO not returning C in questions min max for removing root questions could hard code this for saftey?
  // let idx = Math.floor(Math.random() * (array.length - 1) + 1)
  let idx = Math.floor(Math.random() * array.length)
  return { value: array[idx], idx: idx }
}

export function getAnswerKeys(question, interval, keysArray) {
  //Ab is the Major 2nd in which key?
  console.log(
    ' getAnswerKeys',
    question.value.name,
    question.idx,
    '-',
    interval.idx
  )
  let answerIdx = question.idx - interval.idx
  console.log(answerIdx)

  answerIdx = answerIdx < 0 ? answerIdx + keysArray.length : answerIdx

  return keysArray[answerIdx]
}
export function getAnswerKeyAndInterval(rootNote, questionValue, array) {
  let answerIdx = rootNote.idx + questionValue.idx

  let answer =
    answerIdx >= array.length
      ? array[answerIdx - array.length]
      : array[answerIdx]
  return answer
}
