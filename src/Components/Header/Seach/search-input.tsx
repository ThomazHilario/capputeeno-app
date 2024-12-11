// Context
import { UseStatesProps } from "../../../Context/context"

export const SeachInput = () => {

    // Context - states
    const { setSeach } = UseStatesProps()

    return(
        <form className="min-w-[300px]">
            <input type='text' placeholder='Procurando por algo em especifico?' onChange={(e) => setSeach(e.target.value)} className='w-full p-1 pl-4 bg-gray-100 rouded-sm'/>
        </form>
    )
}