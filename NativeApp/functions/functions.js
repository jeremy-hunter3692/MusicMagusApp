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

export function findNoteEquivalentInGivenArray(inpt, array) {
  const result = array.filter((x) => x.name === inpt.name)
  return result[0]
}

export function getAltOctaveNotes(note, root, testArray) {
  let result
  //WE ARE PASSING A NOTE HERE INSTEAD OF IDX
  let noteWithIdx = getIdxAndNotes(note, testArray)
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
  let firstCard
  let secondCard
  let answerIdx

  switch (questionType) {
    case KEY:
      firstCard = randomiseKey ? returnRandomCard(keys) : firstCardProp
      secondCard = returnRandomCard(abBool ? intervals : noteNames, true)
      answerIdx = abBool
        ? getNoteCardIdxFromIntervalAndKeyCard(firstCard.idx, secondCard.idx)
        : distanceUpInIntervals(firstCard?.idx, secondCard.idx)
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
  let shouldReload = false
  let whichCircle = null
  if (correctAnswer?.name == inpt.name) {
    whichCircle = attemptCount === 0 ? true : attemptCount === 1 ? false : null
    incrementAttemptCount = false
    shouldReload = true
  } else {
    incrementAttemptCount = true
    if (attemptCount === 0) {
      shouldReload = false
      whichCircle = null
    }
  }
  return {
    incrementAttemptCount: incrementAttemptCount,
    shouldReload: shouldReload,
    whichCircle: whichCircle,
  }
}

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

export function generateModesSemiToneIncrements(
  parentScale = [2, 2, 1, 2, 2, 2, 1]
) {
  return parentScale.map((x, idx) => {
    if (idx === 0) {
      return parentScale.slice(0, parentScale.length - 1)
    } else {
      const firstHalf = parentScale.slice(0, idx - 1)
      const secondHalf = parentScale.slice(idx)
      return secondHalf.concat(firstHalf)
    }
  })
}

export function returnScaleCards(keyCard, scaleType) {
  const { idx } = getIdxAndNotes(keyCard)
  let accumulator = 0 + idx
  let answerIdxsArray = scaleType.map((x) => {
    accumulator = (accumulator + x) % 12
    return accumulator
  })
  answerIdxsArray.unshift(idx)
  return answerIdxsArray
}

export function getDataForAnnotated(inpt) {
  console.log('get data', inpt)
  if (!inpt || !inpt.value) {
    // Return a default object or null if input is missing or malformed
    return {
      topLText: '',
      topRText: '',
      bottomLText: '',
      bottomRText: '',
    }
  }
  const { distanceToRoot, up } = inpt.value
  const upOrDown = up ? 'down' : 'up'
  const orDirection = up ? 'up' : 'down'
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
    'Or we could count the empty triangles and add 6 (in this case there are ' +
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
  } else if (inpt.value.blankCard === true) {
    console.log('blank')
    return {
      topLText: `Cards and system by\nAleister James Campbell\n
www.aleisterjames.com\n
Twitter/Instagram: @aleisterjames`,
      bottomRText: 'App by Jeremy Hunter - website?',
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
}

export function getAllModesOfAKey(key, keysArray) {
  const modesIdx = generateModesSemiToneIncrements()
  let thing = returnScaleCards(key, modesIdx[0])
  let modesOfGivenKEy = thing.map((x, idx) => {
    if (idx === 0) {
      return thing
    } else {
      return returnScaleCards(keysArray[x], modesIdx[idx])
    }
  })
  return modesOfGivenKEy
}

export function getAllModesWithSameRootNote(rootNote, keysArray) {
  const modesIdx = generateModesSemiToneIncrements()
  modesIdx.forEach((x) => {
    let ret = returnScaleCards(rootNote, x)
    ret.forEach((y) => {
      return keysArray[y].name
    })
  })
}

export function getScale(rootCard, scaleType, array) {
  let res = returnScaleCards(rootCard, scaleType)
  let makeScaleArr = res.map((x) => {
    return array[x]
  })
  return makeScaleArr
}
// let idxs = getAllModesOfAKey(keys[11])
// // console.log(idxs)
// idxs.forEach((x) => {
//   // console.log(x)
//   x.forEach((y) => {
//     // console.log(keys[y].name)
//   })
// })
