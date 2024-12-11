// React
import { Link } from 'react-router-dom'

// Components
import { Navegation } from './Menu/Medium-Desktop/menu-medium-desktop'
import { MenuMobile } from './Menu/Mobile/menu-mobile'

export const Header = () => {

  return(
    <header className='h-20 pr-1 pl-1 bg-white flex justify-between items-center md:justify-between md:pr-20 md:pl-20' id='cabecalho'>

      {/* titulo logo */}
      <Link to='/'>
        <h1 className='text-[#5d5d6d] text-[2.5rem] font-saira-stencil-one'>Capputeeno</h1>
      </Link>

      {/* Navegation-Desktop */}
      <Navegation/>
      
      {/* Menu */}
      <MenuMobile/>

    </header>
  )
}