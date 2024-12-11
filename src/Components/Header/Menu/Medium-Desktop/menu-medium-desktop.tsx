// Components
import { SeachInput } from '../../Seach/search-input';
import { ShoppingBag } from '../../Shopping-Bag/shopping-bag';

export const Navegation = () => {

    return(
      <nav className='hidden md:flex gap-5 min-w-[300px]'>
        
      {/* formulario */}
      <SeachInput/>

      {/* icone carrinho de compras */}
      <ShoppingBag/>
    </nav>
    )
}