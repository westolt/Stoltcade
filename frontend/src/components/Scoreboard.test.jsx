import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Scoreboard from './Scoreboard'

test('renders top 10 scores correctly', () => {
  const scores = [
    { id: 1, score: 100, user: { username: 'Venla' } },
    { id: 2, score: 65, user: { username: 'Will' } },
    { id: 3, score: 90, user: { username: 'Katariina' } },
    { id: 4, score: 39, user: { username: 'Vivian' } },
    { id: 5, score: 55, user: { username: 'Eero' } },
    { id: 6, score: 24, user: { username: 'Kalle' } },
    { id: 7, score: 98, user: { username: 'Ilmo' } },
    { id: 8, score: 14, user: { username: 'Niklas' } },
    { id: 9, score: 47, user: { username: 'Otso' } },
    { id: 10, score: 77, user: { username: 'Ella' } },
    { id: 11, score: 1, user: { username: 'Aleksi' } },
  ]

  render(<Scoreboard scoreboard={scores} />)


  expect(screen.getByText('TOP 10 Highscores:')).toBeInTheDocument()

  expect(screen.getByText('Venla')).toBeInTheDocument()
  expect(screen.getByText('100')).toBeInTheDocument()
  expect(screen.getByText('Will')).toBeInTheDocument()
  expect(screen.getByText('65')).toBeInTheDocument()
  expect(screen.getByText('Katariina')).toBeInTheDocument()
  expect(screen.getByText('90')).toBeInTheDocument()
  expect(screen.getByText('Vivian')).toBeInTheDocument()
  expect(screen.getByText('39')).toBeInTheDocument()
  expect(screen.getByText('Eero')).toBeInTheDocument()
  expect(screen.getByText('55')).toBeInTheDocument()
  expect(screen.getByText('Kalle')).toBeInTheDocument()
  expect(screen.getByText('24')).toBeInTheDocument()
  expect(screen.getByText('Ilmo')).toBeInTheDocument()
  expect(screen.getByText('98')).toBeInTheDocument()
  expect(screen.getByText('Niklas')).toBeInTheDocument()
  expect(screen.getByText('14')).toBeInTheDocument()
  expect(screen.getByText('Otso')).toBeInTheDocument()
  expect(screen.getByText('47')).toBeInTheDocument()
  expect(screen.getByText('Ella')).toBeInTheDocument()
  expect(screen.getByText('77')).toBeInTheDocument()
})
