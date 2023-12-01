import { BrowserRouter } from 'react-router-dom'
import RoutesNavegation from './Routes/routes'
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
          <nav>
            {/* formulario */}
            <form>
              <input type='text' placeholder='Procurando por algo em especifico?' className='w-80 p-1 pl-4 bg-gray-100 rouded-sm'/>
            </form>

            {/* icone carrinho de compras */}
            </nav>
        </header>

        <RoutesNavegation/>
      </BrowserRouter>
    </>
  )
}

export default App
