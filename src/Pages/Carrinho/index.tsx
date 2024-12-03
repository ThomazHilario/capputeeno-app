// import react
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// import types
import { ProductsProps } from '../../interfaces/homeTypes'

// import Context
import { UseStatesProps } from '../../Context/context'

// imports Components
import { PartOfThePurchase } from '../../Components/part-of-the-purchase'
import { Product } from '../../Components/produto-cart'

// import icons
import { SlActionUndo } from "react-icons/sl";

// import radix
import * as ScrollArea from '@radix-ui/react-scroll-area'

export default function Carrinho(){

    // Carregando a state antes de renderizar o componente
    useEffect(() => {
        // Verificando se tem ao menos um produto na localStorage
        if(JSON.parse(localStorage.getItem('@cartProduct') as string).length > 0){
            const value = JSON.parse(localStorage.getItem('@cartProduct') as string).map((i:ProductsProps) => Math.ceil(i.price_in_cents))

            // Setando o valor do produto na state
            setCartTotalValue(value.reduce((i:number,a:number) => a += i))

            // Setando o array de produtos na state cartValue
            setCartProduct(JSON.parse(localStorage.getItem('@cartProduct') as string))
        }
    },[])

    // state - Lista de produtos
    const [cartProduct,setCartProduct] = useState<ProductsProps[]>([])

    // state - valor total
    const [cartTotalValue,setCartTotalValue] = useState<number>(0)

    // state - quantidade de produtos
    const {setCartValue} = UseStatesProps()

    if(cartProduct.length === 0 ){
        return(
            <section className='h-[89vh] flex justify-center items-center flex-col gap-3'>
                <h2 className='text-4xl'>Seu carrinho esta vazio</h2>
                <Link to='/' className='flex items-center gap-2'><SlActionUndo/> Voltar</Link>
            </section>
        )
    } else{
        return(
            <section className='w-11/12 lg:h-[89vh]'>
                {/* Link de voltar a pagina home */}
                <Link to='/' className='flex items-center gap-2 mt-5'><SlActionUndo/> Voltar</Link>
    
                {/* div  carrinho */}
                <section id='carrinho_de_compras' className='mt-3 lg:flex justify-between'>
                    {/* Listagem de produtos */}
                    <article id='lista_de_Produtos'>
    
                        {/* titulo da pagina */}
                        <h2 className='text-3xl'>Seu Carrinho</h2>
    
                        {/* Quantidade de Produtos */}
                        <p className='mt-3 mb-5'>Total ({cartProduct.length} produtos) <strong>R$ {cartTotalValue && cartTotalValue.toFixed(2)}</strong></p>
    
                        <section id='produtos'>
                            {/* Percorrendo o array de produtos e retornando um compoonente para cada um */}
                            
                            <ScrollArea.Root className='p-2'>
                                <ScrollArea.Viewport style={{height:400}}>
                                    {cartProduct.map((item,idx) => (
                                        <Product 
                                            key={idx} 
                                            index={idx}
                                            name={item.name} 
                                            img={item.image_url} 
                                            price={item.price_in_cents} 
                                            priceAtually={item.priceAtually} 
                                            amount={item.amount} 
                                            cartProduct={cartProduct} 
                                            setCartProduct={setCartProduct} 
                                            setCartTotalValue={setCartTotalValue} 
                                            setCartValue={setCartValue} 
                                        />
                                    ))}
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar orientation="horizontal">
                                <ScrollArea.Thumb />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Scrollbar orientation="vertical">
                                <ScrollArea.Thumb />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner />
                            </ScrollArea.Root>
                            
                        </section>
                    </article>
    
                    {cartProduct.length > 0 && <PartOfThePurchase cartTotalValue={cartTotalValue}/>}
    
                    {/* finalizar compra */}
                </section>
    
            </section>
        )
    }
}