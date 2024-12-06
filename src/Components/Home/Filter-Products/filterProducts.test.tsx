// import jest dom
import '@testing-library/jest-dom'

// Testing Library
import { render, screen, fireEvent } from '@testing-library/react'

// Vitest
import { describe, it, expect } from 'vitest'

// Component
import { FilterProducts } from './filterProducts'

describe('Test filter Products components', () => {
    it('Should Testing rendering trigger in component', () => {
        // arrange
        render(<FilterProducts/>)

        // actual
        const act = screen.getByRole('btn-select-trigger')

        // assert
        expect(act).toBeInTheDocument()
    })

    it('Should Content Redering in component', () => {
        // Arrange
        render(<FilterProducts/>)

        // Click Trigger
        fireEvent.click(screen.getByRole('btn-select-trigger'))

        // actual
        const act = screen.getByRole('filter-content')

        // Expect
        expect(act).toBeInTheDocument()
    })
})