import { atom } from "recoil";
export const userAtom = atom<{
    isLoading : boolean ,
    user?:{
        email:string,
        username : string ,
        rank : Number ,
        isAdmin : Boolean ,
        totalSolvedQuestion : Number,
        easyQuestions : Number ,
        mediumQuestions : Number ,
        difficultQuestions : Number,
        lastSubmission : Number ,
    }
}>({
    key:"userAtom",
    default:{
        isLoading:true, 
    }
})