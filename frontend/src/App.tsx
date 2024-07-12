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
import { Admin } from './components/Admin';
import { Leaderboard } from './components/LeaderBoard';
import { getDatabase, set , ref , get } from 'firebase/database';

function App() {
  const [user, setUser] = useRecoilState(userAtom);
  

const fetchUserData = async (email: string) => {
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
      username: email.substring(0, 7),
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
    if (authUser && authUser.email) {
      fetchUserData(authUser.email);
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
          <Route path='/admin' element={<Admin />} />
          <Route path='/leaderboard' element={<Leaderboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
