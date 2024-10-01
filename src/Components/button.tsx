// import React
import { useState, useEffect } from "react"

// import Context
import { UseStatesProps } from "../Context/context"

// import interface
import { ButtonProps, Users, ApiProps } from '../interfaces/homeTypes'

export const Button = ({lista, setLista}:ButtonProps) => {
    useEffect(() => {
        // Fazendo requisicao a api
        async function loadlistaDefault() {
            try {
                // Recebendo resposta
                const response = await fetch('https://api-rockeatseat.vercel.app')

                // Transformando a resposta em dados consumiveis
                const data = await response.json()

                // Armazenando o resultado na state lista
                setListadefault(data)

            } catch (e) {
                console.log(e)
            }
        }

        // chamando a funcao
        loadlistaDefault()
    },[])

    // Context
    const { setFilterValue } = UseStatesProps()

    // Lista - padrao
    const [listadefault, setListadefault] = useState(lista)

    // value
    const [value, setValue] = useState('Todos os produtos')

    // Requisicao
    function requestApi(filterValue:string){
        
        // Salvando o valor da state
        setValue(filterValue)

        // Filtrando o array somente com as Camisetas
        const blusas:Users[] = listadefault.filter(({category}:ApiProps) => category === 't-shirts')

        // Filtrando o array somente com as Canecas
        const canecas:Users[] = listadefault.filter(({category}:ApiProps) => category === 'mugs')


        if(filterValue === 'Camisetas'){
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Setando nova lista
            setLista(blusas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'
        }

        if(filterValue === 'Canecas'){    
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Setando nova lista
            setLista(canecas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'

        }

        if(filterValue === 'Todos os produtos'){
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Retornando a lista padrao
            setLista(listadefault)  

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'flex'
        }             
        
    }

    const buttonStyleForTailwind = 'whitespace-nowrap'
    const buttonSelectStyleForTailwind = 'border-b-2 border-orange-500'

    return( 
        <div className='flex justify-evenly mb-2 sm:justify-start sm:gap-2 md:mb-0'>
            <button className={`${buttonStyleForTailwind} ${value === 'Todos os produtos' && buttonSelectStyleForTailwind}`} onClick={() => requestApi('Todos os produtos')}>Todos os produtos</button>

            <button className={`${buttonStyleForTailwind} 
            ${value === 'Camisetas' && buttonSelectStyleForTailwind}`} 
            onClick={() => requestApi('Camisetas')}>Camisetas</button>

            <button className={`${buttonStyleForTailwind} ${value === 'Canecas' && buttonSelectStyleForTailwind}`} onClick={() => requestApi('Canecas')}>Canecas</button>

        </div>
)
}