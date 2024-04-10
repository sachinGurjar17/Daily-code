import { atom } from "recoil";

export const problemAtom = atom<{
    difficulty : string ,
    title : string ,
    description : string ,
    problemID : number,
    testCases : Object ,
    tags :Object ,
    initialCode : string 
}>({
    key:"problemAtom",
    default:{
        difficulty : "easy" ,
        title : "" ,
        description : "" ,
        problemID : 0,
        testCases : {},
        tags : {} ,
        initialCode :""
    }
})
