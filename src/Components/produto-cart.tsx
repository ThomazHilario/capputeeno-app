//import React
import { useEffect, useState } from 'react'

// import Interfaces
import { ProductsProps } from '../interfaces/homeTypes'
import { ProductType } from '../interfaces/cartType'

// import react-icons
import { MdOutlineDeleteForever } from "react-icons/md"

export const Product = ({img, name, price, amount, index, cartProduct, setCartProduct, setCartTotalValue, priceAtually, setCartValue}:ProductType) => {
    // Usando o use effect para setar a referencia a state amountRef
    useEffect(() => {
        setAmountRef(amount)
    },[amount])

    // state de referencia de quantidades
    const [amountRef, setAmountRef] = useState<number>(0)

    // Removendo item da lista
    function removeItem(){
        // Tirando o produto especific
        cartProduct.splice(index,1)

        // Setando na state setCarProduct o que soobrou do cartProduct
        setCartProduct([...cartProduct])

        // Salvando o novo cartProduct
        localStorage.setItem('@cartProduct',JSON.stringify(cartProduct))

        // Salvando a contaggem nova dos produtos
        setCartValue(JSON.parse(localStorage.getItem('@cartProduct') as string))

        // Pegando da localStorage o novo array de produtos salvo
        const value = JSON.parse(localStorage.getItem('@cartProduct') as string).map((i:ProductsProps) => Math.ceil(i.price_in_cents))

        if(value.length > 0){
            // Setando o valor do produto na state
            setCartTotalValue(value.reduce((i:number,a:number) => a += i))
        } else if(value.length === 0){
            setCartTotalValue(0)
        }
         

    }

    // Atualizando a quantidade de produtos
    function updateValue(value:string){

        // Salvando o numero do input a uma variavel
        const amount = parseFloat(value)

        // Setando na state amountRef valor do input
        setAmountRef(amount)

        if(amount > amountRef){
            // Pegando elemento do array em especifico
            const cartProductRef = cartProduct[index]

            // Alterando a quantidade do produto
            cartProductRef.amount = amount

            // Alterando o preco com base a quantidade
            cartProductRef.price_in_cents = cartProductRef.price_in_cents += priceAtually

            // Setando na state cartProduct a mudanca feita
            setCartProduct([...cartProduct])

            // Pegando todos os valores do produtos
            const value:number[] = cartProduct.map((i:ProductsProps) => Math.ceil(i.price_in_cents))

            // Setando na state o valor total dos produtos
            setCartTotalValue(value.reduce((i,a) => a += i))

            // Salvando na localStorage
            localStorage.setItem('@cartProduct',JSON.stringify(cartProduct))

        }else if(amountRef > amount){
            // Pegando elemento do array em especifico
            const cartProductRef = cartProduct[index]

            // Alterando a quantidade do produto
            cartProductRef.amount = amount

            // Alterando o preco com base a quantidade
            cartProductRef.price_in_cents = cartProductRef.price_in_cents -= priceAtually

            // Setando na state cartProduct a mudanca feita
            setCartProduct([...cartProduct])

            // Pegando todos os valores do produtos
            const value:number[] = cartProduct.map((i:ProductsProps) => Math.ceil(i.price_in_cents))

            // Setando na state o valor total dos produtos
            setCartTotalValue(value.reduce((i,a) => a += i))

            // Salvando na localStorage
            localStorage.setItem('@cartProduct',JSON.stringify(cartProduct))
        }
    }

    return (
        <article className='flex items-center mt-4 mb-4 bg-white rounded-md lg:w-11/12 '>
            {/* div contendo a imagem */}
            <div>
                <img src={img} alt='foto do produto' className='h-28 rounded-md lg:h-48'/>
            </div>

            {/* section contendo detalhes do produto */}
            <section className='flex flex-col h-24 justify-between pl-3 pr-3 w-11/12 lg:justify-evenly'>
            
                {/* titulo e icon */}
                <article id='titulo' className='flex items-center justify-between'>
                    <h2>{name}</h2>
                    <MdOutlineDeleteForever cursor='pointer' size={22} onClick={removeItem}/>
                </article>

                {/* descricao do produto */}
                <p className='hidden  text-sm lg:block mt-2 mb-4 w-11/12'>Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.</p>

                {/* Valores e quantidade */}
                <section id='detalhes' className='flex justify-between'>
                    <input 
                        type="number" 
                        min={1} 
                        className='w-8 text-center bg-gray-300 rounded-md  p-1 ' 
                        defaultValue={amount} 
                        onChange={(e) => updateValue(e.target.value)}
                    />

                    <strong>R$ {price.toFixed(2)}</strong>
                </section>
            </section>
        </article>
    )
}