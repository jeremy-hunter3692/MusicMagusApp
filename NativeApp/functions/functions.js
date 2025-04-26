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
  console.log('note:', note)
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
        // case 'Gb':
        //   return 'F#'
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
  } else if (rootName === 'Db' || rootName === 'F#' || rootName === 'Gb') {
    updatedNames = noteNameArr.map((x) => {
      let updated = x === 'F#' ? 'Gb' : x
      return updated
    })
    return updatedNames
  } else {
    return noteNameArr // Return original array if no replacements
  }
}

const KEY = 'Key'
const NOTE = 'Note'
const INTERVAL = 'Interval'

export const cardReducer = (
  questionType,
  abBool,
  randomiseKey,
  firstCardProp
) => {
  let firstCard = !randomiseKey ? firstCardProp : null
  let secondCard
  let answerIdx
  // console.log(' in reducer:', firstCardProp, abBool, questionType)
  switch (questionType) {
    case KEY:
      firstCard = randomiseKey ? returnRandomCard(keys) : firstCard
      secondCard = returnRandomCard(abBool ? intervals : noteNames, true)
      answerIdx = abBool
        ? getNoteCardIdxFromIntervalAndKeyCard(firstCard.idx, secondCard.idx)
        : distanceUpInIntervals(firstCard.idx, secondCard.idx)
      console.log(
        'firstCard:',
        firstCard,
        'secondCard:',
        secondCard,
        'answerIdx:',
        answerIdx
      )
      return {
        firstCardFromReducer: firstCard,
        secondCardFromReducer: secondCard,
        array: abBool ? noteNames : intervals,
        answerIdx: answerIdx,
      }
    case INTERVAL:
      firstCard = returnRandomCard(intervals, true)
      secondCard = returnRandomCard(abBool ? noteNames : keys, true)
      answerIdx = abBool
        ? intervalOfWhatKey(secondCard.idx, firstCard.idx)
        : getNoteCardIdxFromIntervalAndKeyCard(secondCard.idx, firstCard.idx)
      return {
        firstCardFromReducer: firstCard,
        secondCardFromReducer: secondCard,
        array: abBool ? keys : noteNames,
        answerIdx: answerIdx,
      }
    case NOTE:
      firstCard = returnRandomCard(noteNames, true)
      secondCard = returnRandomCard(abBool ? keys : intervals, true)
      answerIdx = abBool
        ? distanceUpInIntervals(secondCard.idx, firstCard.idx)
        : intervalOfWhatKey(firstCard.idx, secondCard.idx)
      return {
        firstCardFromReducer: firstCard,
        secondCardFromReducer: secondCard,
        array: abBool ? intervals : keys,
        answerIdx: answerIdx,
      }
    default:
      console.log(`broken switch in card reducer`)
  }
}

// function getRelativeMinor() {
//   let minor = keys[data.idx - 3]?.name
//   return replaceFlatsForSharps(minor, [minor])
// }

export function correctAnswer(inpt, attemptCount, question) {}

export function returnAnswerType(inpt, correctAnswer, attemptCount) {
  let incrementAttemptCount
  let incrementQuestionNo
  let shouldReload = false
  let whichCircle = null

  if (correctAnswer?.name == inpt.name) {
    whichCircle = attemptCount === 0 ? true : attemptCount === 1 ? false : null
    incrementAttemptCount = false
    incrementQuestionNo = true
    shouldReload = true
  } else {
    incrementAttemptCount = true
    incrementQuestionNo = false
    if (attemptCount === 0) {
      shouldReload = false
      whichCircle = null
      //   incrementQuestionNo = false
      //   shouldReload = false
      //   whichCircle = null
      //   attempt = attemptCount + 1
    }
  }
  return {
    incrementAttemptCount: incrementAttemptCount,
    incrementQuestionNo: incrementQuestionNo,
    shouldReload: shouldReload,
    whichCircle: whichCircle,
  }
}

//needTo  setUserAnswer(inpt)

export function returnScoreText(score) {
  return score === 12
    ? `Perfect!`
    : score > 9
    ? 'Excellent!'
    : score > 6
    ? 'Commendable'
    : score > 3
    ? 'Keep Practising!'
    : `Rome wasn't built in a day`
}

function getNoOfAccidentals(inpt) {
  return inpt.value.intervals.reduce(
    (count, value) => count + (value === true ? 1 : 0),
    0
  )
}

export function getDataForAnnotated(inpt) {
  const { distanceToRoot, up } = inpt.value
  const upOrDown = up ? 'Down' : 'Up'
  const orDirection = up ? 'Up' : 'Down'
  const extraUpOrDownText = up ? 'hanging down.' : 'pointing up.'
  const altIntervalDistance = 12 - distanceToRoot
  const intervalCardText =
    'These Half-steps are ' +
    extraUpOrDownText +
    ' the number of black ones will tell us how many Half-steps to count ' +
    upOrDown +
    ' from any Root note. In this case there is ' +
    inpt.value.distanceToRoot +
    '. '
  const orIntervalText =
    'Or we could count the empty triangles and add 6, (in this case there are ' +
    altIntervalDistance +
    ') and count ' +
    orDirection +
    ' from any root note. '

  const halfStepS = distanceToRoot > 1 ? ' Half-steps.' : ' Half-step.'
  const smallIntervalText =
    'Distance to nearest root: ' +
    upOrDown +
    ' ' +
    inpt.value.distanceToRoot +
    halfStepS +
    '   '
  if (
    typeof inpt.value?.distanceToRoot === 'number' &&
    typeof inpt.value?.up != 'undefined'
  ) {
    return {
      topLText: 'Interval: ' + inpt.value.name,
      topRText: '',
      bottomLText: smallIntervalText,
      bottomRText: intervalCardText + orIntervalText + ' ',
    }
  } else if (
    typeof inpt.value.intervals === 'undefined' &&
    typeof inpt.value.distanceToRoot === 'undefined'
  ) {
    return {
      topLText: inpt.value.name,
      topRText: '',
      bottomLText: '',
      bottomRText: '',
    }
  } else if (inpt.value.intervals && inpt.value.audioSrc) {
    let relMinorIdx = inpt.idx - 3 < 0 ? inpt.idx - 3 + 12 : inpt.idx - 3
    let santisedAccidentals = replaceFlatsForSharps(
      inpt.value.name,
      getAccidentalNames(inpt.value)
    )
    let noOfAccidentals = getNoOfAccidentals(inpt)
    let accidentalsText =
      'Accidentals : ' +
      noOfAccidentals +
      ' ' +
      (noOfAccidentals > 0 ? ' (' + santisedAccidentals + ')' : '')
    return {
      topLText: 'Key: ' + inpt.value.name,
      topRText: '',
      bottomLText: 'Relative Minor: ' + keys[relMinorIdx]?.name,
      bottomRText: accidentalsText,
    }
  } else {
    console.log('broken switch in getDataForAnnotated')
    return 'brken'
  }

  // let correctData = {
  //   topLText: 'Key:',
  //   topRText: '',
  //   bottomLText: 'Relative Minor:',
  //   bottomRText: 'Accidentals :',
  // }

  // return correctData
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
