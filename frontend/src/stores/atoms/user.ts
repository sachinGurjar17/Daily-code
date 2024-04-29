import { atom } from "recoil";
export const userAtom = atom<{
    isLoading : boolean ,
    user?:{
        email:string,
        username : string ,
        rank : number ,
        isAdmin : Boolean ,
        totalSolvedQuestion : number,
        easyQuestions : number ,
        mediumQuestions : number ,
        hardQuestions : number,
        lastSubmission : number ,
    }
}>({
    key:"userAtom",
    default:{
        isLoading:true,        
    }
})