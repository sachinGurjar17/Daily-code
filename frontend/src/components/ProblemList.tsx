import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavLink } from 'react-router-dom';



interface Problem {
  difficulty : string ,
  title : string ,
  description : string ,
  problemID : number
}

const ProblemBox: React.FC<{ problem: Problem }> = ({ problem }) => {

   
  return (
    <NavLink to={"/solveProblem"} className={"flex gap-16   bg-white rounded shadow p-4 mb-4"}>
      <h3 className='font-bold'>{problem.problemID+""}</h3>
      <h3 >{problem.difficulty}</h3>
      <h3 className="text-lg font-semibold text-gray-800">{problem.title}</h3>
      <div className='text-2xl '></div>
    </NavLink>
  );
};

export const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  

  useEffect(() => {
    const fetchData =  async () => {
      try {
        const db = getDatabase();
        
        const problemListRef =  ref(db, 'problems/');
        onValue(problemListRef, (snapshot) => {
          const data = snapshot.val();
          const problemArray: Problem[] = data ? Object.values(data) : [];
          setProblems(problemArray);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-900 flex justify-between flex-col items-center   container mx-auto px-4 py-8">
      <h2 className="text-2xl text-white font-bold mb-4">LeetCode Problems</h2>
      <div className="flex flex-col  w-4/6 ">
        {problems.map((problem) => (
          <ProblemBox key={problem.title} problem={problem} />
        ))}
      </div>
    </div>
  );
};

