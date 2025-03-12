// Css import
import '../../index.css'

// Import react
import {useState, useEffect } from 'react'

// Import context
import { UseStatesProps } from '../../Context/context'

// Axios
import { getData } from '../../Service/api-request'

// Interface
import { ProductsProps } from '../../interfaces/homeTypes'

// Store
import { store } from '../../Store/store'

// Components
import { Loading } from '../../Components/UI/loading'
import { Produto } from '../../Components/Home/Product/produtoCard'
import { NavigationForCategory } from '../../Components/Home/Navigation-Products/navigation-for-category'
import { FilterProducts } from '../../Components/Home/Filter-Products/filterProducts'
import { NavegationProgress } from '../../Components/Home/Navigation-Products/navigationProgress'

// Componente Home - Principal
export default function Home(){

    // Context
    const {seach} = UseStatesProps() 

    // store - zustand
    const { page, sort, category } = store()

    // State - lista
    const [products, setProducts] = useState<ProductsProps[]>([])

    // Filtro de elementos
    const listFilter = products.filter(products => products.name.toLowerCase().includes(seach.toLowerCase()) && products)
    
    // state - carregado
    const [isLoading, setIsLoading] = useState(true)

    // State - totalPages
    const [totalPages, setTotalPages] = useState<number[]>([])

    useEffect(() => {
        async function loadProducts(){
            try {
                const response = await getData(12, page, sort, category)
                
                // Armazenando o resultado na state lista
                setProducts(response?.data.data)

                // Armazenando total de paginas
                setTotalPages(response?.data.totalPage)

                // Alterando a state carregado para true
                setIsLoading(false)
            } catch (e) {
                console.log(e)
            }
        }

        loadProducts()
    },[page, sort, category])

   if(isLoading) return <Loading/>
   
    return(
        <section className='w-11/12 sm:w-9/12 md:w-10/12 lg:w-9/12'>

            {/* navegacao dos produtos */}
            <aside className='mt-8 flex flex-col md:flex-row justify-between'>

                {/* Navegation product for category */}
                <NavigationForCategory/>
                    

                {/* Sort products */}
                <FilterProducts/>

            </aside>

            {/* Steps navegation products */}
            <NavegationProgress totalPages={totalPages}/>

            {/* Container dos produtos listados */}
            <section id='container_produtos' className='min-h-screen mt-8 mb-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4' >

                {/* Percorrendo cada produto */}
                {listFilter.map((item, idx) => (
                    <Produto 
                        key={idx} 
                        img={item.image_url} 
                        name={item.name} 
                        price={item.price_in_cents}/>
                ))}

            </section>

        </section>
    )
}