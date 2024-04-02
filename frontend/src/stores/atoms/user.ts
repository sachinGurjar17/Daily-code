import { atom } from "recoil";

export const userAtom = atom<{
    isLoading : boolean ,
    user?:{
        email:string
    }
}>({
    key:"userAtom",
    default:{
        isLoading:true 
    }
})