import { ReactNode } from 'react'

// Tipagem do Contexto
export interface PropsCart{
    cartValue:object[],
    setCartValue:React.Dispatch<React.SetStateAction<object[]>>,
    seach:string,
    setSeach:React.Dispatch<React.SetStateAction<string>>
    category:string,
    setCategory:React.Dispatch<React.SetStateAction<string>>
}

// Tipagem do Provider
export interface ThemeChildren{
    children:ReactNode
}