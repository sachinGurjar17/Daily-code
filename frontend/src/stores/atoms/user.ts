import { atom } from "recoil";

export const userAtom = atom<{
    isLoading : boolean ,
    user?:{
        email:string
    }
    username : string 
}>({
    key:"userAtom",
    default:{
        isLoading:true, 
        username : ""
    }
})