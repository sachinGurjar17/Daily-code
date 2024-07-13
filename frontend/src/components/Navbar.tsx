import { NavLink } from 'react-router-dom';
import { userAtom } from '../stores/atoms/user';
import { useRecoilState, useRecoilValue } from 'recoil';

const Navbar =  ()=>{

  const [username] = useRecoilState(userAtom);

  return(
    <div className='bg-slate-900 flex flex-row justify-between items-center px-2 w-full  '>
      <div className="p-4 flex flex-row justify-center  items-center gap-44 text-yellow-100 text-xl">
         <NavLink to={'/'} className="text-2xl   font-bold list-type-none  ">#️⃣ CODEFLIX</NavLink>
         <div className='hidden md:flex items-center gap-6'>
          <NavLink to={'/'} className="text-white text-md">Home</NavLink>
          <NavLink to={'/problemList'} className=" text-white text-md   ">Problems </NavLink >
          <NavLink to={'/submissions'} className='text-md text-white '>Submissions</NavLink >
          <NavLink to={'/contributeProblem'} className=" text-md  text-white  ">Contribute</NavLink >
         </div>        
      </div>
      
      <NavLink to={`/${username.user?.username}`} className='flex  justify-center items-center border rounded-lg p-1 gap-2'>          
        <h3 className="text-center text-[20px] h-8 w-8 bg-white rounded-full  font-bold text-grey-300">{username?.user?.username.charAt(0)}</h3>
        <h5 className='text-white'>{username?.user?.username}</h5>
      </NavLink >
    </div>
  )
}

export default Navbar