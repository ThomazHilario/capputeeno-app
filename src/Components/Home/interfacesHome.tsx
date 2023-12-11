// Interface da state lista
export interface Users {
    category:string,
    description:string,
    id:string,
    image_url:string,
    name:string,
    price_in_cents:number,
    sales:number
}

// Criando tipagem para as propriedades do button
export interface ButtonProps{
    name:string,
    lista:Users[],
    setLista:React.Dispatch<React.SetStateAction<Users[]>>
}

export interface ApiProps{
    category:string
}

// interface do Produto
export interface ProdutoProps{
    img:string,
    name:string,
    price:number
}

// Componente NavegationProgress
export interface NavegationProps{
    prev:number,
    next:number,
    setPrev:React.Dispatch<React.SetStateAction<number>>;
    setNext:React.Dispatch<React.SetStateAction<number>>;
}
