import {
  getCorrectAnswer,
  getAnswerKeyAndInterval,
  getNoteCardIdxFromIntervalAndKeyCard,
  distanceUpInIntervals,
  intervalOfWhatKey,
  getAltOctaveNotes,
  returnRandomCard,
  getAccidentalNames,
  replaceFlatsForSharps,
  cardReducer,
  getDataForAnnotated,
  returnScoreText,
  returnAnswerType,
  returnScaleCards,
  cutArrayForModes,
} from './functions'
import { noteNames } from '../data/NoteCards'
import { keys } from '../data/KeyCards'
import { intervals } from '../data/IntervalCards'
import { noteAudioSrcMock } from '../__mocks__/noteSoundsMock'

test.each([
  [0, 8, 'E'],
  [8, 1, 'G'],
  [0, 0, 'C'],
  [11, 0, 'B'],
  [11, 8, 'Eb'],
  [4, 6, 'Bb'],
])(
  'finds note x interval away from root notes',
  (noteCardIdx, intervalCardIdx, expected) => {
    let answerIdx = intervalOfWhatKey(noteCardIdx, intervalCardIdx)
    let actualAnswer = noteNames[answerIdx]
    expect(actualAnswer.name).toBe(expected)
  }
)
describe('getAltOvtaveNotes(notes, root)', () => {
  // test('WONT WORK BECAUSE OF MOCKS-TO DO. returns an audio source', () => {
  //   const note = getAltOctaveNotes(0, { value: { name: 'C' } })

  //   expect(note.slice(-4)).toBe('.ogg')
  // })

  test('returns alt source (8ve) if answer card is the same as the root', () => {
    const note = getAltOctaveNotes(
      { name: 'C' },
      { value: { name: 'C' }, idx: 0 },
      noteAudioSrcMock
    )

    expect(note).toBe('C2')
  })
  test('If note should be above root note, returns alt octave 2', () => {
    const note = getAltOctaveNotes(
      { name: 'C' },
      { value: { name: 'B' }, idx: 11 },
      noteAudioSrcMock
    )

    expect(note).toBe('C2')
  })
  test('2-If note should be above root note, returns alt octave 2', () => {
    const note = getAltOctaveNotes(
      { name: 'F' },
      { value: { name: 'F#' }, idx: 6 },
      noteAudioSrcMock
    )

    expect(note).toBe('F2')
  })
  test('3-If note should be above root note, returns alt octave 2', () => {
    const note = getAltOctaveNotes(
      { name: 'C' },
      { value: { name: 'F#' }, idx: 6 },
      noteAudioSrcMock
    )

    expect(note).toBe('C2')
  })
})

describe('distance between two notes', () => {
  test.each([
    [0, 0, 0],
    [0, 11, 11],
    [0, 6, 6],
    [11, 11, 10],
    [4, 11, 3],
    [11, 2, 1],
    [11, 7, 6],
  ])(
    'returns idx of note card from keyCard and Interval',
    (keyCard, intervalCard, expected) => {
      let answer = getNoteCardIdxFromIntervalAndKeyCard(keyCard, intervalCard)

      expect(answer).toBe(expected)
    }
  )
})

describe('distanceUpInIntervals', () => {
  test.each([
    [0, 0, 0],
    [0, 7, 7],
    [11, 0, 1],
    [11, 10, 11],
    [6, 0, 6],
  ])(
    'gets distance or itirating forward through array. I.e  given  what interval is y(note) from x(key)',
    (rootNoteIDX, secondCardIdx, expected) => {
      let answer = distanceUpInIntervals(rootNoteIDX, secondCardIdx)

      expect(answer).toBe(expected)
    }
  )
})

describe('returnRandCard', () => {
  test('name exists and is a string', () => {
    let answer = returnRandomCard(noteNames)

    expect(typeof answer.value.name).toBe('string')
  })
  test('idx exists and is a number', () => {
    let answer = returnRandomCard(noteNames)
    expect(typeof answer.idx).toBe('number')
  })

  //look this up
  test('idx is never 0 if omitRoot is true', () => {
    const iterations = 100
    const results = []
    for (let i = 0; i < iterations; i++) {
      results.push(returnRandomCard(noteNames, true))
    }

    const counts = results.reduce((acc, { idx }) => {
      acc[idx] = (acc[idx] || 0) + 1
      return acc
    }, {})

    expect(counts[0]).toBeUndefined()
  })
})

