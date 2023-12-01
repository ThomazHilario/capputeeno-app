import { Routes, Route } from 'react-router-dom'
import Home from '../Components/Home'
import Produto from '../Components/Produto'
import Carrinho from '../Components/carrinho'

export default function RoutesNavegation(){
    return(
        <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/produto/:id' element={ <Produto/> }/>
            <Route path='/carrinho' element={ <Carrinho/> }/>
        </Routes>
    )
}