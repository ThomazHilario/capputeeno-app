import '../index.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../Components/Home'
import Produto from '../Components/Produto'
import Carrinho from '../Components/Carrinho'

export default function RoutesNavegation(){
    return(
        <main className='bg-gray-200 h-100vh flex justify-center'>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/produto/:id' element={ <Produto/> }/>
                <Route path='/carrinho' element={ <Carrinho/> }/>
            </Routes>
        </main>
    )
}