// import React
import { Link } from 'react-router-dom'

// import Context
import { UseStatesProps } from '../Context/context'

// import icon
import { LuShoppingBag } from "react-icons/lu";

export const Header = () => {
    // Pegando a state global cartValue
  const { cartValue, setSeach } = UseStatesProps()

  return(
    <header className='h-20 pr-1 pl-1 bg-white flex justify-between items-center md:justify-between md:pr-20 md:pl-20' id='cabecalho'>

      {/* titulo logo */}
      <Link to='/'><h1 className='text-[#5d5d6d] text-[2.5rem] font-saira-stencil-one'>Capputeeno</h1></Link>

      {/* Nav */}
      <nav className='md:flex gap-5 '>
        {/* formulario */}
        <form className='hidden md:block'>
          <input type='text' placeholder='Procurando por algo em especifico?' onChange={(e) => setSeach(e.target.value)} className='w-80 p-1 pl-4 bg-gray-100 rouded-sm'/>
        </form>

        {/* icone carrinho de compras */}
        <div id='carrinho' className='flex justify-center items-center'>
          {/* Link de navegação */}
          <Link to='/carrinho'>
            <LuShoppingBag size={30}/>
          </Link>

          {/* span da bolsa */}
          <span className='absolute bg-red-400 h-4 w-4 rounded-full flex justify-center items-center text-[0.8rem] font-bold md:right-[4.9rem]  top-11 right-0 '>
            {cartValue ? cartValue.length : 0}
          </span>
        </div>
      </nav>
      
    </header>
  )
}