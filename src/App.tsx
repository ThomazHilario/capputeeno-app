import { BrowserRouter, Link } from 'react-router-dom'
import ContextCart from './Context/context'
import { UseStatesProps} from './Context/context'
import RoutesNavegation from './Routes/routes'
import bagIcon from './assets/bag_icons/bag32.png'
import './index.css'

function App() {


  return (
    <>
      <ContextCart>
        <BrowserRouter>

          {/* Componente Header */}
          <Header/>
          
          {/* Componente de rotas */}
          <RoutesNavegation/>

        </BrowserRouter>
      </ContextCart>
    </>
  )
}

// Componente Header
function Header(){

  // Pegando a state global cartValue
  const { cartValue, setSeach } = UseStatesProps()

  return(
    <header className='flex justify-center items-center md:justify-between pr-20 pl-20' id='cabecalho'>

      {/* titulo logo */}
      <Link to='/'><h1 className='titulo'>Capputeeno</h1></Link>

      {/* Nav */}
      <nav className='hidden md:flex gap-5 '>
        {/* formulario */}
        <form>
          <input type='text' placeholder='Procurando por algo em especifico?' onChange={(e) => setSeach(e.target.value)} className='w-80 p-1 pl-4 bg-gray-100 rouded-sm'/>
        </form>

        {/* icone carrinho de compras */}
        <div id='carrinho' className='flex justify-center items-center'>
          <Link to='/carrinho'><img src={bagIcon} alt='imagem do carrinho' className='cursor-pointer'/></Link>
          <span className='bg-red-400 h-4 w-4 rounded-full flex justify-center items-center text-sm md: absolute top-11 end-20 '>{cartValue ? cartValue.length : 0}</span>
        </div>
      </nav>
      
    </header>
  )
}

export default App
