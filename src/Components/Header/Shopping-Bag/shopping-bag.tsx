// React Router DOm
import { Link } from "react-router-dom"

// React-Icons
import { LuShoppingBag } from "react-icons/lu"

// Context
import { UseStatesProps } from "../../../Context/context"

export const ShoppingBag = ({color}:{color?:string}) => {

    // Context
    const { cartValue } = UseStatesProps()

    // Prop Color for icon
    const propColorBeIcon = color ? color : 'black'

    return(
        <div id='carrinho' className='relative flex justify-center items-center w-10'>
            {/* Link de navegação */}
            <Link to='/carrinho'>
                <LuShoppingBag size={30} color={propColorBeIcon}/>
            </Link>

            {/* span da bolsa */}
            <span className='absolute bg-red-400 h-4 w-4 rounded-full flex justify-center items-center text-[0.8rem] font-bold md:right-[4.9rem] left-1/2 top-5 '>
                {cartValue ? cartValue.length : 0}
            </span>
      </div>
    )
}