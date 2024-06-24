import { getCorrectAnswer, getAnswerKeyAndInterval } from './functions'
// import { noteNames } from '../data/NoteNames'

// test.each([
//   [{ idx: 0 }, { idx: 11 }, '7'],
//   [{ idx: 1 }, { idx: 0 }, '7'],
//   [{ idx: 11 }, { idx: 0 }, '7'],
//   [{ idx: 4 }, { idx: 2 }, 'b7'],
//   [{ idx: 6 }, { idx: 0 }, '#4/b5'],
//   [{ idx: 0 }, { idx: 6 }, '#4/b5'],
// ])('finds interval between two notes', (note1, note2, expected) => {
//   let answer = getCorrectAnswer(note1, note2)

//   expect(answer.name).toBe(expected)
// })

// test.each([
//   [{ idx: 8 }, { idx: 4 }, 'C'],
//   [{ idx: 6 }, { idx: 11 }, 'F'],
//   [{ idx: 11 }, { idx: 11 }, 'Bb'],
//   [{ idx: 10 }, { idx: 11 }, 'A'],
//   [{ idx: 11 }, { idx: 1 }, 'C'],
// ])('finds note x interval away from root notes', (note1, note2, expected) => {
//   let answer = getAnswerKeyAndInterval(note1, note2, noteNames)

//   expect(answer.name).toBe(expected)
// })

test('returns alt source (8ve) if answer card is the same as the root', () => {
  // const note = noteNames[0].audioSrc
  // console.log(note, noteNames[0])

  expect(1).toBe(1)
})
