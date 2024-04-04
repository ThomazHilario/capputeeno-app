import '../../index.css'

// Import react
import {useState, useEffect } from 'react'

// Import context
import { UseStatesProps } from '../../Context/context'

// Import Interface
import { Users } from '../../interfaces/homeTypes'

// import Components
import { Produto } from '../produtoCard'
import { Button } from '../button'
import { FilterProducts } from '../filterProducts'
import { NavegationProgress } from '../navigationProgress'

// Componente Home - Principal
export default function Home(){

    const {seach} = UseStatesProps()

    // variaveis para mudar a pagina
    const [prev, setPrev] = useState<number>(0)
    const [next, setNext] = useState<number>(12) 

    // State - lista
    const [lista, setLista] = useState<Users[]>([])

    // Filtro de elementos
    const listFilter = lista.filter(products => products.name.toLowerCase().includes(seach.toLowerCase()) && products)
    
    // state - carregado
    const [carregado, setCarregado] = useState(true)

    useEffect(() => {
        async function loadLista(){
            try {
                const response = await fetch('https://api-rockeatseat.vercel.app')
                const data = await response.json()

                // Armazenando o resultado na state lista
                setLista(data)

                // Alterando a state carregado para true
                setCarregado(false)
            } catch (e) {
                console.log(e)
            }
        }

        loadLista()
    },[])

   if(carregado === true){
    return (
    <div className='h-screen flex justify-center items-center'>
        <h1>Carregando</h1>
    </div>
    )

   } else{
        return(
            <section className='w-11/12 sm:w-9/12 md:w-10/12 lg:w-9/12'>

                {/* navegacao dos produtos */}
                <nav className='mt-8 flex flex-col md:flex-row justify-between'>
                    {/* buttons */}
                    <div className='flex justify-center mb-2 sm:justify-start md:mb-0 gap-2'>
                        <Button name={'Todos os produtos'} lista={lista} setLista={setLista} />
                        <Button name={'Camisetas'} lista={lista} setLista={setLista} />
                        <Button name={'Canecas'} lista={lista} setLista={setLista} />
                    </div>

                    {/* Filtro dos produtos */}
                    <FilterProducts lista={lista} setLista={setLista}/>

                </nav>

                <NavegationProgress setPrev={setPrev} setNext={setNext} prev={prev} next={next}/>

                {/* Container dos produtos listados */}
                <div id='container_produtos' className='h-auto mt-8 mb-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4' >

                    {/* Percorrendo cada produto */}
                    {listFilter.slice(prev,next).map((item, idx) => <Produto key={idx} img={item.image_url} name={item.name} price={item.price_in_cents}/>)}

                </div>

            </section>
        )
   }
}