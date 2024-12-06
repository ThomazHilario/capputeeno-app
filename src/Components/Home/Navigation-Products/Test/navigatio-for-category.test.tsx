// Jest Dom
import '@testing-library/jest-dom'

// Testing Library
import { render, screen } from '@testing-library/react'

// Vitest
import { describe, it, expect } from 'vitest'

// Component
import { NavigationForCategory } from '../navigation-for-category'

describe('Testing Navigation for category component', () => {
    it('Should Render component', () => {
        // Arrange
        render(<NavigationForCategory/>)

        // actual
        const act = screen.getByRole('tabs-category')

        // expect
        expect(act).toBeInTheDocument()
    })
})