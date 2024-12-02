import '../../index.css'

// Import react
import {useState, useEffect } from 'react'

// Import context
import { UseStatesProps } from '../../Context/context'

// Axios
import { getData } from '../../Service/api-request'

// Import Interface
import { ProductsProps } from '../../interfaces/homeTypes'

// Store
import { store } from '../../Store/store'

// import Components
import { Produto } from '../../Components/produtoCard'
import { NavigationForCategory } from '../../Components/navigation-for-category'
import { FilterProducts } from '../../Components/filterProducts'
import { NavegationProgress } from '../../Components/navigationProgress'

// Componente Home - Principal
export default function Home(){

    const {seach} = UseStatesProps() 

    // store
    const { page, sort, category } = store()

    // State - lista
    const [lista, setLista] = useState<ProductsProps[]>([])

    // Filtro de elementos
    const listFilter = lista.filter(products => products.name.toLowerCase().includes(seach.toLowerCase()) && products)
    
    // state - carregado
    const [carregado, setCarregado] = useState(true)

    // State - totalPages
    const [totalPages, setTotalPages] = useState<number[]>([])

    useEffect(() => {
        async function loadLista(){
            try {
                console.log(category)
                const response = await getData(12, page, sort, category)
                
                // Armazenando o resultado na state lista
                setLista(response?.data.data)

                // Armazenando total de paginas
                setTotalPages(response?.data.totalPage)

                // Alterando a state carregado para true
                setCarregado(false)
            } catch (e) {
                console.log(e)
            }
        }

        loadLista()
    },[page, sort, category])

   if(carregado){
    return (
    <section className='h-screen flex justify-center items-center'>
        <h1>Carregando</h1>
    </section>
    )

   } else{
        return(
            <section className='w-11/12 sm:w-9/12 md:w-10/12 lg:w-9/12'>

                {/* navegacao dos produtos */}
                <aside className='mt-8 flex flex-col md:flex-row justify-between'>
                    {/* buttons */}
                    
                    <NavigationForCategory />
                        

                    {/* Filtro dos produtos */}
                    <FilterProducts lista={lista} setLista={setLista}/>

                </aside>

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
}

/*

    

*/