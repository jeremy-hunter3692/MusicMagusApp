import { getCorrectAnswer } from './functions'

test.each([
  ['C', 'B', '7'],
  ['B', 'C', 'b2'],
  ['A', 'D', '4'],
  ['F#', 'C', '#4/b5'],
  ['Bb', 'A', '7'],

])('finds interval between two notes', (note1, note2, expected) => {
  let answer = getCorrectAnswer(note1, note2)

  expect(answer).toBe(expected)
})
