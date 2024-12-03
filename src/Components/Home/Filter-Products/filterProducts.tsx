// store
import { store } from '../../../Store/store'

// import radix
import * as Select from '@radix-ui/react-select'

export const FilterProducts = () => {

    // store
    const { setSort } = store()

    return(
        <Select.Root onValueChange={(value) => setSort(value)}>
            <Select.Trigger className='outline-none p-1 w-full sm:w-56 bg-white rounded-sm text-black'>
                <Select.Value placeholder='Organizar Por'/>
            </Select.Trigger>
            
            
            <Select.Content className='mt-1 w-[91.5vw] sm:w-[224px] rounded-sm' position='popper'>
                    <Select.Group className='bg-white'>
                        <Select.Item value='desc' className='p-1 cursor-pointer'>
                            <Select.ItemText>Maior Preço</Select.ItemText>
                        </Select.Item>
                        
                        <Select.Item value='asc' className='p-1 cursor-pointer'>
                            <Select.ItemText>Menor Preço</Select.ItemText>
                        </Select.Item>

                        <Select.Item value='rating' className='p-1 cursor-pointer'>
                            <Select.ItemText>Mais Vendidos</Select.ItemText>
                        </Select.Item>
                    </Select.Group>
            </Select.Content>
            
            
        </Select.Root>
    )
}

/* 

 

*/