// import React
import {useState, useEffect} from 'react'

// import React router dom
import  {Link} from 'react-router-dom'

// Components
import { SumaryProduct } from '../../Components/Produto/sumary-product'

// import Context
import { UseStatesProps} from '../../Context/context'

// import Icons
import { SlActionUndo } from "react-icons/sl"

// Interfae
import { ProductsProps } from '../../interfaces/homeTypes'

// Components
import { Loading } from '../../Components/UI/loading'


export default function Produto(){

    // Fazendo requisicao para buscar o produto
    useEffect(() => {
       
        // Funcao para buscar produto especifico
         function loadProduto(){
            // Get product in localstorage
            const produto = localStorage.getItem('@item') as string

            // Set product object in state produto
            setProduto(JSON.parse(produto))

            // Set false in isLoading state
            setIsLoading(false)
        }

        // Chamando a funcao
        loadProduto()

    },[])

    // state - isLoading
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // state do produto
    const [produto, setProduto] = useState<ProductsProps>()

    // state - global cartValue
    const {setCartValue} = UseStatesProps()

    // Adicionando produto ao carrinho
    function addCart(){

        // Pegando dados da localStorage.
        const localStorageCart:unknown = localStorage.getItem('@cartProduct')

        // Transformando os dados da localStorage de string para dados javascript.
        const cart:ProductsProps[] = JSON.parse(localStorageCart as string)        

        // Jogando para dentro do cart o meu produto
        if(cart.some(item => item.name === produto?.name) === false){

            // Jogando para dentro do cart o meu produto
            cart.push({image_url:produto?.image_url, name:produto?.name, price_in_cents:Math.ceil(produto?.price_in_cents as number / 80),priceAtually:Math.ceil(produto?.price_in_cents as number / 80), amount:1} as ProductsProps)

            // setando valor no cartValue
            setCartValue(cart)

            // Salvando as alterações na localStorage
            localStorage.setItem('@cartProduct',JSON.stringify(cart))

        } else if(cart.some(item => item.name)){

            // Filtrando o array
            const newCart = cart.filter((item) => item.name === produto?.name)

            // Somando mais um produto
            newCart[0].amount += 1

            // Adicionando o novo preco
            newCart[0].price_in_cents += Math.ceil(produto?.price_in_cents as number / 80)


            // setando valor no cartValue
            setCartValue(cart)

            // Salvando as alterações na localStorage
            localStorage.setItem('@cartProduct',JSON.stringify(cart))
        }
    
    }

    // Case be loading
    if(isLoading) return <Loading/>   

    return(
        <section className='p-2 min-h-screen'>

            {/* Link de navegacao */}
            <Link to='/' className='my-5 flex items-center gap-2'><SlActionUndo/> Voltar</Link>
            

            <section className='flex flex-col gap-10 lg:flex-row p-2'>
                
                {/* imagem do produto */}
                <figure>
                    <img src={produto?.image_url} alt="imagem do produto" className='h-48 m-auto md:h-72 lg:h-full'/>
                </figure>

                <section id='informacoes' className='flex flex-col justify-between'>
                    {/* Sumary */}
                    <SumaryProduct 
                        name={produto?.name as string} 
                        price={produto?.price_in_cents as number}
                    />
                    
                    <button  id='buttonAddCar' className='bg-blue-900 h-12 rounded-sm text-white font-bold mt-5' onClick={addCart}>Adicionar ao carrinho</button>
                </section>
            </section>
        </section>
    )
}