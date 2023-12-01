import '../../index.css'
import {useState, useEffect } from 'react'

// Interface da state lista
interface Users {
    category:string,
    description:string,
    id:string,
    image_url:string,
    name:string,
    price_in_cents:number,
    sales:number
}
// Componente Home
export default function Home(){

    // State - lista
    const [lista,setLista] = useState<Users[]>([])
    
    // state - carregado
    const [carregado, setCarregado] = useState(false)

    useEffect(() => {
        async function loadLista(){
            try {
                const response = await fetch('https://api-rockeatseat.vercel.app')
                const data = await response.json()

                setLista(data.slice(0,12))
                setCarregado(true)
            } catch (e) {
                console.log(e)
            }
        }

        loadLista()
    },[])

   if(carregado === false){
        return <div className='h-screen flex justify-center items-center'>
            <h1>Carregando</h1>
        </div>
   } else{
        return(
            <section className='w-9/12'>

                {/* navegacao dos produtos */}
                <nav className='flex justify-between mt-8'>
                    <div className='flex gap-5'>
                        <Button name={'Todos os produtos'} />
                        <Button name={'Camisetas'} />
                        <Button name={'Canecas'} />
                    </div>

                    <select name="filtro" id="filtro-de-selecao">
                        <option value="default">Organizar por</option>
                        <option value="Menor preco">Preço: maior-menor</option>
                        <option value="maior preco">Preço: menor-maior</option>
                        <option value="maior preco">Mais vendidos</option>
                    </select>
                </nav>

                {/* Container dos produtos listados */}
                <div id='container_produtos' className='mt-12 mb-12 grid grid-cols-4 gap-10'>
                    {/* Percorrendo cada produto */}
                    {lista.map((item, idx) => {return <Produto key={idx} img={item.image_url} name={item.name} price={item.price_in_cents}/>})}
                </div>

            </section>
        )
   }
}

// Criando tipagem para as propriedades do button
interface ButtonProps{
    name:string,
}

interface ApiProps{
    category:string
}

// Componente Button
function Button(props:ButtonProps){
    // Desestruturando props
    const {name} = props

    // Requisicao
    async function requestApi(){
        try {
            // Condições para cada clique no button
            if(name === 'Todos os produtos'){
                // Fazendo requisição
                const response = await fetch('https://api-rockeatseat.vercel.app')
                // Transformando a resposta em json
                const data = await response.json()

                console.log(data)
            }

            if(name === 'Camisetas'){

                // Fazendo requisição
                const response = await fetch('https://api-rockeatseat.vercel.app')

                // Transformando a resposta em json
                const data = await response.json()

                const blusas:object[] = data.filter(({category}:ApiProps) => category === 't-shirts')
                console.log(blusas)
            }

        } catch (e) {
            console.log(e)
        }
    }

    return <button onClick={requestApi}>{name}</button>
}


// Produto
interface ProdutoProps{
    img:string,
    name:string,
    price:number
}

// Componente Produto
function Produto(props:ProdutoProps){
    // Propriedades do componente
    const {img, name, price} = props

    return(
        <div className='bg-gray-100 rounded-t-lg'>

            {/* imagem do produto */}
            <img src={img} alt='imagem do produto' className='h-64 w-64 rounded-t-lg'/>

            {/* Descricao dos produtos */}
            <div id='descricao-dos-produtos' className='flex flex-col gap-2 p-2 '>
                <p>{name}</p>
                <hr/>
                <p><strong>RS {Math.ceil(price / 80).toFixed(2).replace('.',',')}</strong></p>
            </div>
        </div>
    )
}