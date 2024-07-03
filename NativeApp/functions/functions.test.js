import {
  getCorrectAnswer,
  getAnswerKeyAndInterval,
  getNoteCardIdxFromIntervalAndKeyCard,
  distanceUpInIntervals,
  intervalOfWhatKey,
  getAltOctaveNotes,
} from './functions'
import { noteNames } from '../data/NoteCards'

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
  test.todo('returns alt source (8ve) if answer card is the same as the root')
  test('returns an audio source', () => {
    const note = getAltOctaveNotes({ name: 'C' }, { value: { name: 'C' } })
    console.log('nt', note)

    expect(note.slice(-4)).toBe('.ogg')
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
