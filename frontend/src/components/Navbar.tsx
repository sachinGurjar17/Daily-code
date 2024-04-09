import { NavLink } from 'react-router-dom';
import { userAtom } from '../stores/atoms/user';
import { useRecoilState } from 'recoil';
import GithubIcon from "../assets/gfg.png";

const Navbar =  ()=>{

  const [username] = useRecoilState(userAtom);


  return(
    <div className='bg-slate-900 flex justify-center items-centers  '>
      <div className="p-4 flex flex-col  justify-center items-center  bg-slate-900 text-yellow-100 text-xl  w-7/12">
         <h1 className="text-3xl font-bold list-type-none text-[50px] mt-5 "> CODEFLIX</h1>
         <p className='my-4'>solve problems with code</p>
         <div>
          <button className='bg-orange-400 text-black p-2 text-sm border rounded mx-8 '>start coding now → </button>
          <button className='text-sm text-white '>learn more →</button>
         </div>
         <div className='bg-white text-black border rounded-lg p-4 flex flex-row gap-20 text-xl mt-10 '>
          <NavLink to={'/'}>Explore</NavLink>   
          <NavLink to={'/ProblemList'}>Problems</NavLink>
          <NavLink to={'/AddProblem'}>Add Problem</NavLink>
          <NavLink to={'/discuss'}>Discuss</NavLink>
         </div>
      </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-col  items-center">          
              <img className="h-20 w-20 rounded-full object-cover mr-4" src={GithubIcon} alt={username.username} />
              <div className="h-28 w-28 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <span className="text-gray-600 text-lg font-bold">{username.username}</span>
              </div>
            <h3 className="text-lg font-medium text-gray-900">{username.username}</h3>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar