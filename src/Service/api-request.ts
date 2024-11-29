// Axios
import axios from "axios"

export async function getData(limit?:number, page?:number, sort?:string, category?:string){
    try {
        // Making request
        const products = await axios.get(import.meta.env.VITE_API_URL, {
            params:{
                limit,
                sort,
                category,
                page
            }
        })

        // return products
        return products

    } catch (error) {
        console.log(error)
    }
}