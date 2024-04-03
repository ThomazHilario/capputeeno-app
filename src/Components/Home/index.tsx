import '../../index.css'

// Import react
import {useState, useEffect, useMemo } from 'react'
import {useNavigate} from 'react-router-dom'

// Import context
import { UseStatesProps } from '../../Context/context'

// Import Interface
import { Users, ButtonProps, ApiProps, ProdutoProps, NavegationProps, FilterProduct } from '../../interfaces/homeTypes'


// Componente Home - Principal
export default function Home(){

    const {seach} = UseStatesProps()

    // variaveis para mudar a pagina
    const [prev, setPrev] = useState<number>(0)
    const [next, setNext] = useState<number>(12) 

    // State - lista
    const [lista, setLista] = useState<Users[]>([])

    // Filtro de elementos
    const listFilter = lista.filter(products => products.name.toLowerCase().includes(seach.toLowerCase()) && products)
    
    // state - carregado
    const [carregado, setCarregado] = useState(true)

    useEffect(() => {
        async function loadLista(){
            try {
                const response = await fetch('https://api-rockeatseat.vercel.app')
                const data = await response.json()

                // Armazenando o resultado na state lista
                setLista(data)

                // Alterando a state carregado para true
                setCarregado(false)
            } catch (e) {
                console.log(e)
            }
        }

        loadLista()
    },[])

   if(carregado === true){
    return (
    <div className='h-screen flex justify-center items-center'>
        <h1>Carregando</h1>
    </div>
    )

   } else{
        return(
            <section className='w-7/12 md:w-8/12 lg:w-9/12'>

                {/* navegacao dos produtos */}
                <nav className='mt-8 flex flex-col md:flex-row justify-between'>
                    {/* buttons */}
                    <div className='flex gap-5'>
                        <Button name={'Todos os produtos'} lista={lista} setLista={setLista} />
                        <Button name={'Camisetas'} lista={lista} setLista={setLista} />
                        <Button name={'Canecas'} lista={lista} setLista={setLista} />
                    </div>

                    {/* Filtro dos produtos */}
                    <FilterProducts lista={lista} setLista={setLista}/>

                </nav>

                <NavegationProgress setPrev={setPrev} setNext={setNext} prev={prev} next={next}/>

                {/* Container dos produtos listados */}
                <div id='container_produtos' className='mt-8 mb-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4' >

                    {/* Percorrendo cada produto */}
                    {listFilter.slice(prev,next).map((item, idx) => <Produto key={idx} img={item.image_url} name={item.name} price={item.price_in_cents}/>)}

                </div>

            </section>
        )
   }
}

// Componente Button
function Button({name, lista, setLista}:ButtonProps){

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
    },[])

    // Lista - padrao
    const [listadefault, setListadefault] = useState(lista)

    // Requisicao
    function requestApi(){
        // Filtrando o array somente com as Camisetas
        const blusas:Users[] = listadefault.filter(({category}:ApiProps) => category === 't-shirts')

        // Filtrando o array somente com as Canecas
        const canecas:Users[] = listadefault.filter(({category}:ApiProps) => category === 'mugs')


        if(name === 'Camisetas'){
            // Capturando tag select
            const select = document.getElementById('filtro-de-selecao') as HTMLSelectElement

            // Alterando o valor para default
            select.value = 'default'

            // Setando nova lista
            setLista(blusas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'
        }

        if(name === 'Canecas'){
            // Capturando o filtro
            const select = document.getElementById('filtro-de-selecao') as HTMLSelectElement

            // Alterando o valor para default
            select.value = 'default'      

            // Setando nova lista
            setLista(canecas)

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'none'

        }

        if(name === 'Todos os produtos'){
            setLista(listadefault)  

            // Alterando o display do navegationProgress
            const navegatinProgress = document.getElementById('navegatinProgress') as HTMLElement
            navegatinProgress.style.display = 'flex'
        }               

        
    }

    return <button  className='first:border-2 border-b-amber-500' onClick={requestApi}>{name}</button>
}
// -------------------------------------

// Componente FilterProducts
function FilterProducts({lista,setLista}:FilterProduct){
 
    // Salvando a lista no cache, evitando fazer outra requisição
    const listaDefaultCache = useMemo(() => {
        return lista
    },[lista])

    // state - listaDefault
    const [listaDefault, setListaDefault] = useState([...listaDefaultCache])


    // Filter
    function filter(option:string){
        // Setando a lista do cache
        setListaDefault([...listaDefaultCache])

        // Opções de filtragens
        if(option === 'maior'){
            const newLista = listaDefault.sort((a,b) => b.price_in_cents - a.price_in_cents)
            setLista(newLista)
        } 
        
        if(option === 'menor'){
            const newLista = listaDefault.sort((a,b) => a.price_in_cents - b.price_in_cents)
            setLista(newLista)
        }
        
        if(option === 'maisVendidos'){
            const newLista = listaDefault.sort((a,b) => a.sales - b.sales)
            setLista(newLista)
        }

        if(option === 'default'){
            setLista(listaDefault)
        }

    }

    return(
        <select name="filtro" id="filtro-de-selecao" className='w-40 mt-4 md:mt-0' onChange={(e) => filter(e.target.value)}>
            <option value="default">Organizar por</option>
            <option value="maior">Preço: maior-menor</option>
            <option value="menor">Preço: menor-maior</option>
            <option value="maisVendidos">Mais vendidos</option>
        </select>
    )
}


