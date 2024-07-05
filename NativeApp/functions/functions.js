import { intervals } from '../data/IntervalCards'
import { noteAudioSrc } from '../data/NotesAudiosSrc'

// export function getCorrectAnswer(rootNote, questionValue) {
//   let distInSemiTones = rootNote.idx - questionValue.idx
//   let trueDist =
//     rootNote.idx > questionValue.idx && rootNote.idx != 11
//       ? 12 - distInSemiTones
//       : distInSemiTones

//   return intervals[Math.abs(trueDist)]
// }

//TO DO re name and check these functions can't be dired up
//test this its' not working for correct interval anys
// export function getDistBetweenTwoCardIdxs(firstCardIDX, secondCardIDX) {
//   return Math.abs(firstCardIDX - secondCardIDX)
// }

export function distanceUpInIntervals(rootNote, targetNote) {
  return (targetNote - rootNote + 12) % 12
}

export function getNoteCardIdxFromIntervalAndKeyCard(
  rootCardIDX,
  intervalCardIDX
) {
  let answerIdx = rootCardIDX + intervalCardIDX

  answerIdx = answerIdx > 11 ? answerIdx - 12 : answerIdx

  return answerIdx
}

export function intervalOfWhatKey(noteCardIDX, IntervalCardIDX) {
  let answerCardIDX = noteCardIDX - IntervalCardIDX
  answerCardIDX = answerCardIDX < 0 ? answerCardIDX + 12 : answerCardIDX
  return answerCardIDX
}

export function findNoteEquivalent(inpt, array) {
  // console.log('find note', inpt, array)
  const result = array.filter((x) => x.name === inpt.name)
  return result[0]
}

//SORT THIS FUCKING TEST OUT TO DO
export function getAltOctaveNotes(note, root, testArray = noteAudioSrc) {
  let result
  //WE ARE PASSING A NOTE HERE INSTEAD OF IDX
  let noteWithIdx = getIdxAndNotes(note, testArray)
  // let altSource //= note.distanceToRoot * (note.up ? -1 : 1)
  // altSource = altSource > 11 ? altSource - 11 : altSource
  // console.log(testArray[0].audioSrc['1'])
  if (note.name === root.value.name) {
    result = noteWithIdx.note.audioSrc['2']
  } else {
    result =
      noteWithIdx.idx > root.idx
        ? noteWithIdx.note.audioSrc['1']
        : noteWithIdx.note.audioSrc['2']
  }
  return result
}

// export function getAnswerKeys(question, interval, keysArray) {
//   let answerIdx = question.idx - interval.idx

//   answerIdx = answerIdx < 0 ? answerIdx + keysArray.length : answerIdx
//   return keysArray[answerIdx]
// }

export function returnRandomCard(array, omitRoot = false) {
  //TODO write a test to check the roots aren't returning in various quesiton catagories
  //Could also write this as if intervals is passed as an array don't return 1/[0]?
  let idx = omitRoot
    ? Math.floor(Math.random() * (array.length - 1) + 1)
    : Math.floor(Math.random() * array.length)
  return { value: array[idx], idx: idx }
}

export function getIdxAndNotes(note, array = noteAudioSrc) {

  let getIdxArr = array.map((x, idx) => {
    if (x.name === note.name) {
      return [x, idx]
    }
  })
  let res = getIdxArr.filter((x) => x != undefined)

  let resFixed = {
    idx: res[0][1],
    note: res[0][0],
  }
  return resFixed
}

export function getIntervalCardsAsNotes(note, root) {

  let diff = note.distanceToRoot * (note.up ? -1 : 1)
  let diffAndRootsIdx = root.idx + diff
  let answerIdx =
    diffAndRootsIdx > 11
      ? diffAndRootsIdx - 12
      : diffAndRootsIdx < 0
      ? diffAndRootsIdx + 12
      : diffAndRootsIdx
  return noteAudioSrc[answerIdx]
}
