// Jest
import '@testing-library/jest-dom'

// Testing Library
import { render, screen } from '@testing-library/react'

// Vitest
import { describe, it, expect } from 'vitest'

// Component
import { SumaryProduct } from './sumary-product'

describe('Render test component', () => {
    it('Should be render component', () => {
        // Arrange
        render(
            <SumaryProduct
                name='Camiseta polo'
                price={2000}
            />
        )

        // Actual
        const act = screen.getByText('Camiseta polo')

        // Expect
        expect(act).toBeVisible()
    })
})