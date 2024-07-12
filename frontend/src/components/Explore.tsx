import { NavLink } from "react-router-dom";
import Codeflix from "../assets/codeflix.png";
export const Explore = ()=>{
  return (
    <>
      <div className="bg-slate-900 text-white flex flex-row m-24 gap-10      ">
        <div className="flex flex-col gap-10">
          <h1 className="text-white text-[40px] font-extrabold">Welcome to CodeFlix</h1>
          <p className="text-md">Code100x is a platform for holding programming contests. Participate in challenges, solve problems, and climb the leaderboard.</p>
          <div className="flex flex-row gap-6">
            <NavLink to={'/problems'} className="border rounded-md p-2 bg-white text-black" >Solve Problems</NavLink>
            <NavLink to={'/leaderboard'} className="border rounded-md p-2"  >View Leaderboard</NavLink>
          </div>
        </div>
        <img className= " md:h-[340px] md:w-[780px] md:flex hidden shadow-2xl rounded-lg" src={Codeflix} alt="image codeflix" />
      </div>
    </>
  )
}