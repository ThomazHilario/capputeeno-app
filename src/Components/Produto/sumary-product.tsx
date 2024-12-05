export const SumaryProduct = ({name, price}:{name:string, price:number}) => {
    // Tag 
    const tagProduct = name !== undefined && name.includes('Camiseta') ? 'Camiseta' : 'Canecas'

    // Price formated
    const priceFormated = Math.ceil((price as number) / 80).toFixed(2).replace('.',',')
    
    return(
        <article id='descricao'>

            {/* Categoria */}
            <p className='mb-4'>{tagProduct}</p>

            {/* Titulo */}
            <h1 className='text-4xl mb-3'>{name}</h1>

            {/* Preco */}
            <h2 className='text-2xl'><strong>R$ {priceFormated}</strong></h2>
                
            {/* Frete */}
            <p className='text-xs mt-10 text-justify'>Frete de R$ 40,00 para todo o Brasil. Gratis para compras acima de R$ 90,00</p>

            {/* informacoes do produto */}
            <h2 className='mt-20 text-xl mb-2 md:text-3xl'>Descricao</h2>
            <p className='text-sm w-6/6 text-justify md:w-96'>Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto. </p>
            
        </article>
    )
}