import { BrowserRouter, Link } from 'react-router-dom'
import ContextCart from './Context/context'
import { UseCart } from './Context/context'
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
  const { cartValue } = UseCart()

  // Função para pesquisar produto específico
  function seachProduct(value:string){
    const produto = document.querySelectorAll<HTMLElement>('.produto')

    produto.forEach(produto => {
      // Pegando o nome do produto
      const nameProduto:string = produto.firstElementChild?.nextElementSibling?.firstElementChild?.textContent?.toLowerCase() as string
      
      // O valor digitado no input
      const input = value
      
      // Caso tenha o nome do produto dentro do input
      if(nameProduto.includes(input)){

        // O display vira block
        produto.style.display = 'block'
      } else{

        // O display vira none
        produto.style.display = 'none'
      }
    })
  }

  return(
    <header className='flex justify-between items-center pr-44 pl-44' id='cabecalho'>

      {/* titulo logo */}
      <Link to='/'><h1 className='titulo'>Capputeeno</h1></Link>

      {/* Nav */}
      <nav className='flex gap-5'>
        {/* formulario */}
        <form>
          <input type='text' placeholder='Procurando por algo em especifico?' onChange={(e) => seachProduct(e.target.value)} className='w-80 p-1 pl-4 bg-gray-100 rouded-sm'/>
        </form>

        {/* icone carrinho de compras */}
        <div id='carrinho'>
          <Link to='/carrinho'><img src={bagIcon} alt='imagem do carrinho' className='cursor-pointer'/></Link>
          {cartValue ? cartValue.length : 0}
        </div>
      </nav>
      
    </header>
  )
}

export default App
