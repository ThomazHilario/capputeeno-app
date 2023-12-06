import {createContext, useState} from 'react'

// Criando um contexto

export const Context = createContext({})

// Componente do contexto

export default function ContextCart({children}){
    // state - total de itens do carrinho
    const [cartValue, setcartValue] = useState<number>(0)

    // retornando o context Provider
    return(
        <Context.Provider value={{cartValue, setcartValue}} >
            {children}
        </Context.Provider>
    )
}