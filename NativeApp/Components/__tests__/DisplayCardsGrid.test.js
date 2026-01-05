import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import DisplayCardsGrid from '../DisplayCardsGrid'
import QuestionCards from '../QuestionCards'
import CardButton from '../CardButton'
const cardImagesMock = [
  {
    name: 'C',
    intervals: [false, false, false, false, false, false, false],
    imgSrc: require('../assets/keyCards/C.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/C.mp3'),
  },
  {
    name: 'Db',
    intervals: [true, true, false, true, true, true, false],
    imgSrc: require('../assets/keyCards/Db.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Db.mp3'),
  },
  {
    name: 'D',
    intervals: [false, false, true, false, false, false, true],
    imgSrc: require('../assets/keyCards/D.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/D.mp3'),
  },
  {
    name: 'Eb',
    intervals: [true, false, false, true, true, false, false],
    imgSrc: require('../assets/keyCards/Eb.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Eb.mp3'),
  },
  {
    name: 'E',
    intervals: [false, true, true, false, false, true, true],
    imgSrc: require('../assets/keyCards/E.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/E.mp3'),
  },
  {
    name: 'F',
    intervals: [false, false, false, true, false, false, false],
    imgSrc: require('../assets/keyCards/F.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/F.mp3'),
  },
  {
    name: 'F#',
    intervals: [true, true, true, true, true, true, false],
    imgSrc: require('../assets/keyCards/Gb.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Gb.mp3'),
  },
  {
    name: 'G',
    intervals: [false, false, false, false, false, false, true],
    imgSrc: require('../assets/keyCards/G.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/G.mp3'),
  },
  {
    name: 'Ab',
    intervals: [true, true, false, true, true, false, false],
    imgSrc: require('../assets/keyCards/Ab.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Ab.mp3'),
  },
  {
    name: 'A',
    intervals: [false, false, true, false, false, true, true],
    imgSrc: require('../assets/keyCards/A.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/A.mp3'),
  },
  {
    name: 'Bb',
    intervals: [true, false, false, true, false, false, false],
    imgSrc: require('../assets/keyCards/Bb.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/Bb.mp3'),
  },
  {
    name: 'B',
    intervals: [false, true, true, false, true, true, true],
    imgSrc: require('../assets/keyCards/B.png'),
    audioSrc: require('../assets/BassDrones/DoubleBassDrones/B.mp3'),
  },
]

describe('DisplayCardsGrid', () => {
  it('renders all display images', () => {
    const mockUserAnswerSetter = jest.fn()
    const mockFindNoteFunction = jest.fn()
    const { getAllByTestId } = render(
      <DisplayCardsGrid
        stylesBool={true}
        cardsArray={cardImagesMock}
        userAnswerSetter={mockUserAnswerSetter}
        findNoteFunction={mockFindNoteFunction}
      />
    )
    const images = getAllByTestId(/image/)
    expect(images.length).toBe(12)
  })
})



describe('Question Cards', () => {
  it('renders four card images(one is hidden)', () => {
    const mockCards = {
      firstCard: { value: { imageSrc: 1 } },
      fecondCard: { value: { imageSrc: 1 } },
      answerCard: { value: { imageSrc: 1 } },
    }
    const mockResultDisplay = true
    const mockAnswerCardOnPress = jest.fn()
    const mockRootCardOnPress = jest.fn()

    const { getAllByTestId, queryAllByTestId } = render(
      <QuestionCards
        //these values are random should probably get actual values
        cardSize={{ cardwidth: 100, cardHeight: 150 }}
        cards={mockCards}
        rootCardPress={mockRootCardOnPress}
        resultDisplay={mockResultDisplay}
        answerCardOnPress={mockAnswerCardOnPress}
        answer={mockResultDisplay}
        isAnimated={true}
      />
    )
    const images = queryAllByTestId(/image/)
    expect(images.length).toBe(4)
  })
})
describe('Card Button', () => {
  it('renders one image', () => {
    const mockAnswer = cardImagesMock[0]
    const { getAllByTestId } = render(
      <CardButton data={mockAnswer?.name} source={mockAnswer?.imgSrc} />
    )
    const images = getAllByTestId(/image/)
    expect(images.length).toBe(1)
  })
})
