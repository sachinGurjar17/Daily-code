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
import { Problem } from './components/Problem';
import { getDatabase , set ,  ref } from 'firebase/database';
import { Admin } from './components/Admin';


function App() {

  const [user , setUser] = useRecoilState(userAtom);

  useEffect(()=>{
        const db = getDatabase();

        async function writeUserData( user : Object | undefined ){
          const reference = ref(db ,'/users');
          set(reference,user);
      } 


       writeUserData(user.user);
  })
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user && user.email){
        setUser({
          isLoading:false,
          user: {
            email : user.email ,
            username : user.email.substring(0,7),
            rank : 100,
            isAdmin : false ,
            totalSolvedQuestion : 0,
            easyQuestions : 0 ,
            mediumQuestions : 0 ,
            hardQuestions : 0,
            lastSubmission : 0 ,
          }
          
        })
        console.log(user.email)
      }else{
        setUser({
          isLoading : false
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
            <Route path='/problem/:id' element={<Problem/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
