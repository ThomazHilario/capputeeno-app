// Context
import { FormEvent } from "react"
import { UseStatesProps } from "../../../Context/context"

export const SeachInput = () => {

    // Context - states
    const { seach, setSeach } = UseStatesProps()

    // Cancel refresh page
    const cancelPageRefreshing = (e:FormEvent) => {
        // Method cancel page refreshing
        e.preventDefault()
    }

    return(
        <form role="seach-input" className="min-w-[300px]" onSubmit={(e) => cancelPageRefreshing(e)}>
            <input type='text' value={seach} placeholder='Procurando por algo em especifico?' onChange={(e) => setSeach(e.target.value)} className='w-full p-1 pl-4 bg-gray-100 rouded-sm'/>
        </form>
    )
}