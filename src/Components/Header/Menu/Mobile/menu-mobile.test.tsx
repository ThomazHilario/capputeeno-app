// Jest
import '@testing-library/jest-dom'

// Testing Library
import { render, screen, fireEvent } from '@testing-library/react'

// Vitest
import { describe, it, expect, beforeEach } from 'vitest'

// Context
import ContextCart from '../../../../Context/context'

// React Router Dom
import { BrowserRouter } from 'react-router-dom'

// Component
import { MenuMobile } from './menu-mobile'

describe('Testing render and flux be menu-mobile component.', () => {

    beforeEach(() => {
        render(
            <ContextCart>
                <BrowserRouter>
                    <MenuMobile/>
                </BrowserRouter>
            </ContextCart>
        )
    })

    it('Should be render Trigger', () => {

        // Actual
        const act = screen.getByRole('button')

        // Expect
        expect(act).toBeInTheDocument()
    })

    it('Should be click trigger button render content', () => {
        
        // Arrange
        const trigger = screen.getByRole('button')

        // Simulation click user in dialog trigger
        fireEvent.click(trigger)

        // actual
        const act = screen.getByRole('menu-mobile-content')

        // Expect
        expect(act).toBeInTheDocument()
    })

    it('Should be close dialog content be click in dialog close', () => {
        
        // Arrange
        const trigger = screen.getByRole('button')

        // Simulation click in trigger
        fireEvent.click(trigger)

        // Actual
        const contentMenuMobile = screen.getByRole('menu-mobile-content')
        const closeTrigger = screen.getByRole('close-dialog-content')

        // Simulation click in close trigger
        fireEvent.click(closeTrigger)

        // Expect
        expect(contentMenuMobile).not.toBeVisible()
    })
})