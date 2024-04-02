import { Explore } from "./Explore"
import { ProblemList } from "./ProblemList"
export const Landing = ()=>{
    return <div className="bg-slate-900">
       <div className=" flex flex-col items-center  gap-10 ">
            <Explore/>
            <ProblemList/>
       </div>
    </div>
}