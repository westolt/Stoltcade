import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, beforeEach, vi } from 'vitest'
import User from './User'

vi.mock('../services/scores', () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve([
        {
            id: 1,
            score: 10,
            user: { username: 'testuser' },
            game: { name: 'PeriodicPairs' }
        }
    ]))
  }
}))

vi.mock('../services/users', () => ({
  default: {
    setToken: vi.fn(),
    updateImage: vi.fn()
  }
}))

test('shows login and register when not logged in', () => {
  window.localStorage.clear()

  render(<User />)

  expect(screen.getByText(/login/i)).toBeInTheDocument()
  expect(screen.getByText(/register/i)).toBeInTheDocument()
})

beforeEach(() => {
  window.localStorage.setItem(
    'loggedUser',
    JSON.stringify({ username: 'testuser', token: '123' })
  )
})

test('shows username when user is logged in', async () => {
  render(<User />)

  expect(await screen.findByText('testuser')).toBeInTheDocument()
})

test('shows user scores', async () => {
  render(<User />)

  expect(await screen.findByText(/PeriodicPairs: 10/)).toBeInTheDocument()
})

test('logout clears user data', async () => {
  render(<User />)

  await screen.findByText('testuser')
  const user = userEvent.setup()
  await user.click(screen.getByText('Logout'))

  expect(screen.getByText(/login/i)).toBeInTheDocument()
  expect(window.localStorage.getItem('loggedUser')).toBeNull()
})