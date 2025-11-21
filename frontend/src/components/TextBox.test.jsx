import { render, screen } from '@testing-library/react'
import TextBox from './TextBox'
import { test, expect} from 'vitest'

test('renders content', () => {
  const text =  'Welcome to Stoltcade!'

  render(<TextBox message={text} />)

  const element = screen.getByText('Welcome to Stoltcade!')
  expect(element).toBeDefined()
})