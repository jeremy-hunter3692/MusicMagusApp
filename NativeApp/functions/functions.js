import { noteAudioSrc } from '../data/NotesAudiosSrc'
import { keys } from '../data/KeyCards'

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
  const result = array.filter((x) => x.name === inpt.name)
  return result[0]
}

//SORT THIS 132FUCKING TEST OUT TO DO
export function getAltOctaveNotes(note, root, testArray = noteAudioSrc) {
  let result
  //WE ARE PASSING A NOTE HERE INSTEAD OF IDX
  let noteWithIdx = getIdxAndNotes(note, testArray)
  // let altSource //= note.distanceToRoot * (note.up ? -1 : 1)
  // altSource = altSource > 11 ? altSource - 11 : altSourc
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

export function getAccidentalNames(keyCard) {
  let tempAnswer = []
  let intervals = keyCard?.intervals
  let idx = keys.findIndex((x) => x.name === keyCard.name)
  let count = 0
  intervals.forEach((x) => {
    if (x === true) {
      let answerNdx = idx + count
      answerNdx = answerNdx > 11 ? answerNdx - 12 : answerNdx
      tempAnswer.push(keys[answerNdx].name)
    }
    count = count === 4 ? count + 1 : count + 2
  })
  // Mapping over everthing here is probably ineffcient? doubtful it will inpact much though

  let answer = tempAnswer.map((x) => (x === 'Cb' ? 'B' : x))

  return answer
}

export function replaceFlatsForSharps(rootName, noteNameArr) {
  let updatedNames
  if (
    rootName === 'D' ||
    rootName === 'E' ||
    rootName === 'G' ||
    rootName === 'A' ||
    rootName === 'B'
  ) {
    updatedNames = noteNameArr.map((x) => {
      switch (x) {
        case 'Gb':
          return 'F#'
        case 'Db':
          return 'C#'
        case 'Eb':
          return 'D#'
        case 'Ab':
          return 'G#'
        case 'Bb':
          return 'A#'
        default:
          return x
      }
    })
    return updatedNames
  } else {
    return noteNameArr // Return original array if no replacements
  }
}
