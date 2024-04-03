import { Users } from './homeTypes'

export interface ProductType{
    name:string,
    img:string,
    price:number,
    priceAtually:number,
    amount:number,
    index:number,
    setCartTotalValue:React.Dispatch<React.SetStateAction<number>>,
    cartProduct:Users[],
    setCartProduct:React.Dispatch<React.SetStateAction<Users[]>>,
    setCartValue:React.Dispatch<React.SetStateAction<object[]>>
}

export interface PartOfThePurchaseType{
    cartTotalValue:number
}