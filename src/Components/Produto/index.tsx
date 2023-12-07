import './mediaQueries.css'
import {useState, useEffect, useContext} from 'react'
import  {Link} from 'react-router-dom'
import { Context } from '../../Context/context'


interface Users {
    category:string,
    description:string,
    id:string,
    image_url:string,
    name:string,
    price_in_cents:number,
    sales:number
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

    const {cartValue} = useContext(Context)

    // Adicionando produto ao carrinho
    function addCart(){

        // Pegando dados da localStorage.
        const localStorageCart:unknown = localStorage.getItem('@cartProduct')

        // Transformando os dados da localStorage de string para dados javascript.
        const cart:Users[] = JSON.parse(localStorageCart as string)

        // Jogandoo para dentro do cart o meu produto
        cart.push(produto as Users)

        cartValue.push(produto as Users)

        // Salvando as alterações na localStorage
        localStorage.setItem('@cartProduct',JSON.stringify(cart))
    
    }

    return(
        <section id='container_produto_details'>

            {/* Link de navegacao */}
            <nav className='mt-6 mb-7'>
                <Link to='/'>Voltar</Link>
            </nav>

            <div className='flex gap-10 mb-14' id='produto_details'>
                
                {/* imagem do produto */}
                <div id='imagem_do_produto'>
                    <img src={produto?.image_url} alt="imagem do produto" />
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
                        <p className='text-xs mt-10'>Frete de R$ 40,00 para todo o Brasil. Gratis para compras acima de R$ 90,00</p>

                        {/* informacoes do produto */}
                        <h2 className='mt-20 text-xl'>Descricao</h2>
                        <p className='text-sm w-96 text-justify'>Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto. </p>
                        
                    </div>
                    
                    <button  id='buttonAddCar' className='bg-blue-900 h-12 rounded-sm text-white font-bold' onClick={addCart}>Adicionar ao carrinho</button>
                </div>
            </div>
        </section>
    )
}