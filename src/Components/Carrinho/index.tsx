import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users } from '../Home/interfacesHome'
import { MdOutlineDeleteForever } from "react-icons/md"

export default function Carrinho(){

    // Carregando a state antes de renderizar o componente
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('@cartProduct') as string).length > 0){
            const value = JSON.parse(localStorage.getItem('@cartProduct') as string).map((i:Users) => Math.ceil(i.price_in_cents))

            // Setando o valor do produto na state
            setCartValue(value.reduce((i:number,a:number) => a += i))

            // Setando o array de produtos na state cartValue
            setCartProduct(JSON.parse(localStorage.getItem('@cartProduct') as string))
        }
    },[])

    // state - Lista de produtos
    const [cartProduct,setCartProduct] = useState<Users[]>([])

    // state - valor
    const [cartValue,setCartValue] = useState<number>(0)

    return(
        <section className='w-11/12'>
            <nav className='mt-5'>
                <Link to='/'>Voltar</Link>
            </nav>


            <div id='carrinho' className='h-screen mt-3'>
                {/* titulo da pagina */}
                <h2 className='text-3xl'>Seu Carrinho</h2>

                {/* Quantidade de Produtos */}
                <p className='mt-3 mb-5'>Total ({cartProduct.length} produtos) <strong>R$ {cartValue && cartValue.toFixed(2)}</strong></p>

                <div id='produtos'>
                    {cartProduct.map((item,idx) => <Product key={idx} name={item.name} img={item.image_url} price={item.price_in_cents}  priceAtually={item.priceAtually} amount={item.amount} cartProduct={cartProduct} setCartProduct={setCartProduct} setCartValue={setCartValue} index={idx}/>)}
                </div>
            </div>

        </section>
    )
}

interface ProductType{
    name:string,
    img:string,
    price:number,
    priceAtually:number,
    amount:number,
    index:number,
    setCartValue:React.Dispatch<React.SetStateAction<number>>,
    cartProduct:Users[],
    setCartProduct:React.Dispatch<React.SetStateAction<Users[]>>
}

function Product({img, name, price, amount, index, cartProduct, setCartProduct, setCartValue, priceAtually}:ProductType){

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

        // Pegando da localStorage o novo array de produtos salvo
        const value = JSON.parse(localStorage.getItem('@cartProduct') as string).map((i:Users) => Math.ceil(i.price_in_cents))

        if(value.length > 0){
            // Setando o valor do produto na state
            setCartValue(value.reduce((i:number,a:number) => a += i))
        } else if(value.length === 0){
            setCartValue(0)
        }
         

    }

    // Atualizando a quantidade de produtos
    function updateValue(value:string){

        // Salvando o numero do input a uma variavel
        const amount = parseFloat(value)

        // Setando na state amountRef  valor do input
        setAmountRef(amount)

        if(amount > amountRef){
            // Alterando a quantidade do produto
            cartProduct[index].amount = amount

            // Alterando o preco com base a quantidade
            cartProduct[index].price_in_cents = cartProduct[index].price_in_cents += priceAtually

            // Setando na state cartProduct a mudanca feita
            setCartProduct([...cartProduct])

            // Pegando todos os valores do produtos
            const value:number[] = cartProduct.map((i:Users) => Math.ceil(i.price_in_cents))

            // Setando na state o valor total dos produtos
            setCartValue(value.reduce((i,a) => a += i))

            // Salvando na localStorage
            localStorage.setItem('@cartProduct',JSON.stringify(cartProduct))

        }else if(amountRef > amount){
            // Alterando a quantidade do produto
            cartProduct[index].amount = amount

            // Alterando o preco com base a quantidade
            cartProduct[index].price_in_cents = cartProduct[index].price_in_cents -= priceAtually

            // Setando na state cartProduct a mudanca feita
            setCartProduct([...cartProduct])

            // Pegando todos os valores do produtos
            const value:number[] = cartProduct.map((i:Users) => Math.ceil(i.price_in_cents))

            // Setando na state o valor total dos produtos
            setCartValue(value.reduce((i,a) => a += i))

            // Salvando na localStorage
            localStorage.setItem('@cartProduct',JSON.stringify(cartProduct))
        }
    }
    return (
        <article className='flex items-center mt-4 mb-4 bg-white rounded-md'>
            {/* div contendo a imaggem */}
            <div>
                <img src={img} alt='foto do produto' className='h-28 rounded-md'/>
            </div>

            {/* div contendo detalhes do produto */}
            <div className='flex flex-col h-24 justify-between pl-3 pr-3 w-full'>
                {/* titulo e icon */}
                <div id='titulo' className='flex items-center justify-between'>
                    <h2>{name}</h2>
                    <MdOutlineDeleteForever size={22} onClick={removeItem}/>
                </div>

                {/* descricao do produto */}
                <p className='hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio similique sed illo illum quis eaque et cumque saepe iste fuga, nemo minus atque quisquam? Et iusto laudantium voluptates dicta repellat?</p>

                {/* Valores e quantidade */}
                <div id='detalhes' className='flex justify-between'>
                    <input type="number" min={1} className='w-8 text-center bg-gray-300 rounded-md w-12 p-1' defaultValue={amount} onChange={(e) => updateValue(e.target.value)}/>
                    <strong>R$ {price}</strong>
                </div>
            </div>
        </article>
    )
}