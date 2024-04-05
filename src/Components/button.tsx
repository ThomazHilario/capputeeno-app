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
    function requestApi(value){
        // Salvando o valor da state
        setValue(value)

        // Filtrando o array somente com as Camisetas
        const blusas:Users[] = listadefault.filter(({category}:ApiProps) => category === 't-shirts')

        // Filtrando o array somente com as Canecas
        const canecas:Users[] = listadefault.filter(({category}:ApiProps) => category === 'mugs')


        if(value === 'Camisetas'){
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Setando nova lista
            setLista(blusas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'
        }

        if(value === 'Canecas'){    
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Setando nova lista
            setLista(canecas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'

        }

        if(value === 'Todos os produtos'){
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Retornando a lista padrao
            setLista(listadefault)  

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'flex'
        }               

        
    }

    return( 
        <div className='flex justify-evenly mb-2 sm:justify-start sm:gap-2 md:mb-0'>
            <button className={`whitespace-nowrap ${value === 'Todos os produtos' && 'border-b-2 border-orange-500'}`} onClick={(e) => requestApi(e.target.textContent)}>Todos os produtos</button>

            <button className={`whitespace-nowrap 
            ${value === 'Camisetas' && 'border-b-2 border-orange-500'}`} 
            onClick={(e) => requestApi(e.target.textContent)}>Camisetas</button>

            <button className={`whitespace-nowrap ${value === 'Canecas' && 'border-b-2 border-orange-500'}`} onClick={(e) => requestApi(e.target.textContent)}>Canecas</button>

        </div>
)
}