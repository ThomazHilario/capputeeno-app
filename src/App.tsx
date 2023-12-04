import { BrowserRouter } from 'react-router-dom'
import RoutesNavegation from './Routes/routes'
import bagIcon from './assets/bag_icons/bag32.png'
import './index.css'

function App() {
  return (
    <>
      <BrowserRouter>

        {/* header */}
        <header className='flex justify-around items-center'>
          {/* titulo logo */}
          <h1 className='titulo'>Capputeeno</h1>

          {/* Nav */}
          <nav className='flex gap-5'>
            {/* formulario */}
            <form>
              <input type='text' placeholder='Procurando por algo em especifico?' className='w-80 p-1 pl-4 bg-gray-100 rouded-sm'/>
            </form>

            {/* icone carrinho de compras */}
            <div id='carrinho'>
              <img src={bagIcon} alt='imagem do carrinho' className='cursor-pointer'/>
            </div>
          </nav>
        </header>

        <RoutesNavegation/>
      </BrowserRouter>
    </>
  )
}

export default App
