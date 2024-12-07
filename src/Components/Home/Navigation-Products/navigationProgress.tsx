// store
import { store } from '../../../Store/store'

export const NavegationProgress = ({totalPages}:{totalPages:number[]}) => {

    // store
    const { page, setPage } = store()

    // Logics from buttons steps
    const buttonsStep = {
        leftButtonDisable: {
            disabled: page > totalPages[0] ? false : true
        },
        rightButtonDisable: {
            disabled: page < totalPages[totalPages.length - 1] ? false : true
        } 
    }

    // Style Step selected
    const styleStepSelected = 'border-orange-400'

    // Style buttons prev and next
    const stylePrevAndNextButons = 'bg-[#cbd5e1] w-[1.8rem] rounded-sm disabled:bg-gray-400/30'

    if(totalPages.length > 0){
        return(
            <section role='navigation-for-steps' className='flex gap-1 justify-start md:justify-end mt-4 lg:justify-end' id='navegatinProgress'>
    
                {/* Buttons page */}
               {totalPages.map((numberPage, index) => (
                <button key={index} className={`${page === numberPage && styleStepSelected} bg-[#cbd5e1] w-[1.8rem] rounded-sm border-2`} onClick={() => setPage(numberPage)}>{numberPage}</button>
               ))}
    
               {/* Button Prev */}
               <button {...buttonsStep.leftButtonDisable} className={stylePrevAndNextButons} onClick={() => setPage(page - 1)}>&lsaquo;</button>
    
               {/* Button Next */}
               <button {...buttonsStep.rightButtonDisable} className={stylePrevAndNextButons} onClick={() => setPage(page + 1)}>&rsaquo;</button>
            </section>
        )
    }
}