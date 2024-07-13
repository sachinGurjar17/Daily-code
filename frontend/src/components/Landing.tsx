import { Explore } from "./Explore"
import { ProblemList } from "./ProblemList"
import { Submissions } from "./Submissions"
export const Landing = ()=>{
    return <div className="">
       <div className="bg-slate-900 flex flex-col gap-6">
            <Explore/>
            <ProblemList/>
            <Submissions/>
       </div>
    </div>
}