describe('returnAnswerType', () => {
  test('returns correctly if first guess is correct', () => {
    const result = returnAnswerType({ name: 'Bb' }, { name: 'Bb' }, 0)
    const answer = {
      incrementAttemptCount: false,
      incrementQuestionNo: true,
      shouldReload: true,
      whichCircle: true,
    }
    expect(answer).toEqual(result)
  })
  test('returns correctly if first guess is incorrect', () => {
    const result = returnAnswerType({ name: 'Bb' }, { name: 'A' }, 0)
    const answer = {
      incrementAttemptCount: true,
      incrementQuestionNo: false,
      shouldReload: false,
      //figure this out
      whichCircle: null,
    }
    expect(answer).toEqual(result)
  })
  test('returns correctly if second guess is correct', () => {
    const result = returnAnswerType({ name: 'Bb' }, { name: 'Bb' }, 1)
    const answer = {
      incrementAttemptCount: false,
      incrementQuestionNo: true,
      shouldReload: true,
      whichCircle: false,
    }
    expect(answer).toEqual(result)
  })
  test('returns correctly if second guess is Inorrect', () => {
    const result = returnAnswerType({ name: 'Bb' }, { name: 'A' }, 2)
    const answer = {
      incrementAttemptCount: true,
      incrementQuestionNo: false,
      shouldReload: false,
      whichCircle: null,
    }
    expect(answer).toEqual(result)
  })
})

// describe('getAccidentalNames', () => {
//   test.each([
//     [keys[0], []],
//     [keys[1], ['Db', 'Eb', 'F#', 'Ab', 'Bb']],
//     [keys[2], ['F#', 'C#']],
//     [keys[5], ['Bb']],
//     [keys[6], ['', 'Ab', 'Bb', 'B', 'Db', 'Eb']],
//     [keys[7], ['F#']],
//   ])('getsCorrectAccidentalNamesFromGivenKey', (keyCard, expected) => {
//     let answer = getAccidentalNames(keyCard)

//     expect(answer).toEqual(expected)
//     expect(answer).not.toContain('Cb')
//   })
// })

describe('replaceFlatsForSharps', () => {
  const flatNotes = ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Gb']
  test.each([
    ['D', keys[2]],
    ['E', keys[4]],
    ['G', keys[7]],
    ['A', keys[9]],
    ['B', keys[11]],
  ])('replaces flats for sharps if key is D, E, A or B', (keyName, array) => {
    let accidentalsArray = getAccidentalNames(array)
    let answer = replaceFlatsForSharps(keyName, accidentalsArray)
    flatNotes.forEach((note) => {
      expect(answer).not.toContain(note)
    })
  })
  test.each([
    ['Eb', keys[3]],
    ['Gb', keys[6]],
    ['Db', keys[1]],
  ])(
    'replaces F# with Gb in the appropriate keys - Gb Db',
    (keyName, array) => {
      let accidentalsArray = getAccidentalNames(array)
      let answer = replaceFlatsForSharps(keyName, accidentalsArray)
      expect(answer).not.toContain('F#')
    }
  )
})