// Componente Produto
function Produto({img,name,price}:ProdutoProps){
    
    // Navigate
    const navigate = useNavigate()

    // navegando ate a pagina
    function navegationPage(){

        localStorage.setItem('@item',JSON.stringify({
            image_url:img,
            name:name,
            price_in_cents:price
        }))

        navigate(`/produto/${name}/${price}`)
    }

    return(
        <div className='produto bg-gray-100 rounded-t-lg' onClick={navegationPage}>

                {/* imagem do produto */}
                <img src={img} alt='imagem do produto' className='h-auto rounded-t-lg'/>

                {/* Descricao dos produtos */}
                <div id='descricao-dos-produtos' className='flex flex-col gap-2 p-3 '>
                    <p className='name_produto text-1xl'>{name}</p>
                    <hr/>
                    <p><strong>RS {Math.ceil(price / 80).toFixed(2).replace('.',',')}</strong></p>
                </div>
        </div>
    )
}
// --------------------------------------


// Componente NavegationProgress
function NavegationProgress({prev, next, setPrev, setNext}:NavegationProps){

    // State - contador
    const [cont, setCont] = useState<number>(0)

    // Usando o useEffect para verificar o contador
    useEffect(() => {

        // Caso contador seja abaixo de 0
        if(cont < 0){
            setCont(0)
            setPrev(0)
            setNext(12)
        }

        // Caso contador seja maio que o total de buttons
        if(cont > document.querySelectorAll('.step-button').length){
            setCont(document.querySelectorAll('.step-button').length)
        }

    },[cont, setPrev, setNext])

    // Voltando na pagina
    function prevProgress(){

        // Armazenando o valor de const a uma variavel
        const value = cont - 2

        // Captura os buttons por meio do querySelector
        const button = document.querySelectorAll<HTMLElement>('.step-button')

        // Primeiroo step-button
        const btnStepPrimary:HTMLElement = document.getElementById('step-button-only') as HTMLElement

        // Percorrendo cada button
        button.forEach((button,idx) => {
            
            // Caso o value seja igual ao idx do button
            if(value === idx){

                // Decremento o contador
                setCont(cont - 1)

                // Alterando o background do step-button
                button.style.border = '1px solid orange'
                button.style.backgroundColor = 'rgb(203 213 225)'

                // Alterando o slice do array
                setPrev(prev - 12)
                setNext(next - 12)

                
            } else if(cont === 1){
                // Decremento o contador
                setCont(cont -2)

                // Adicionando style ao step button
                button.style.border = '0px'
                button.style.backgroundColor = 'rgb(203 213 225)'

                // Alterando style do Primeiro step-button
                btnStepPrimary.style.border = '1px solid orange'

            } else{

                // Adicionando style ao step button
                button.style.border = '0px'
                button.style.backgroundColor = 'rgb(203 213 225)'
            }
        })
    }

    // Avancando na pagina
    function nextProgress(){
        // Armazenando cont na variavel value
        const value = cont
        
        // Captura os buttons
        const button:NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.step-button')

        // Primeiro step-button
        const btnStepPrimary:HTMLElement = document.getElementById('step-button-only') as HTMLElement

        // percorrendo array de buttons
        button.forEach((button,idx) => {

            // Alterando oo border do primeiiiro button
            btnStepPrimary.style.border = '0px'

            // Caso o contador seja igual ao idx
            if(value === idx){


                // Incrementa no contador
                setCont(cont + 1)
                button.style.backgroundColor = 'rgb(203 213 225)'
                button.style.border = '1px solid orange'

                // Alterando oo slice do array
                setPrev(prev + 12)
                setNext(next + 12)
                

            } else if(cont < 4){

                // Adicionando style ao step-button
                button.style.border = '0px'
                button.style.backgroundColor = 'rgb(203 213 225)'
            }
        })
    }

    return(
        <div className='flex gap-1 justify-start md:justify-end mt-4 lg:justify-end' id='navegatinProgress'>
            <button id='step-button-only' className='bg-slate-300'>1</button>
            <button className='step-button'>2</button>
            <button className='step-button'>3</button>
            <button className='step-button'>4</button>
            <button className='step-button'>5</button>
            <button className='step-button-progress' id='step-prev' onClick={prevProgress}>&lsaquo;</button>
            <button className='step-button-progress' id='step-next' onClick={nextProgress}>&rsaquo;</button>
        </div>
    )
}
// --------------------------------------