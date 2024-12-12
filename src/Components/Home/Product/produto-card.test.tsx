// Jest
import '@testing-library/jest-dom'

// Testing Library
import { render, screen } from '@testing-library/react'

// Vitest
import { describe, it, expect } from 'vitest'

// React Router Dom
import { BrowserRouter } from 'react-router-dom'

// Component
import { Produto } from './produtoCard'

describe('Testing product component', () => {
    it('Should be render component', () => {

        // Arrange
        render(<BrowserRouter><Produto img='' name='produto 1' price={18}/></BrowserRouter>)

        // Actual
        const act = screen.getByText('produto 1')

        // Expect
        expect(act).toBeInTheDocument()


    })
})