describe('question card reducer', () => {
  test('returns obj with img SRc', () => {
    let answerObj = cardReducer('Key', false, true)
    expect(answerObj.firstCard.value.imgSrc).toBe(1)
    expect(answerObj.secondCard.value.imgSrc).toBe(1)
  })
  test('gets correct array card type for key and true', () => {
    let answerObj = cardReducer('Key', true)
    expect(answerObj.array[0].name).toBe('C')
    expect(answerObj.array[0].intervals).toBe(undefined)
    expect(answerObj.array[0].up).toBe(undefined)
    expect(answerObj.array[0].distanceToRoot).toBe(undefined)
    expect(answerObj.array[0].intervals).toBe(undefined)
  })

  test('gets correct array card type for key and false', () => {
    let answerObj = cardReducer('Key', false)
    expect(answerObj.array[0].name).toBe('1')
    expect(answerObj.array[0].intervals).toBe(undefined)
    expect(answerObj.array[0].up).toBe(false)
    expect(answerObj.array[0].distanceToRoot).toBe(0)
    expect(answerObj.array[0].intervals).toBe(undefined)
  })

  test('gets correct array card type for interval and true', () => {
    let answerObj = cardReducer('Interval', true)
    expect(answerObj.array[0].name).toBe('C')
    expect(answerObj.array[0].up).toBe(undefined)
    expect(answerObj.array[0].distanceToRoot).toBe(undefined)
    answerObj.array[0].intervals.forEach((interval, index) => {
      expect(interval).toBe(false)
    })
  })
  test('gets correct array card type for interval and false', () => {
    let answerObj = cardReducer('Interval', false)
    expect(answerObj.array[0].name).toBe('C')
    expect(answerObj.array[0].intervals).toBe(undefined)
    expect(answerObj.array[0].up).toBe(undefined)
    expect(answerObj.array[0].distanceToRoot).toBe(undefined)
    expect(answerObj.array[0].intervals).toBe(undefined)
  })

  test('gets correct array card type for note and true', () => {
    let answerObj = cardReducer('Note', true)
    expect(answerObj.array[0].name).toBe('1')
    expect(answerObj.array[0].intervals).toBe(undefined)
    expect(answerObj.array[0].up).toBe(false)
    expect(answerObj.array[0].distanceToRoot).toBe(0)
    expect(answerObj.array[0].intervals).toBe(undefined)
  })
  test('gets correct array card type for note and false', () => {
    let answerObj = cardReducer('Note', false)
    expect(answerObj.array[0].name).toBe('C')
    expect(answerObj.array[0].up).toBe(undefined)
    expect(answerObj.array[0].distanceToRoot).toBe(undefined)
    answerObj.array[0].intervals.forEach((interval, index) => {
      expect(interval).toBe(false)
    })
  })
})

