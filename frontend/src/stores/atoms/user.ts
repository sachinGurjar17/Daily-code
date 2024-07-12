import { atom } from "recoil";
export const userAtom = atom<{
    isLoading : boolean ,
    user?:{
        email:string,
        username : string ,
        userId : number ,
        isAdmin : boolean ,
        points : number,
        totalSolvedQuestion : number,
        easyQuestions : number ,
        mediumQuestions : number ,
        hardQuestions : number,
        lastSubmission : number ,
        solvedQuestions : number[]
    }
}>({
    key:"userAtom",
    default:{
        isLoading:true,     
    }
})