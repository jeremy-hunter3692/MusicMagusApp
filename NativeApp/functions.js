import { noteNames } from './NoteNames'
import { intervals } from './Intervals'

export function getCorrectAnswer(rootNote, questionValue) {
  let answerInSemiTones = noteNames.findIndex((x) => x.name === questionValue)
  let rootInSemiTones = noteNames.findIndex((x) => x.name === rootNote)

  let distInSemiTones = rootInSemiTones - answerInSemiTones
  let trueDist =
    rootInSemiTones > answerInSemiTones ? 12 - distInSemiTones : distInSemiTones

  return intervals[Math.abs(trueDist)].name
}
