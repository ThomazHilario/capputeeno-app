
import {useState, useEffect} from 'react'
import  {Link} from 'react-router-dom'
import { UseCart } from '../../Context/context'
import { SlActionUndo } from "react-icons/sl"


interface Users {
    category:string,
    description:string,
    id:string,
    image_url:string,
    name:string,
    price_in_cents:number,
    priceAtually:number,
    sales:number,
    amount:number,
}


export default function Produto(){

    // Fazendo requisicao para buscar o produto
    useEffect(() => {
       
        // Funcao para buscar produto especifico
         function loadProduto(){
            const produto = localStorage.getItem('@item') as string
            setProduto(JSON.parse(produto))
        }

        // Chamando a funcao
        loadProduto()

    },[])

    // state do produto
    const [produto, setProduto] = useState<Users>()

    // state - global cartValue
    const {setCartValue} = UseCart()

    // Adicionando produto ao carrinho
    function addCart(){

        // Pegando dados da localStorage.
        const localStorageCart:unknown = localStorage.getItem('@cartProduct')

        // Transformando os dados da localStorage de string para dados javascript.
        const cart:Users[] = JSON.parse(localStorageCart as string)        

        // Jogando para dentro do cart o meu produto
        if(cart.some(item => item.name === produto?.name) === false){

            // Jogando para dentro do cart o meu produto
            cart.push({image_url:produto?.image_url, name:produto?.name, price_in_cents:Math.ceil(produto?.price_in_cents as number / 80),priceAtually:Math.ceil(produto?.price_in_cents as number / 80), amount:1} as Users)

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

    return(
        <section id='container_produto_details'>

            {/* Link de navegacao */}
            <nav className='mt-6 mb-7 flex items-center gap-2'>
                <SlActionUndo/>
                <Link to='/'>Voltar</Link>
            </nav>

            <div className='flex flex-col gap-10 mb-14 lg:flex-row p-2' id='produto_details'>
                
                {/* imagem do produto */}
                <div id='imagem_do_produto'>
                    <img src={produto?.image_url} alt="imagem do produto" className='h-48 m-auto md:h-72 lg:h-full'/>
                </div>

                <div id='informacoes' className='flex flex-col justify-between'>
                    <div id='descricao'>

                        {/* Categoria */}
                        <p className='mb-4'>{produto?.name.includes('Camiseta') ? 'Camiseta' : 'Canecas'}</p>

                        {/* Titulo */}
                        <h1 className='text-4xl mb-3'>{produto?.name}</h1>

                        {/* Preco */}
                        <h1 className='text-2xl'><strong>R$ {Math.ceil((produto?.price_in_cents as number) / 80).toFixed(2).replace('.',',')}</strong></h1>
                            
                        {/* Frete */}
                        <p className='text-xs mt-10 text-justify'>Frete de R$ 40,00 para todo o Brasil. Gratis para compras acima de R$ 90,00</p>

                        {/* informacoes do produto */}
                        <h2 className='mt-20 text-xl mb-2 md:text-3xl'>Descricao</h2>
                        <p className='text-sm w-6/6 text-justify md:w-96'>Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto. </p>
                        
                    </div>
                    
                    <button  id='buttonAddCar' className='bg-blue-900 h-12 rounded-sm text-white font-bold mt-5' onClick={addCart}>Adicionar ao carrinho</button>
                </div>
            </div>
        </section>
    )
}