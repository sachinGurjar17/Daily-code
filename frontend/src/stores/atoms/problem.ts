import { atom } from "recoil";

export const problemAtom = atom<{
    difficulty : string ,
    title : string ,
    description : string ,
    problemID : number,
    input : string ,
    output : string ,
    tags :Object ,
    initialCode : string 
}>({
    key:"problemAtom",
    default:{
        difficulty : "easy" ,
        title : "" ,
        description : "" ,
        problemID : 0,
        input : "",
        output : "",
        tags : {} ,
        initialCode :""
    }
})
