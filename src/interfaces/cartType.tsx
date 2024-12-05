import { ProductsProps } from './homeTypes'

export interface ProductsPropsCart{
    name:string,
    img:string,
    price:number,
    priceAtually:number,
    amount:number,
    index:number,
    setCartTotalValue:React.Dispatch<React.SetStateAction<number>>,
    cartProduct:ProductsProps[],
    setCartProduct:React.Dispatch<React.SetStateAction<ProductsProps[]>>,
    setCartValue:React.Dispatch<React.SetStateAction<object[]>>
}

export interface PartOfThePurchaseType{
    cartTotalValue:number
}