import { atom } from "recoil";

export const submissionAtom = atom<{
    user:string,
    problemId:number,
    problemTitle : string,
    status:boolean,
    time:string,
    language:string,
    points:number,
    submittedCode:number,
    executionTime?:number,
    memoryUsage?:number
}>({
    key:"submissionAtom",
    default:{
        user:"",
        problemId:0,
        problemTitle : "",
        status:false,
        time:"",
        language:"",
        points:0,
        submittedCode:0,
        executionTime:undefined,
        memoryUsage:undefined
    }
})