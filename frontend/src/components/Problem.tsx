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
        <div className="bg-slate-900">
            <div className="bg-slate-900  flex-col flex md:flex-row justify-equally items-center mx-4 ">
                <div className=" flex flex-col m-4  bg-slate-600 border rounded-2xl p-2 lg:p-8  w-full h-fit md:w-1/2  ">
                    <div className="flex flex-col  justify-evenly text-gray-400 bg-gray-900  p-2 md:p-6  h-fit rounded-xl ">
                        <div>
                          <h1 className="text-[27px] border-b-2 p-2  border-gray-400 text-wrap mb-2 ">{problem.problemID}.  {problem.title} <span 
                          className="text-sm text-center ml-8 border rounded-xl p-2"
                          >{problem.difficulty}</span></h1>
                          <div className=' rounded-lg p-1 m-1 w-fit text-md font-thin text-white mb-3 block lg:inline'>Topics : {problem.tags.join(' | ')}</div>
                        </div>
                        <p className="text-md lg:text-xl my-6 text-wrap">{problem.description}</p>

                        <div className=" text-md md:text-lg flex flex-col ">
                            <h3 className="text-2xl mb-4 ">Example</h3> 
                            Input :
                            <div className="w-full bg-gray-800 p-4 rounded my-4 text-wrap">{problem.input}</div>
                            Output :
                            <div className="w-full bg-gray-800 p-4 rounded my-4 text-wrap">{problem.output}</div>
                        </div>

                        <div>
                            <h1>Created by : {problem.contributedBy}</h1>
                            <h1>Last Solved by : {problem.lastSubmittedBy}</h1>
                            <h1> Total Submissions: {problem.totalSubmissions}</h1>
                        </div>
                </div>
                </div>
                <CodeEditor />
                
            </div>
        </div>
        
    )
}