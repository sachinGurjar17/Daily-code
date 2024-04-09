import { atom } from "recoil";

export const problemAtom = atom<{
    difficulty : string ,
    title : string ,
    description : string ,
    problemID : number
}>({
    key:"problemAtom",
    default:{
        difficulty : "easy" ,
        title : "" ,
        description : "" ,
        problemID : 0
    }
})
