import { intervals } from '../data/Intervals'

export function getCorrectAnswer(rootNote, questionValue) {
  let distInSemiTones = rootNote.idx - questionValue.idx
  let trueDist =
    rootNote.idx > questionValue.idx && rootNote.idx != 11
      ? 12 - distInSemiTones
      : distInSemiTones

  return intervals[Math.abs(trueDist)]
}
export function getAnswerKeyAndInterval(rootNote, questionValue, array) {
  let answerIdx = rootNote.idx + questionValue.idx
  let answer =
    answerIdx >= array.length
      ? array[answerIdx - array.length]
      : array[answerIdx]
  return answer
}

export function getAnswerKeys(question, interval, keysArray) {
  let answerIdx = question.idx - interval.idx

  answerIdx = answerIdx < 0 ? answerIdx + keysArray.length : answerIdx
  return keysArray[answerIdx]
}

export function returnRandomCard(array, omitRoot = false) {
  //TODO write a test to check the roots aren't returning in various quesiton catagories
  //Could also write this as if intervals is passed as an array don't return 1/[0]?
  let idx = omitRoot
    ? Math.floor(Math.random() * (array.length - 1) + 1)
    : Math.floor(Math.random() * array.length)
  return { value: array[idx], idx: idx }
}
