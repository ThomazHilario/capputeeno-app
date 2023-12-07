import {createContext,useEffect} from 'react'

interface ThemeChildren {
    children:React.ReactNode
}

interface PropsCart{
    cartValue:object[],
}

const cart:PropsCart = {
    cartValue:JSON.parse(localStorage.getItem('@cartProduct') as string) ? JSON.parse(localStorage.getItem('@cartProduct') as string) : [],
}

// Criando Contexto
export const Context = createContext<PropsCart>(cart)



// Componente do contexto
export default function ContextCart({children}:ThemeChildren){

    useEffect(() => {
        if(localStorage.getItem('@cartProduct') === null){
            localStorage.setItem('@cartProduct',JSON.stringify([]))
        }
    },[])

    // retornando o context Provider
    return(
        <Context.Provider value={cart}>
            {children}
        </Context.Provider>
    )
}