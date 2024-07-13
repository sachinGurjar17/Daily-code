import { NavLink } from "react-router-dom";
import Codeflix from "../assets/codeflix.png";
export const Explore = ()=>{
  return (
    <>
      <div className="bg-slate-900 text-white flex flex-row m-24 gap-10      ">
        <div className="flex flex-col gap-10">
          <h1 className="text-white text-[40px] font-extrabold">Welcome to CodeFlix</h1>
          <p className="text-md text-wrap">CodeFlix is a platform for solving data structure problems . Solve problems, Contribute problem  and climb the leaderboard.</p>
          <div className="flex flex-row gap-6">
            <NavLink to={'/problems'} className="border rounded-md p-2 bg-white text-black" >Solve Problems</NavLink>
            <NavLink to={'/leaderboard'} className="border rounded-md p-2"  >View Leaderboard</NavLink>
          </div>
        </div>
        <div className="hidden md:block">
            <img
              src={Codeflix}
              width="600"
              height="400"
              alt="Codeflix"
              className="rounded-lg"
            />
          </div>
      </div>
    </>
  )
}