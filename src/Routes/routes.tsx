import '../index.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Produto from '../Pages/Produto'
import Carrinho from '../Pages/Carrinho'

export default function RoutesNavegation(){
    return(
        <main className='flex justify-center bg-gray-200'>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/produto/:id/:price' element={ <Produto/> }/>
                <Route path='/carrinho' element={ <Carrinho/> }/>
            </Routes>
        </main>
    )
}