// import React from 'react'
// import { render, fireEvent, waitFor } from '@testing-library/react-native'
// import MainQuestionPage from '../MainQuestionPage.js'
// import { cardReducer } from '../../functions/functions.js'
// import { intervals } from '../../data/IntervalCards.js'
// import { noteNames } from '../../data/NoteCards.js'
// import { keys } from '../../data/KeyCards.js'
// import * as functions from '../../functions/functions.js'
// import { findNoteEquivalent } from '../../functions/functions.js'

// // Mocking only cardReducer function
// jest.mock('../../functions/functions.js', () => ({
//   // Import everything else from the module (if needed), but only mock cardReducer
//   __esModule: true, // ensures it's treated as an ES module
//   cardReducer: jest.fn(), // Mock cardReducer specifically
// }))

// it('is correct on set up ', () => {
//   cardReducer.mockReturnValue({
//     answer: 2,
//     firstCard: { idx: 0, value: keys[0] },
//     secondCard: { idx: 2, value: intervals[2] },
//     array: noteNames,
//   })
//   const reloadTimeOutMock = jest.fn()

//   const { getByTestId } = render(
//     <MainQuestionPage
//       bgColor={'purple'}
//       secondaryColor={'black'}
//       questionType={'Interval'}
//       annotated={false}
//       isRandom={false}
//       isAnimated={false}
//     />
//   )

//   expect(cardReducer).toHaveBeenCalledTimes(1)

//   const cardButton = getByTestId('D')
//   // // console.log('card butt', cardButton.tag)

//   fireEvent(cardButton, 'click')
//   fireEvent(cardButton, 'pressIn')
//   expect(reloadTimeOutMock).not.toHaveBeenCalled()
// })

// //expect
// // })
// // it('incorrect first answer ', () => {})
// // it('correct second answer ', () => {})
// // it('incorrect second answer ', () => {})
// // it('gameOVer', () => {})
