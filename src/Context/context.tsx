import {createContext, useState, useContext} from 'react'
import { ThemeChildren, PropsCart } from './interfaceContext'


// Criando Contexto
export const Context = createContext<PropsCart | undefined>(undefined)

// Componente Provider
export default function ContextCart({children}:ThemeChildren){

    // Criando a state e armazenando o valor da localStorage na state.
    const [cartValue, setCartValue] = useState<object[]>(JSON.parse(localStorage.getItem('@cartProduct') as string))

    return(
        <Context.Provider value={{cartValue,setCartValue}}>
            {children}
        </Context.Provider>
    )
}

// Funca para retornar o contexto o Xontexto
export function UseCart():PropsCart{

    // Pegando o Contexto
    const cartContext = useContext(Context)

    if(!cartContext){
        throw 'error'
    }

    return cartContext
}