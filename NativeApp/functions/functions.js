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
  const result = array.filter((x) => x.name === inpt)
  return result[0]
}

//TO DOO write a test for htis
export function getAltOctaveNotes(note, root) {
  let result
  let altSource = note.distanceToRoot * (note.up ? -1 : 1)
  altSource = altSource > 11 ? altSource - 11 : altSource
  if (note.name === root.value.name) {
    result = note.audioSrc['2']
  } else {
    let cardIdx = getIdxAndNotes(note)
    result =
      cardIdx[1] > root.idx
        ? cardIdx[0].audioSrc['1']
        : cardIdx[0].audioSrc['2']
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
  return res[0]
}

export function getIntervalCardsAsNotes(note, root) {
  console.log('get interval cards')
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
