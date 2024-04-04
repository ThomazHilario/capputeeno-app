// imports React
import { useState } from "react"

// imports interfaces
import { FilterProduct } from '../interfaces/homeTypes'

// import radix
import * as Dialog from '@radix-ui/react-dialog'

// import Context
import { UseStatesProps } from "../Context/context"

export const FilterProducts = ({lista,setLista}:FilterProduct) => {

    // state - filterValue
    const {filterValue, setFilterValue} = UseStatesProps()


    // Filter
    function filter(option:string){
        // Setando novo valor da state filterValue
        setFilterValue(option)

        // Opções de filtragens
        if(option === 'Maior Preço'){
            const newLista = lista.sort((a,b) => b.price_in_cents - a.price_in_cents)
            setLista([...newLista])

        } 
        
        if(option === 'Menor Preço'){
            const newLista = lista.sort((a,b) => a.price_in_cents - b.price_in_cents)
            setLista([...newLista])
        }
        
        if(option === 'Mais Vendidos'){
            const newLista = lista.sort((a,b) => a.sales - b.sales)
            setLista([...newLista])
        }
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className="w-full sm:w-56 bg-white  rounded-sm">{filterValue}</Dialog.Trigger>

            <Dialog.Content className="absolute bg-white w-[91.6%] sm:w-56 flex flex-col
            left-[4.2%] sm:left-[12.5%] md:left-auto md:right-[8.3%] lg:right-[12.5%] top-[10.5rem] md:top-[9rem]">
                <Dialog.Close onClick={() => filter('Maior Preço')}>Maior Preço</Dialog.Close>
                <Dialog.Close onClick={() => filter('Menor Preço')}>Menor Preço</Dialog.Close>
                <Dialog.Close onClick={() => filter('Mais Vendidos')}>Mais Vendidos</Dialog.Close>
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