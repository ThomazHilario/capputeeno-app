export interface StoreProps{
    page:number;
    setPage:(pageValue:number) => void;
    sort:string;
    setSort:(sortValue:string) => void;
    category:string;
    setCategory:(categoryValue:string) => void;
}