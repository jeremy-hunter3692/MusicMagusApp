import { getCorrectAnswer } from './functions'

test.each([
  ['0', '11', '7'],
  ['11', '0', 'b2'],
  ['4', '2', 'b7'],
  ['6', '0', '#4/b5'],
  ['0', '6', '#4/b5'],
])('finds interval between two notes', (note1, note2, expected) => {
  let answer = getCorrectAnswer(note1, note2)

  expect(answer).toBe(expected)
})
