import { NavLink } from 'react-router-dom';

const Navbar =  ()=>{
  return(
    <>
      <div className="p-4 flex flex-col  justify-center items-center  bg-slate-900 text-yellow-100 text-xl border-solid border-2 rounded-[60px] border-white ">
         <h1 className="text-3xl font-bold list-type-none text-[50px] mt-5 ">Daily Code</h1>
         <div className='bg-white text-black border rounded-lg p-4 flex flex-row gap-20 text-xl mt-10 '>
          <NavLink to={'/'}>Explore</NavLink>   
          <NavLink to={'/ProblemList'}>Problems</NavLink>
          <NavLink to={'/AddProblem'}>Add Problem</NavLink>
          <NavLink to={'/discuss'}>Discuss</NavLink>
         </div>
      </div>
    </>
  )
}

export default Navbar