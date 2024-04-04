// imports React
import { useMemo,useState } from "react"

// imports interfaces
import { FilterProduct } from '../interfaces/homeTypes'

// import radix
import * as Dialog from '@radix-ui/react-dialog'

export const FilterProducts = ({lista,setLista}:FilterProduct) => {
 
    // Salvando a lista no cache, evitando fazer outra requisição
    const listaDefaultCache = useMemo(() => {
        return lista
    },[lista])

    // state - listaDefault
    const [listaDefault, setListaDefault] = useState([...listaDefaultCache])

    const [filterValue, setFilterValue] = useState('Default')


    // Filter
    function filter(option:string){
        // Setando novo valor da state filterValue
        setFilterValue(option)

        // Setando a lista do cache
        setListaDefault([...listaDefaultCache])

        // Opções de filtragens
        if(option === 'Maior Preço'){
            const newLista = listaDefault.sort((a,b) => b.price_in_cents - a.price_in_cents)
            setLista(newLista)
        } 
        
        if(option === 'Menor Preço'){
            const newLista = listaDefault.sort((a,b) => a.price_in_cents - b.price_in_cents)
            setLista(newLista)
        }
        
        if(option === 'Mair Vendidos'){
            const newLista = listaDefault.sort((a,b) => a.sales - b.sales)
            setLista(newLista)
        }

        if(option === 'Default'){
            setLista(listaDefault)
        }

    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className="bg-white w-56 rounded-sm">{filterValue}</Dialog.Trigger>

            <Dialog.Content className="absolute bg-white w-56 flex flex-col
            right-[12.5%] top-[9rem]">
                <Dialog.Close onClick={() => filter('Default')}>Default</Dialog.Close>
                <Dialog.Close onClick={() => filter('Maior Preço')}>Maior Preço</Dialog.Close>
                <Dialog.Close onClick={() => filter('Menor Preço')}>Menor Preço</Dialog.Close>
                <Dialog.Close onClick={() => filter('Mair Vendidos')}>Mais Vendidos</Dialog.Close>
            </Dialog.Content>

        </Dialog.Root>
    )
}

/* 

 <select name="filtro" id="filtro-de-selecao" className='w-40 mt-4 md:mt-0' onChange={(e) => filter(e.target.value)}>
        <option value="default">Organizar por</option>
        <option value="maior">Preço: maior-menor</option>
        <option value="menor">Preço: menor-maior</option>
        <option value="maisVendidos">Mais vendidos</option>
</select>

*/