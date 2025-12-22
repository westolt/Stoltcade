import { screen, render } from '@testing-library/react'
import Header from './Header'
import { test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

 test('renders header', () => {
    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
        )

        
    const element = screen.getByText('Statcade')
    expect(element).toBeInTheDocument()
 })