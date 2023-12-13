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
                    {cartProduct.map((item,idx) => <Product key={idx} name={item.name} img={item.image_url} price={item.price_in_cents} cartProduct={cartProduct}/>)}
                </div>
            </div>

        </section>
    )
}

interface ProductType{
    name:string,
    img:string,
    price:number,
    cartProduct:Users[]
}

function Product({img, name, price, cartProduct}:ProductType){

    const totalValue = cartProduct.filter((item) => item.name === name)

    return (
        <article className='flex items-center mt-4 mb-4 bg-white rounded-md'>
            <div>
                <img src={img} alt='foto do produto' className='h-28 rounded-md'/>
            </div>

            <div className='flex flex-col h-24 justify-between pl-3 pr-3 w-full'>
                <div id='titulo' className='flex items-center justify-between'>
                    <h2>{name}</h2>
                    <MdOutlineDeleteForever size={22}/>
                </div>

                <p className='hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio similique sed illo illum quis eaque et cumque saepe iste fuga, nemo minus atque quisquam? Et iusto laudantium voluptates dicta repellat?</p>

                <div id='detalhes' className='flex justify-between'>
                    <input type="number" className='w-8 text-center bg-gray-300 rounded-md w-12 p-1' defaultValue={totalValue.length}/>
                    <strong>R$ {price}</strong>
                </div>
            </div>
        </article>
    )
}