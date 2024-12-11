// Radix
import * as Dialog from '@radix-ui/react-dialog'

// React-icons
import { LuMenu } from 'react-icons/lu'
import { LuX } from 'react-icons/lu'

// Components
import { SeachInput } from '../../Seach/search-input'
import { ShoppingBag } from '../../Shopping-Bag/shopping-bag'
import { VisuallyHidden } from '@radix-ui/themes'

export const MenuMobile = () => {
    return(
        <Dialog.Root>
            <Dialog.Trigger className='md:hidden'>
                <LuMenu color='black' size={20}/>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='fixed bg-black/20'/>

                <Dialog.Content className='absolute top-36 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 min-w-[90%] rounded-md min-h-0 md:hidden py-3 px-2'>

                    {/* Accessibility */}
                    <VisuallyHidden>

                        {/* Title */}
                        <Dialog.Title>
                            Menu Mobile
                        </Dialog.Title>

                        {/* Description */}
                        <Dialog.Description>
                            Menu for search for products or navegation in user bag products.
                        </Dialog.Description>
                    </VisuallyHidden>

                    {/* Close Menu */}
                    <Dialog.Close className='absolute right-1 top-1'>
                        <LuX color='white' size={30}/>
                    </Dialog.Close>

                    <nav className='flex flex-col gap-5 mt-5'>
                        {/* My bag be products */}
                        <Dialog.Close className='w-10'>
                            <ShoppingBag color='white'/>
                        </Dialog.Close>

                        {/* Seach input */}
                        <SeachInput/>
                    </nav>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}