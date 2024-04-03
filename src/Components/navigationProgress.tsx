//import React
import { useState, useEffect } from 'react'

// imports interfaces
import { NavegationProps } from '../interfaces/homeTypes'

export const NavegationProgress = ({prev, next, setPrev, setNext}:NavegationProps) => {
    // State - contador
    const [cont, setCont] = useState<number>(0)

    // Usando o useEffect para verificar o contador
    useEffect(() => {

        // Caso contador seja abaixo de 0
        if(cont < 0){
            setCont(0)
            setPrev(0)
            setNext(12)
        }

        // Caso contador seja maio que o total de buttons
        if(cont > document.querySelectorAll('.step-button').length){
            setCont(document.querySelectorAll('.step-button').length)
        }

    },[cont, setPrev, setNext])

    // Voltando na pagina
    function prevProgress(){

        // Armazenando o valor de const a uma variavel
        const value = cont - 2

        // Captura os buttons por meio do querySelector
        const button = document.querySelectorAll<HTMLElement>('.step-button')

        // Primeiroo step-button
        const btnStepPrimary:HTMLElement = document.getElementById('step-button-only') as HTMLElement

        // Percorrendo cada button
        button.forEach((button,idx) => {
            
            // Caso o value seja igual ao idx do button
            if(value === idx){

                // Decremento o contador
                setCont(cont - 1)

                // Alterando o background do step-button
                button.style.border = '1px solid orange'
                button.style.backgroundColor = 'rgb(203 213 225)'

                // Alterando o slice do array
                setPrev(prev - 12)
                setNext(next - 12)

                
            } else if(cont === 1){
                // Decremento o contador
                setCont(cont -2)

                // Adicionando style ao step button
                button.style.border = '0px'
                button.style.backgroundColor = 'rgb(203 213 225)'

                // Alterando style do Primeiro step-button
                btnStepPrimary.style.border = '1px solid orange'

            } else{

                // Adicionando style ao step button
                button.style.border = '0px'
                button.style.backgroundColor = 'rgb(203 213 225)'
            }
        })
    }

    // Avancando na pagina
    function nextProgress(){
        // Armazenando cont na variavel value
        const value = cont
        
        // Captura os buttons
        const button:NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.step-button')

        // Primeiro step-button
        const btnStepPrimary:HTMLElement = document.getElementById('step-button-only') as HTMLElement

        // percorrendo array de buttons
        button.forEach((button,idx) => {

            // Alterando oo border do primeiiiro button
            btnStepPrimary.style.border = '0px'

            // Caso o contador seja igual ao idx
            if(value === idx){


                // Incrementa no contador
                setCont(cont + 1)
                button.style.backgroundColor = 'rgb(203 213 225)'
                button.style.border = '1px solid orange'

                // Alterando oo slice do array
                setPrev(prev + 12)
                setNext(next + 12)
                

            } else if(cont < 4){

                // Adicionando style ao step-button
                button.style.border = '0px'
                button.style.backgroundColor = 'rgb(203 213 225)'
            }
        })
    }

    return(
        <div className='flex gap-1 justify-start md:justify-end mt-4 lg:justify-end' id='navegatinProgress'>
            <button id='step-button-only' className='bg-slate-300'>1</button>
            <button className='step-button'>2</button>
            <button className='step-button'>3</button>
            <button className='step-button'>4</button>
            <button className='step-button'>5</button>
            <button className='step-button-progress' id='step-prev' onClick={prevProgress}>&lsaquo;</button>
            <button className='step-button-progress' id='step-next' onClick={nextProgress}>&rsaquo;</button>
        </div>
    )
}