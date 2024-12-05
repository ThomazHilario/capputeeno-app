// Store
import { store } from "../../../Store/store"

export const NavigationForCategory = () => {

    // store
    const { category, setCategory, setPage } = store()

    // Change Category
    function changeCategoryAndPage(category:string){
        // Change category
        setCategory(category)

        // Change page
        setPage(1)
    }

    const buttonStyleForTailwind = 'whitespace-nowrap'
    const buttonSelectStyleForTailwind = 'border-b-2 border-orange-500'

    return( 
        <div className='flex justify-evenly mb-2 sm:justify-start sm:gap-2 md:mb-0'>
            <button value='all' className={`${buttonStyleForTailwind} ${category === 'all' && buttonSelectStyleForTailwind}`} onClick={() => changeCategoryAndPage('all')}>Todos os produtos</button>

            <button className={`${buttonStyleForTailwind} ${category === 't-shirts' && buttonSelectStyleForTailwind}`} 
            onClick={() => changeCategoryAndPage('t-shirts')}>Camisetas</button>

            <button className={`${buttonStyleForTailwind} ${category === 'mugs' && buttonSelectStyleForTailwind}`} onClick={() => changeCategoryAndPage('mugs')}>Canecas</button>

        </div>
)
}