// JestDom
import '@testing-library/jest-dom'

// React Testing Library
import { render, screen } from '@testing-library/react'

// Vitest
import { describe, it, expect } from 'vitest'

// Component
import { NavegationProgress } from '../navigationProgress'

describe('Testing render component navegation progress', () => {
    it('Should render component', () => {
        // Arrange
        render(<NavegationProgress totalPages={[1, 2, 3, 4, 5]}/>)

        // actual
        const act = screen.getByRole('navigation-for-steps')

        // Expect
        expect(act).toBeInTheDocument()
    })

    it('Should component have total pages empty', () => {
        // Arrange
        const component = render(<NavegationProgress totalPages={[]}/>)

        // Expect
        expect(component.container).toBeEmptyDOMElement()
    })
})