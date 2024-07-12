import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavLink } from 'react-router-dom';



interface Problem {
  difficulty : string ,
  title : string ,
  description : string ,
  problemID : number,
  tags : [],
  contributedBy : string ,
  lastSubmittedBy : string,
  totalSubmissions:number
}

const ProblemBox: React.FC<{ problem: Problem }> = ({ problem }) => {

   
  return (
    <>
      <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow bg-gray-800  text-gray-400 flex flex-col gap-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{problem.problemID+" "}.{problem.title}</h5>
        <p className="mb-3 font-normaltext-gray-400">{problem.description.substring(0,100)}...</p>
        <div className='border rounded-lg p-1 m-1 w-fit text-md font-thin text-white mb-3 block lg:inline'>{problem.difficulty}</div>
        <div className='border rounded-lg p-1 m-1 w-fit text-md font-thin text-white mb-3 block lg:inline'>{problem.tags.join(' | ')}</div>
        <NavLink to={`/problem/${problem.problemID}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View Problem 🠚
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          </svg>
        </NavLink>

        <div className='flex flex-col text-gray-400 '>
            <h1>Created by : {problem.contributedBy}</h1>
            <h1>last solved by : {problem.lastSubmittedBy}</h1>
            <h1> total totalSubmissions: {problem.totalSubmissions}</h1>
        </div>
      </div>
    </>
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
    <div className="bg-slate-900   ">
      <section className=" bg-slate-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-500">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the most popular programming problems on Code100x.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemBox problem={problem} key={problem.problemID} />
          ))}
        </div>
      </div>
    </section>
    </div>
    
  );
};

