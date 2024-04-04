import {createContext, useState, useContext, useEffect} from 'react'
import { ThemeChildren, PropsCart } from '../interfaces/contextType'


// Criando Contexto
export const Context = createContext<PropsCart | undefined>(undefined)

// Componente Provider
export default function ContextCart({children}:ThemeChildren){

    useEffect(() => {
        if(localStorage.getItem('@cartProduct') === null){
            localStorage.setItem('@cartProduct',JSON.stringify([]))
        }
    },[])

    // Criando a state e armazenando o valor da localStorage na state.
    const [cartValue, setCartValue] = useState<object[]>(JSON.parse(localStorage.getItem('@cartProduct') as string))

    // seach - state
    const [seach, setSeach] = useState<string>('')

    // category
    const [filterValue, setFilterValue] = useState<string>('Organizar por')

    return(
        <Context.Provider value={{cartValue,setCartValue, seach, setSeach, filterValue, setFilterValue}}>
            {children}
        </Context.Provider>
    )
}

// Funca para retornar o contexto o Xontexto
export function UseStatesProps():PropsCart{

    // Pegando o Contexto
    const cartContext = useContext(Context)

    if(!cartContext){
        throw 'error'
    }

    return cartContext
}