import { useRecoilState } from "recoil";
import { problemAtom } from "../stores/atoms/problem";
import { useEffect } from "react";
import { getDatabase , ref , onValue} from "firebase/database";
import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";

export const Problem = ()=>{


    const [problem , setproblem]  = useRecoilState(problemAtom); 

    const {id} = useParams();

    useEffect(()=>{
        const fetchData = async () =>{
            const db = getDatabase();
            const problemListRef =  ref(db, `/problems/${id}`);
            onValue(problemListRef, (snapshot) => {
            const data = snapshot.val();            
            setproblem(data);           
        });
        }
        fetchData() ;
    },[id])
    
    return (
        <>
         <div className="bg-slate-900 w-full h-full flex flex-col justify-center items-center">
            <div className="w-7/12 bg-slate-600 border rounded-lg p-10 m-20   ">
                <div>
                    <h1 className="text-[27px] text-white ">{problem.problemID}.  {problem.title}</h1>
                    <p className="text-white text-lg my-6">{problem.description}</p>

                    <div className="text-white text-lg flex flex-col border-l-2 border-indigo-200 m-4 ">
                        <h3>Example 1</h3> 
                        <div>Input : {problem.input}</div>
                        <div>Output : {problem.output}</div>
                    </div>
                </div>
            </div>
            <CodeEditor initialCode={problem.initialCode} output={problem.output}/>
           
         </div>
        </>
    )
}