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

// Componente Home - Principal
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

                // Armazenando o resultado na state lista
                setLista(data)

                // Alterando a state carregado para true
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
                        <Button name={'Todos os produtos'} lista={lista} setLista={setLista} />
                        <Button name={'Camisetas'} lista={lista} setLista={setLista} />
                        <Button name={'Canecas'} lista={lista} setLista={setLista} />
                    </div>

                    <select name="filtro" id="filtro-de-selecao">
                        <option value="default">Organizar por</option>
                        <option value="Menor preco">Preço: maior-menor</option>
                        <option value="maior preco">Preço: menor-maior</option>
                        <option value="maior preco">Mais vendidos</option>
                    </select>
                </nav>

                {/* Container dos produtos listados */}
                <div id='container_produtos' className='mt-12 mb-12 grid grid-cols-4 gap-8'>

                    {/* Percorrendo cada produto */}
                    {lista.slice(0,12).map((item, idx) => {return <Produto key={idx} img={item.image_url} name={item.name} price={item.price_in_cents}/>})}

                </div>

            </section>
        )
   }
}

// Criando tipagem para as propriedades do button
interface ButtonProps{
    name:string,
    lista:Users[],
    setLista:React.Dispatch<React.SetStateAction<Users[]>>
}

interface ApiProps{
    category:string
}

// Componente Button
function Button(props:ButtonProps){

    useEffect(() => {
        // Fazendo requisicao a api
        async function loadlistaDefault() {
            try {
                // Recebendo resposta
                const response = await fetch('https://api-rockeatseat.vercel.app')

                // Transformando a resposta em dados consumiveis
                const data = await response.json()

                // Armazenando o resultado na state lista
                setListadefault(data)

            } catch (e) {
                console.log(e)
            }
        }

        // chamando a funcao
        loadlistaDefault()
    })

    // Desestruturando props
    const {name, lista, setLista} = props

    // Lista - padrao
    const [listadefault, setListadefault] = useState(lista)

    // Requisicao
    function requestApi(){
        // Filtrando o array somente com as Camisetas
        const blusas:Users[] = listadefault.filter(({category}:ApiProps) => category === 't-shirts')

        // Filtrando o array somente com as Canecas
        const canecas:Users[] = listadefault.filter(({category}:ApiProps) => category === 'mugs')


        if(name === 'Camisetas'){
            setLista(blusas)
        }

        if(name === 'Canecas'){         
            // Setando nova lista
            setLista(canecas)

        }

        if(name === 'Todos os produtos'){
            setLista(listadefault)  
        }               

        
    }

    return <button  className='first:border-2 border-b-amber-500' onClick={requestApi}>{name}</button>
}


// interface do Produto
interface ProdutoProps{
    img:string,
    name:string,
    price:number
}

// Componente Produto
function Produto(props:ProdutoProps){
    // Desestruturando propriedades do componente
    const {img, name, price} = props

    return(
        <div className='bg-gray-100 rounded-t-lg'>

            {/* imagem do produto */}
            <img src={img} alt='imagem do produto' className='h-72 w-72 rounded-t-lg'/>

            {/* Descricao dos produtos */}
            <div id='descricao-dos-produtos' className='flex flex-col gap-2 p-3 '>
                <p className='name_produto text-1xl'>{name}</p>
                <hr/>
                <p><strong>RS {Math.ceil(price / 80).toFixed(2).replace('.',',')}</strong></p>
            </div>
        </div>
    )
}