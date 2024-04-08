// import react
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// import types
import { Users } from '../Home/../../interfaces/homeTypes'
import { ProductType } from '../../interfaces/cartType'

// import Context
import { UseStatesProps } from '../../Context/context'

// imports Components
import { PartOfThePurchase } from '../part-of-the-purchase'

// import icons
import { MdOutlineDeleteForever } from "react-icons/md"
import { SlActionUndo } from "react-icons/sl";

// import radix
import * as ScrollArea from '@radix-ui/react-scroll-area'

export default function Carrinho(){

    // Carregando a state antes de renderizar o componente
    useEffect(() => {
        // Verificando se tem ao menos um produto na localStorage
        if(JSON.parse(localStorage.getItem('@cartProduct') as string).length > 0){
            const value = JSON.parse(localStorage.getItem('@cartProduct') as string).map((i:Users) => Math.ceil(i.price_in_cents))

            // Setando o valor do produto na state
            setCartTotalValue(value.reduce((i:number,a:number) => a += i))

            // Setando o array de produtos na state cartValue
            setCartProduct(JSON.parse(localStorage.getItem('@cartProduct') as string))
        }
    },[])

    // state - Lista de produtos
    const [cartProduct,setCartProduct] = useState<Users[]>([])

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
                <nav className='mt-5'>
                    <Link to='/' className='flex items-center gap-2'><SlActionUndo/> Voltar</Link>
                </nav>
    
                {/* div  carrinho */}
                <div id='carrinho_de_compras' className='mt-3 lg:flex justify-between'>
                    {/* Listagem de produtos */}
                    <div id='lista_de_Produtos'>
    
                        {/* titulo da pagina */}
                        <h2 className='text-3xl'>Seu Carrinho</h2>
    
                        {/* Quantidade de Produtos */}
                        <p className='mt-3 mb-5'>Total ({cartProduct.length} produtos) <strong>R$ {cartTotalValue && cartTotalValue.toFixed(2)}</strong></p>
    
                        <div id='produtos'>
                            {/* Percorrendo o array de produtos e retornando um compoonente para cada um */}
                            
                            <ScrollArea.Root className='p-2'>
                                <ScrollArea.Viewport style={{height:400}}>
                                    {cartProduct.map((item,idx) => <Product key={idx} name={item.name} img={item.image_url} price={item.price_in_cents}  priceAtually={item.priceAtually} amount={item.amount} cartProduct={cartProduct} setCartProduct={setCartProduct} setCartTotalValue={setCartTotalValue} setCartValue={setCartValue} index={idx}/>)}
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar orientation="horizontal">
                                <ScrollArea.Thumb />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Scrollbar orientation="vertical">
                                <ScrollArea.Thumb />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner />
                            </ScrollArea.Root>
                            
                        </div>
                    </div>
    
                    {cartProduct.length > 0 && <PartOfThePurchase cartTotalValue={cartTotalValue}/>}
    
                    {/* finalizar compra */}
                </div>
    
            </section>
        )
    }
}

// Componente produto
function Product({img, name, price, amount, index, cartProduct, setCartProduct, setCartTotalValue, priceAtually, setCartValue}:ProductType){
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
        const value = JSON.parse(localStorage.getItem('@cartProduct') as string).map((i:Users) => Math.ceil(i.price_in_cents))

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
            const value:number[] = cartProduct.map((i:Users) => Math.ceil(i.price_in_cents))

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
            const value:number[] = cartProduct.map((i:Users) => Math.ceil(i.price_in_cents))

            // Setando na state o valor total dos produtos
            setCartTotalValue(value.reduce((i,a) => a += i))

            // Salvando na localStorage
            localStorage.setItem('@cartProduct',JSON.stringify(cartProduct))
        }
    }

    return (
        <article className='flex items-center mt-4 mb-4 bg-white rounded-md lg:w-11/12 '>
            {/* div contendo a imaggem */}
            <div>
                <img src={img} alt='foto do produto' className='h-28 rounded-md lg:h-48'/>
            </div>

            {/* div contendo detalhes do produto */}
            <div className='flex flex-col h-24 justify-between pl-3 pr-3 w-11/12 lg:justify-evenly'>
                {/* titulo e icon */}
                <div id='titulo' className='flex items-center justify-between'>
                    <h2>{name}</h2>
                    <MdOutlineDeleteForever size={22} onClick={removeItem}/>
                </div>

                {/* descricao do produto */}
                <p className='hidden  text-sm lg:block mt-2 mb-4 w-11/12'>Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.</p>

                {/* Valores e quantidade */}
                <div id='detalhes' className='flex justify-between'>
                    <input type="number" min={1} className='w-8 text-center bg-gray-300 rounded-md  p-1 ' defaultValue={amount} onChange={(e) => updateValue(e.target.value)}/>
                    <strong>R$ {price.toFixed(2)}</strong>
                </div>
            </div>
        </article>
    )
}