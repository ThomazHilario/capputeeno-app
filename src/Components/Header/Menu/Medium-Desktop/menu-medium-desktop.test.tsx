// Jest
import '@testing-library/jest-dom'

// Testing Library
import { render } from '@testing-library/react'

// Vitest
import { describe, it, expect } from 'vitest'

// Context
import ContextCart from '../../../../Context/context'

// React Router Dom
import { BrowserRouter } from 'react-router-dom'

// Component
import { Navegation } from './menu-medium-desktop'


describe('Testing menu desktop', () => {
    it('Should be render component', () => {
        // Arrange
        const wrapper = render(
            <ContextCart>
                <BrowserRouter>
                    <Navegation/>
                </BrowserRouter>
            </ContextCart>
        )

        // Actual
        const act = wrapper.container.firstElementChild

        // Expect
        expect(act).toBeInTheDocument()
    })

    it('Should be render Seach component', () => {
        // Arrange
        const wrapper = render(
            <ContextCart>
                <BrowserRouter>
                    <Navegation/>
                </BrowserRouter>
            </ContextCart>
        )

        // Actual
        const SeachInputComponent = wrapper.container.firstElementChild
        
        // Expect
        expect(SeachInputComponent).toBeInTheDocument()
    })

    it('Should be render ShoppingBag component', () => {
        // Arrange
        const wrapper = render(
            <ContextCart>
                <BrowserRouter>
                    <Navegation/>
                </BrowserRouter>
            </ContextCart>
        )

        // Actual
        const ShoppingBagComponent = wrapper.container.lastElementChild

        // Expect
        expect(ShoppingBagComponent).toBeInTheDocument()
    })
})