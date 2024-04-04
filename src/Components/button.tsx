// import React
import { useState, useEffect } from "react"

// import Context
import { UseStatesProps } from "../Context/context"

// import interface
import { ButtonProps, Users, ApiProps } from '../interfaces/homeTypes'

export const Button = ({name, lista, setLista}:ButtonProps) => {
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

    // Requisicao
    function requestApi(){
        // Filtrando o array somente com as Camisetas
        const blusas:Users[] = listadefault.filter(({category}:ApiProps) => category === 't-shirts')

        // Filtrando o array somente com as Canecas
        const canecas:Users[] = listadefault.filter(({category}:ApiProps) => category === 'mugs')


        if(name === 'Camisetas'){
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Setando nova lista
            setLista(blusas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'
        }

        if(name === 'Canecas'){    
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Setando nova lista
            setLista(canecas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'

        }

        if(name === 'Todos os produtos'){
            // Alterando valor da state do select
            setFilterValue('Organizar por')

            // Retornando a lista padrao
            setLista(listadefault)  

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'flex'
        }               

        
    }

    return <button  className='whitespace-nowrap' onClick={requestApi}>{name}</button>
}