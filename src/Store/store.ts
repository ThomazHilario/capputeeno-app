// Zustand
import { create } from "zustand"; 

// Interface
import { StoreProps } from "./type-store";

export const store = create<StoreProps>((set) => ({
    page:1,
    setPage:(pageValue:number) => set(() => ({
        page: pageValue
    })),

    sort:'',
    setSort: (sortValue:string) => set(() => ({
        sort:sortValue
    })),

    category:'all',
    setCategory:(categoryValue:string) => set(() => ({
        category:categoryValue
    }))
}))