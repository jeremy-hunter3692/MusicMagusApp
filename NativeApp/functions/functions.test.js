import {
  getIntervalBetweenTwoNoteCards,
  getAnswerKeyAndInterval,
  getIntervalCardAsNoteCard,
} from './functions'
import { noteNames } from '../data/NoteCards'
describe('getIntervalBetweenTwoNoteCards', () => {
  test.each([
    [{ idx: 0 }, { idx: 11 }, '7'],
    [{ idx: 1 }, { idx: 0 }, '7'],
    [{ idx: 11 }, { idx: 0 }, '7'],
    [{ idx: 4 }, { idx: 2 }, 'b7'],
    [{ idx: 6 }, { idx: 0 }, '#4/b5'],
    [{ idx: 0 }, { idx: 6 }, '#4/b5'],
  ])('finds interval between two notes', (note1, note2, expected) => {
    let result = getIntervalBetweenTwoNoteCards(note1, note2)

    expect(result.name).toBe(expected)
  })
})
describe('getAnswerKeyAndInterval', () => {
  test.each([
    [{ idx: 8 }, { idx: 4 }, 'C'],
    [{ idx: 6 }, { idx: 11 }, 'F'],
    [{ idx: 11 }, { idx: 11 }, 'Bb'],
    [{ idx: 10 }, { idx: 11 }, 'A'],
    [{ idx: 11 }, { idx: 1 }, 'C'],
  ])('finds note x interval away from root notes', (note1, note2, expected) => {
    let result = getAnswerKeyAndInterval(note1, note2, noteNames)

    expect(result.name).toBe(expected)
  })
})
describe('getIntervalCardAsNoteCard', () => {
  test.each([
    [
      {
        name: '1',
        distanceToRoot: 0,
        up: false,
        imgSrc: require('../assets/intervalCards/1.png'),
      },
      {
        value: { name: 'B', imgSrc: require('../assets/noteCards/B.png') },
        idx: 11,
      },
      {
        name: 'B',
        audioSrc: {
          1: require('../assets/noteSounds/B1.ogg'),
          2: require('../assets/noteSounds/B2.ogg'),
        },
      },
    ],
    [
      {
        name: '4',
        distanceToRoot: 5,
        up: false,
        imgSrc: require('../assets/intervalCards/4.png'),
      },
      {
        value: { name: 'B', imgSrc: require('../assets/noteCards/B.png') },
        idx: 11,
      },
      {
        name: 'E',
        audioSrc: {
          1: require('../assets/noteSounds/E1.ogg'),
          2: require('../assets/noteSounds/E2.ogg'),
        },
      },
    ],
    [
      {
        name: '#4/b5',
        distanceToRoot: 6,
        up: null,
        imgSrc: require('../assets/intervalCards/b5.png'),
      },
      {
        value: { name: 'C', imgSrc: require('../assets/noteCards/C.png') },
        idx: 0,
      },
      {
        name: 'F#',
        audioSrc: {
          1: require('../assets/noteSounds/Gb1.ogg'),
          2: require('../assets/noteSounds/Gb2.ogg'),
        },
      },
    ],
    [
      {
        name: '#4/b5',
        distanceToRoot: 6,
        up: null,
        imgSrc: require('../assets/intervalCards/b5.png'),
      },
      {
        value: { name: 'B', imgSrc: require('../assets/noteCards/B.png') },
        idx: 11,
      },
      {
        name: 'F',
        audioSrc: {
          1: require('../assets/noteSounds/F1.ogg'),
          2: require('../assets/noteSounds/F2.ogg'),
        },
      },
    ],
    [
      {
        name: '7',
        distanceToRoot: 1,
        up: true,
        imgSrc: require('../assets/intervalCards/7.png'),
      },
      {
        value: { name: 'Eb', imgSrc: require('../assets/noteCards/Eb.png') },
        idx: 3,
      },

      {
        name: 'D',
        audioSrc: {
          1: require('../assets/noteSounds/D1.ogg'),
          2: require('../assets/noteSounds/D2.ogg'),
        },
      },
    ],
    [
      {
        name: '5',
        distanceToRoot: 5,
        up: true,
        imgSrc: require('../assets/intervalCards/5.png'),
      },
      {
        value: { name: 'F', imgSrc: require('../assets/noteCards/F.png') },
        idx: 5,
      },
      {
        name: 'C',
        audioSrc: {
          1: require('../assets/noteSounds/C1.ogg'),
          2: require('../assets/noteSounds/C2.ogg'),
        },
      },
    ],
  ])(
    'returns correct note card when given a root and interval card',
    (intervalCard, randomRoot, expected) => {
      let result = getIntervalCardAsNoteCard(intervalCard, randomRoot)
      //Not sure if stirct equal is correct here given the mock data
      expect(result).toStrictEqual(expected)
    }
  )
})

describe('getAltOctaveNotes', () => {
  test('If give note is same as root reuturn 8ve higher', () => {
      let note 
      let randomRoot 

    let answer = getAltOctaveNotes(note, randomRoot)
    let expected 
  })
})
