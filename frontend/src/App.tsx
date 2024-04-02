import { Signin } from './components/Signin';
import {useRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';import { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { userAtom } from './stores/atoms/user';
import { AddProblem } from './components/AddProblem';
import Navbar from './components/Navbar'
import { Landing } from './components/Landing';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ProblemList } from './components/ProblemList';


function App() {

  const [user , setUser] = useRecoilState(userAtom);
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user && user.email){
        setUser({
          isLoading:false,
          user: {
            email : user.email 
          }
        })
        console.log(user.email)
      }else{
        setUser({
          isLoading: false ,
        })
        console.log('not logged in')
      }
    })
  },[])

  if(user.isLoading){
    return <div>
      isLoading ....
    </div>
  }
   
  if(!user.user){
    return <Signin/>
  }

  return(
    <div >
      <BrowserRouter>
          <Navbar/>
          <Routes >
            <Route path='/' element={<Landing/>}/>
            <Route path='/addProblem' element={<AddProblem/>}/>
            <Route path='/problemList' element={<ProblemList/>}/>
            <Route path='/discuss' element={<AddProblem/>}/>
            </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