describe('annotated card reducer', () => {
  test('gets right info for key C card', () => {
    let inpt = { value: keys[0], idx: 0 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('Key: C')
    expect(answer.bottomLText).toBe('Relative Minor: A')
    expect(answer.bottomRText).toBe('Accidentals : 0 ')
    expect(answer.topRText).toBe('')
  })
  test('gets right info for key card Gb', () => {
    let inpt = { value: keys[6], idx: 6 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('Key: F#')
    expect(answer.bottomLText).toBe('Relative Minor: Eb')
    // expect(answer.bottomRText).toBe('Accidentals :6|')
    expect(answer.topRText).toBe('')
  })
  test('gets right info for key card E', () => {
    let inpt = { value: keys[4], idx: 4 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('Key: E')
    expect(answer.bottomLText).toBe('Relative Minor: Db')
    expect(answer.bottomRText).toBe('Accidentals : 4  (F#,G#,C#,D#)')
    expect(answer.topRText).toBe('')
  })

  test('gets right info for C interval card', () => {
    let inpt = { value: intervals[0], idx: 0 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('Interval: 1')
    expect(answer.bottomLText).toBe(
      'Distance to nearest root: Up 0 Half-step.   '
    )
    expect(answer.bottomRText).toBe(
      'These Half-steps are pointing up. the number of black ones will tell us how many Half-steps to count Up from any Root note. In this case there is 0. Or we could count the empty triangles and add 6, (in this case there are 12) and count Down from any root note.  '
    )
    expect(answer.topRText).toBe('')
  })
  test('gets right info for F# interval card', () => {
    let inpt = { value: intervals[6], idx: 6 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('Interval: #4/b5')
    expect(answer.bottomLText).toBe(
      'Distance to nearest root: Up 6 Half-steps.   '
    )
    expect(answer.bottomRText).toBe(
      'These Half-steps are pointing up. the number of black ones will tell us how many Half-steps to count Up from any Root note. In this case there is 6. Or we could count the empty triangles and add 6, (in this case there are 6) and count Down from any root note.  '
    )
    expect(answer.topRText).toBe('')
  })
  test('gets right info for C note card', () => {
    let inpt = { value: noteNames[0], idx: 0 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('C')
    expect(answer.bottomLText).toBe('')
    expect(answer.bottomRText).toBe('')
    expect(answer.topRText).toBe('')
  })
  test('gets right info for B note card', () => {
    let inpt = { value: noteNames[11], idx: 11 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('B')
    expect(answer.bottomLText).toBe('')
    expect(answer.bottomRText).toBe('')
    expect(answer.topRText).toBe('')
  })
  test('gets right info for c note card', () => {
    let inpt = { value: noteNames[0], idx: 0 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('C')
    expect(answer.bottomLText).toBe('')
    expect(answer.bottomRText).toBe('')
    expect(answer.topRText).toBe('')
  })
  test('gets right info for F# note card', () => {
    let inpt = { value: noteNames[6], idx: 6 }
    let answer = getDataForAnnotated(inpt)
    expect(answer.topLText).toBe('F#')
    expect(answer.bottomLText).toBe('')
    expect(answer.bottomRText).toBe('')
    expect(answer.topRText).toBe('')
  })
})

describe('return associated text for given score', () => {
  const scoreTexts = [
    { score: 12, text: 'Perfect!' },
    { score: 10, text: 'Excellent!' },
    { score: 7, text: 'Commendable' },
    { score: 6, text: 'Keep Practising!' },
    { score: 0, text: "Rome wasn't built in a day" },
    { score: 11, text: 'Excellent!' },
    { score: 9, text: 'Commendable' },
    { score: 5, text: 'Keep Practising!' },
    { score: 3, text: "Rome wasn't built in a day" },
  ]

  test.each(scoreTexts)(
    'returns correct text for score %i',
    ({ score, text }) => {
      const result = returnScoreText(score)

      expect(result).toBe(text)
    }
  )
})

describe('returnsScaleCards', () => {
  const parentScale = [2, 2, 1, 2, 2, 2, 1]
  const majorSemiTonesIncrement = parentScale.slice(0, -1)
  const mixoSemiTonesIncrement = cutArrayForModes(4)
  const dorianSemiTonesIncrement = cutArrayForModes(1)

  test.each([
    [keys[0], mixoSemiTonesIncrement, [0, 2, 4, 5, 7, 9, 10]],
    [keys[5], mixoSemiTonesIncrement, [5, 7, 9, 10, 0, 2, 3]],
    [keys[11], mixoSemiTonesIncrement, [11, 1, 3, 4, 6, 8, 9]],
    [keys[6], mixoSemiTonesIncrement, [6, 8, 10, 11, 1, 3, 4]],
  ])(
    'gets right idxs for given key and Mixolydian scale ',
    (keyCard, scale, array) => {
      let answer = returnScaleCards(keyCard, scale)
      // expect(answer).toEqual(array)
      expect(answer).toEqual(array)
    }
  )

  test.each([
    [keys[0], majorSemiTonesIncrement, [0, 2, 4, 5, 7, 9, 11]],
    [keys[5], majorSemiTonesIncrement, [5, 7, 9, 10, 0, 2, 4]],
    [keys[11], majorSemiTonesIncrement, [11, 1, 3, 4, 6, 8, 10]],
    [keys[6], majorSemiTonesIncrement, [6, 8, 10, 11, 1, 3, 5]],
  ])(
    'gets right idxs for given key and Major scale ',
    (keyCard, scale, array) => {
      let answer = returnScaleCards(keyCard, scale)
      // expect(answer).toEqual(array)
      expect(answer).toEqual(array)
    }
  )

  test.each([
    [keys[0], dorianSemiTonesIncrement, [0, 2, 3, 5, 7, 9, 10]],
    [keys[5], dorianSemiTonesIncrement, [5, 7, 8, 10, 0, 2, 3]],
    [keys[11], dorianSemiTonesIncrement, [11, 1, 2, 4, 6, 8, 9]],
    [keys[6], dorianSemiTonesIncrement, [6, 8, 9, 11, 1, 3, 4]],
  ])(
    'gets right idxs for given key and Dorian Minor scale ',
    (keyCard, scale, array) => {
      let answer = returnScaleCards(keyCard, scale)
      expect(answer).toEqual(array)
    }
  )
})
