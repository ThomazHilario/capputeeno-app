import {createContext, useState, useEffect} from 'react'

// Criando um contexto
export const Context = createContext({
    cartValue:0,
    updateCart(value:number):void
})

// Componente do contexto
export default function ContextCart({children}){



    // state - total de itens do carrinho
    const [cartValue, setCartValue] = useState<number>(0)

    const updateCart = (value:number):void => {
        setCartValue(value)
    }

    // retornando o context Provider
    return(
        <Context.Provider value={{cartValue,updateCart}} >
            {children}
        </Context.Provider>
    )
}