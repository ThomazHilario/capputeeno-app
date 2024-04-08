// imports Interfaces
import { PartOfThePurchaseType } from '../interfaces/cartType'

export const PartOfThePurchase = ({cartTotalValue}:PartOfThePurchaseType) => {
        return(
            <aside className='flex flex-col justify-between bg-white w-12/12 lg:w-6/12 h-6/12'>
                {/* Resumo dos pedidos */}
                <div>
                    {/* titulo */}
                    <h2 className='mt-2 mb-4 pl-5 font-bold text-xl'>Resumo do Pedido</h2>
    
                    {/* valor dos produtos */}
                    <p className='pl-5 flex justify-between pr-8'>Subtotal dos produtos <span>R$ {cartTotalValue.toFixed(2)}</span></p>
    
                    {/* Valor da entrega */}
                    <p className='mt-3 pl-5 flex justify-between pr-8'>Entrega <span>R$ 40,00</span></p>
    
                    {/* separando linhas */}
                    <hr className='mt-4 lg:ml-6 mr-6'/>
    
                    {/* Total */}
                    <p className='lg:mt-3 font-bold flex justify-between pr-8 pl-5'>Total <span>R$ {(cartTotalValue + 40).toFixed(2)}</span></p>
    
                    {/* Button */}
                    <button className='bg-green-500 block m-auto mt-4 mb-3 w-10/12 h-12 rounded-sm text-white'>FINALIZAR A COMPRA</button>
                </div>
    
                {/* Licencas */}
                <div className='p-5'>
                    <a href='#' className='block underline underline-offset-1 text-gray-700 m-2'>AJUDA</a>
                    <a href='#' className='block underline underline-offset-1 text-gray-700 m-2'>REEMBOLSO</a>
                    <a href='#' className='block underline underline-offset-1 text-gray-700 m-2'>ENTREGAS E FRETE</a>
                    <a href='#' className='block underline underline-offset-1 text-gray-700 m-2'>TROCAS E DEVOLUÇÕES</a>
                </div>
    
            </aside>
        )
}