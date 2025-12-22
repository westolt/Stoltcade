import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Scoreboard from './Scoreboard'

test('renders top 10 scores correctly', () => {
  const scores = [
    { id: 1, score: 100, user: { username: 'Venla' } },
    { id: 2, score: 65, user: { username: 'Will' } }
  ]

  render(<Scoreboard scoreboard={scores} />)

  expect(screen.getByText('TOP 10 Highscores:')).toBeInTheDocument()
  expect(screen.getByText('Venla: 100')).toBeInTheDocument()
  expect(screen.getByText('Will: 65')).toBeInTheDocument()
})
