// import React
import { useState, useEffect } from "react"

// import Context
import { UseStatesProps } from "../Context/context"

// Store
import { store } from "../Store/store"

// import interface
import { ButtonProps, Users, ApiProps } from '../interfaces/homeTypes'

export const Button = () => {

    // store
    const { setCategory } = store()

    const buttonStyleForTailwind = 'whitespace-nowrap'
    const buttonSelectStyleForTailwind = 'border-b-2 border-orange-500'

    return( 
        <div className='flex justify-evenly mb-2 sm:justify-start sm:gap-2 md:mb-0'>
            <button className={`${buttonStyleForTailwind}`} onClick={() => setCategory('all')}>Todos os produtos</button>

            <button className={`${buttonStyleForTailwind}`} 
            onClick={() => setCategory('t-shirts')}>Camisetas</button>

            <button className={`${buttonStyleForTailwind}`} onClick={() => setCategory('mugs')}>Canecas</button>

        </div>
)
}