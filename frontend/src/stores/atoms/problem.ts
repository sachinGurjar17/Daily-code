import { atom } from "recoil";

export const problemAtom = atom<{
    difficulty : string ,
    title : string ,
    description : string ,
    problemID : number,
    input : string ,
    output : string ,
    tags :string[] ,
    initialCode : string ,
    contributedBy : string ,
    lastSubmittedBy : string,
    totalSubmissions:number
}>({
    key:"problemAtom",
    default:{
        difficulty : "easy" ,
        title : "" ,
        description : "" ,
        problemID : 0,
        input : "",
        output : "",
        tags : [],
        initialCode :"",
        contributedBy:"",
        lastSubmittedBy:"",
        totalSubmissions:0
    }
})
