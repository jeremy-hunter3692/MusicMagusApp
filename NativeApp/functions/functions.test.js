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
} from './functions'
import { noteNames } from '../data/NoteCards'
import { keys } from '../data/KeyCards'
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

describe('getAccidentalNames', () => {
  test.skip.each([
    [keys[0], []],
    [keys[1], ['Db', 'Eb', 'F#', 'Ab', 'Bb']],
    [keys[2], ['F#', 'C#']],
    [keys[5], ['Bb']],
    [keys[6], ['F#', 'Ab', 'Bb', 'B', 'Db', 'Eb']],
    [keys[7], ['F#']],
  ])('getsCorrectAccidentalNamesFromGivenKey', (keyCard, expected) => {
    let answer = getAccidentalNames(keyCard)

    expect(answer).toEqual(expected)
    expect(answer).not.toContain('Cb')
  })
})

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
})
