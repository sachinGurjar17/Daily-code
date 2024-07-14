import { getDatabase , onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"

interface Submission{
    user:string,
    problemId:number,
    problemTitle : string,
    status:boolean,
    time:string,
    language:string,
    points:number,
    submittedCode:number,
    executionTime:undefined,
    memoryUsage:undefined
}

export const Submissions : React.FC = ()=>{

    const  [submissions , setSubmissions] = useState<Submission[]>([]);

    useEffect(()=>{
        const fetchData= ()=>{
            try{
                const db = getDatabase();
                const submissionRef = ref(db,'submissions/')
                onValue(submissionRef,(snapshot)=>{
                    const data = snapshot.val();
                    const submissionArray : Submission [] = data ? Object.values(data):[];
                    setSubmissions(submissionArray);
                })
            }catch(err){
                console.log("Error fetching data",Error);
            }
        }
        fetchData();
    },[])
    return(
        <>
            <div className="bg-slate-900   ">
               <section className=" bg-slate-900 py-8 md:py-12 min-h-screen">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2 text-gray-500">Latest Submissions</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out the most latest Submissions by the users on codeflix 
                        </p>
                        </div>
                        <div className="p-6 bg-slate-900 min-h-screen">
                        {submissions.length === 0 ? (
                            <p className="text-gray-600 text-lg">No submissions yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                            <table className="min-w-full bg-grey-100 shadow-md rounded-lg">
                                <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left">User</th>
                                    <th className="py-4 px-6 text-left">Problem ID</th>
                                    <th className="py-4 px-6 text-left">Problem Title</th>
                                    <th className="py-4 px-6 text-left">Status</th>
                                    <th className="py-4 px-6 text-left">Time</th>
                                    <th className="py-4 px-6 text-left">Language</th>
                                    <th className="py-4 px-6 text-left">Points</th>
                                    <th className="py-4 px-6 text-left">Execution Time</th>
                                    <th className="py-4 px-6 text-left">Memory Usage</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-400 hover:text-gray-800">
                                {submissions.map((submission, index) => (
                                    <tr key={index} className="border-b border-gray-200 ">
                                    <td className="py-4 px-6">{submission.user}</td>
                                    <td className="py-4 px-6">{submission.problemId}</td>
                                    <td className="py-4 px-6">{submission.problemTitle}</td>
                                    <td className="py-4 px-6 flex items-center">
                                        {submission.status ? (
                                        <span className="text-green-500 flex items-center">
                                            Accepted
                                        </span>
                                        ) : (
                                        <span className="text-red-500 flex items-center">
                                            Failed
                                        </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">{submission.time}</td>
                                    <td className="py-4 px-6">{submission.language}</td>
                                    <td className="py-4 px-6">{submission.points}</td>
                                    <td className="py-4 px-6">{submission.executionTime}</td>
                                    <td className="py-4 px-6">{submission.memoryUsage}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        )}
                        </div>
                    </div>
              </section>
            </div>
        </>
    )
}
