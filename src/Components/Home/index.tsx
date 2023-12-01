import '../../index.css'
import {useState, useEffect} from 'react'

export default function Home(){
    const {lista,setLista} = useState([])
    return(
        <section className='w-9/12'>

            {/* navegacao dos produtos */}
            <nav>
                <Button name={'Todos os produtos'} setLista={setLista}/>
                <Button name={'Camisas'} setLista={setLista}/>
                <Button name={'Canecas'} setLista={setLista}/>
            </nav>

            <select name="filtro" id="filtro-de-selecao">
                <option value="default">Organizar por</option>
                <option value="Menor preco">Preço: maior-menor</option>
                <option value="maior preco">Preço: menor-maior</option>
                <option value="maior preco">Mais vendidos</option>
            </select>
        </section>
    )
}

// Criando tipagem para as propriedades do button
interface ButtonProps{
    name:string,
    setLista:() => void
}
// Componente Button
function Button(props:ButtonProps){
    // Desestruturando props
    const {name, setLista} = props

    // Requisicao
    async function requestApi(){
        try {
            if(name === name){
                const response = await fetch('https://api-rockeatseat.vercel.app')
                const data = await response.json()

                console.log(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return <button onClick={requestApi}>{name}</button>
}