import { Signin } from './components/Signin';
import { useRecoilState } from 'recoil';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { userAtom } from './stores/atoms/user';
import { AddProblem } from './components/AddProblem';
import Navbar from './components/Navbar';
import { Landing } from './components/Landing';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ProblemList } from './components/ProblemList';
import { Problem } from './components/Problem';
import { ContributeProblem } from './components/ContributeProblem';
import { Leaderboard } from './components/LeaderBoard';
import { getDatabase, set , ref , get } from 'firebase/database';
import { Submissions } from './components/Submissions';
import DashBoard from './components/DashBoard';

function App() {
  const [user, setUser] = useRecoilState(userAtom);
  

const fetchUserData = async (email: string , name:string) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${email.replace('.', '_')}`); 
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    setUser({
      isLoading: false,
      user: userData,
    });
  } else {
    const newUser = {
      email,
      username: name,
      userId: 100,
      isAdmin: false,
      points: 0,
      totalSolvedQuestion: 0,
      easyQuestions: 0,
      mediumQuestions: 0,
      hardQuestions: 0,
      lastSubmission: 0,
      solvedQuestions: []
    };
    set(ref(db, `users/${email.replace('.', '_')}`), newUser);
    setUser({
      isLoading: false,
      user: newUser,
    });
  }
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (authUser: FirebaseUser | null) => {
    if (authUser && authUser.email && authUser.displayName) {
      fetchUserData(authUser.email , authUser.displayName);
      console.log("User logged in:", authUser.email);
    } else {
      setUser({
        isLoading: false,
      });
      console.log('Not logged in');
    }
  });

  return () => unsubscribe();
}, [setUser]);

  if(user.isLoading){
    return (
      <div className='bg-slate-900 text-white text-center w-full h-screen flex justify-center items-center '><div className='text-[30px] text-white'>isLoading ....</div></div>
    )
  }

  if (!user.user) {
    return <Signin />;
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/addProblem' element={<AddProblem />} />
          <Route path='/problemList' element={<ProblemList />} />
          <Route path='/problem/:id' element={<Problem />} />
          <Route path='/contributeProblem' element={<ContributeProblem />} />
          <Route path='/leaderboard' element={<Leaderboard/>}/>
          <Route path='/submissions' element={<Submissions/>}/>
          <Route path='/:username/'  element={<DashBoard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
