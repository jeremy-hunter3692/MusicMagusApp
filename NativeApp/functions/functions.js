import { noteAudioSrc } from '../data/NotesAudiosSrc'
import { keys } from '../data/KeyCards'
import { noteNames } from '../data/NoteCards'
import { intervals } from '../data/IntervalCards'

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

const KEY = 'Key'
const NOTE = 'Note'
const INTERVAL = 'Interval'

///psued0
// State is and object that has:
//First Card(named anyways), SecondCard, Answer, DisplayARray, Drone Audio source
//A/B Format will bet KEY, INTERVAL with a bool for changing display at the front end
export const cardReducer = (questionType, abBool) => {
  // console.log(' in reducer:', questionType,abBool)
  let firstCard
  let secondCard
  let answerIdx
  switch (questionType) {
    case KEY:
      firstCard = returnRandomCard(keys)
      secondCard = returnRandomCard(abBool ? intervals : noteNames, true)

      answerIdx = abBool
        ? getNoteCardIdxFromIntervalAndKeyCard(firstCard.idx, secondCard.idx)
        : distanceUpInIntervals(firstCard.idx, secondCard.idx)
      return {
        firstCard: firstCard,
        secondCard: secondCard,
        array: abBool ? noteNames : intervals,
        answer: answerIdx,
      }
    case INTERVAL:
      firstCard = returnRandomCard(intervals, true)
      secondCard = returnRandomCard(abBool ? noteNames : keys, true)
      answerIdx = abBool
        ? intervalOfWhatKey(secondCard.idx, firstCard.idx)
        : getNoteCardIdxFromIntervalAndKeyCard(secondCard.idx, firstCard.idx)
      return {
        firstCard: firstCard,
        secondCard: secondCard,
        array: abBool ? keys : noteNames,
        answer: answerIdx,
      }
    case NOTE:
      firstCard = returnRandomCard(noteNames, true)
      secondCard = returnRandomCard(abBool ? keys : intervals, true)
      answerIdx = abBool
        ? distanceUpInIntervals(secondCard.idx, firstCard.idx)
        : intervalOfWhatKey(firstCard.idx, secondCard.idx)
      return {
        firstCard: firstCard,
        secondCard: secondCard,
        array: abBool ? intervals : keys,
        answer: answerIdx,
      }
  }
}

// if (questionType === 'Interval') {
//   const { firstCard, secondCard, array, answer } = cardReducer('Key')
//   arrayTemp = array
//   firstCardTemp = firstCard
//   secondCardTemp = secondCard
//   answerIdxTemp = answer
// } else if (questionType === 'Note') {
//   arrayTemp = intervals
//   secondCardTemp = returnRandomCard(noteNames, true)
//   answerIdxTemp = distanceUpInIntervals(
//     firstCardTemp.idx,
//     secondCardTemp.idx
//   )
// } else if (questionType === 'Key') {
//   arrayTemp = keys
//   firstCardTemp = {
//     value: {
//       ...firstCardTemp.value,
//       imgSrc: noteNames[firstCardTemp.idx].imgSrc,
//     },
//     idx: firstCardTemp.idx,
//   }

//   secondCardTemp = returnRandomCard(intervals, true)
//   answerIdxTemp = intervalOfWhatKey(firstCardTemp.idx, secondCardTemp.idx)
// }
