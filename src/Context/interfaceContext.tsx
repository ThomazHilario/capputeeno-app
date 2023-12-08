import { ReactNode } from 'react'

// Tipagem do Contexto
export interface PropsCart{
    cartValue:object[],
    setCartValue:React.Dispatch<React.SetStateAction<object[]>>
}

// Tipagem do Provider
export interface ThemeChildren{
    children:ReactNode
}