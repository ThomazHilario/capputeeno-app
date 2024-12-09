// imports React
import { useNavigate } from 'react-router-dom'

// imports interfaces
import { ProdutoProps } from '../../../interfaces/homeTypes'

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

    // Price formated
    const priceProduct = Math.ceil(price / 80).toFixed(2).replace('.',',')

    return(
        <article className='cursor-pointer bg-gray-100 rounded-t-lg font-saira' onClick={navegationPage}>

                {/* imagem do produto */}
                <img src={img} alt='imagem do produto' className='h-auto rounded-t-lg'/>

                {/* Descricao dos produtos */}
                <section id='descricao-dos-produtos' className='flex flex-col gap-2 p-3 '>
                    {/* Name product */}
                    <p className='name_produto text-1xl opacity-70'>{name}</p>

                    {/* Line horizontal */}
                    <hr/>

                    {/* Price Product */}
                    <p><strong>R$ {priceProduct}</strong></p>
                </section>
        </article>
    )
}