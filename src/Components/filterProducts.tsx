// imports React
import { useMemo,useState } from "react"

// imports interfaces
import { FilterProduct } from '../interfaces/homeTypes'

export const FilterProducts = ({lista,setLista}:FilterProduct) => {
 
    // Salvando a lista no cache, evitando fazer outra requisição
    const listaDefaultCache = useMemo(() => {
        return lista
    },[lista])

    // state - listaDefault
    const [listaDefault, setListaDefault] = useState([...listaDefaultCache])


    // Filter
    function filter(option:string){
        // Setando a lista do cache
        setListaDefault([...listaDefaultCache])

        // Opções de filtragens
        if(option === 'maior'){
            const newLista = listaDefault.sort((a,b) => b.price_in_cents - a.price_in_cents)
            setLista(newLista)
        } 
        
        if(option === 'menor'){
            const newLista = listaDefault.sort((a,b) => a.price_in_cents - b.price_in_cents)
            setLista(newLista)
        }
        
        if(option === 'maisVendidos'){
            const newLista = listaDefault.sort((a,b) => a.sales - b.sales)
            setLista(newLista)
        }

        if(option === 'default'){
            setLista(listaDefault)
        }

    }

    return(
        <select name="filtro" id="filtro-de-selecao" className='w-40 mt-4 md:mt-0' onChange={(e) => filter(e.target.value)}>
            <option value="default">Organizar por</option>
            <option value="maior">Preço: maior-menor</option>
            <option value="menor">Preço: menor-maior</option>
            <option value="maisVendidos">Mais vendidos</option>
        </select>
    )
}