// imports React
import { useNavigate } from 'react-router-dom'

// imports interfaces
import { ProdutoProps } from '../interfaces/homeTypes'

export const Produto = ({img,name,price}:ProdutoProps) => {
    // Navigate
    const navigate = useNavigate()

    // navegando ate a pagina
    function navegationPage(){

        localStorage.setItem('@item',JSON.stringify({
            image_url:img,
            name:name,
            price_in_cents:price
        }))

        navigate(`/produto/${name}/${price}`)
    }

    return(
        <div className='cursor-pointer bg-gray-100 rounded-t-lg font-saira' onClick={navegationPage}>

                {/* imagem do produto */}
                <img src={img} alt='imagem do produto' className='h-auto rounded-t-lg'/>

                {/* Descricao dos produtos */}
                <div id='descricao-dos-produtos' className='flex flex-col gap-2 p-3 '>
                    <p className='name_produto text-1xl opacity-70'>{name}</p>
                    <hr/>
                    <p><strong>RS {Math.ceil(price / 80).toFixed(2).replace('.',',')}</strong></p>
                </div>
        </div>
    )
}