// Interface da state lista
export interface ProductsProps {
    category:string,
    description:string,
    id:string,
    image_url:string,
    name:string,
    price_in_cents:number,
    priceAtually:number,
    sales:number,
    amount:number
}

// interface do Produto
export interface ProdutoProps{
    img:string,
    name:string,
    price:number
}
