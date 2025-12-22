import { render, screen } from '@testing-library/react'
import TextBox from './TextBox'
import { test, expect } from 'vitest'

test('renders default text', () => {
  const text =  'Welcome to Statcade!'

  render(<TextBox message={text} />)

  const element = screen.getByText('Welcome to Statcade!')
  expect(element).toBeDefined()
})
