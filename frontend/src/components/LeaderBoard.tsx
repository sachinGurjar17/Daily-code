import React, { useEffect, useState } from 'react';
import { onValue,getDatabase, ref } from 'firebase/database';
interface User {
    email:string,
    username : string ,
    rank : number ,
    isAdmin : boolean ,
    points : number,
    totalSolvedQuestion : number,
    easyQuestions : number ,
    mediumQuestions : number ,
    hardQuestions : number,
    lastSubmission : number ,
}

export const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList: User[] = Object.values(data);
        userList.sort((a, b) => b.points - a.points); 
        setUsers(userList);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white text-center text-2xl font-semibold">
          Leaderboard
        </div>
        <table className=" container min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Points
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Total Solved Questions
              </th>
            </tr>
          </thead>
          <tbody >
            {users.map((user, index) => (
              <tr key={user.email} className="hover:bg-gray-100">
                <td className="px-5 py-5 border-b border-gray-300 text-lg">
                  {index + 1}.
                </td>
                <td className="px-5 py-5 border-b border-gray-300 text-lg">
                  {user.username}
                </td>
                <td className="px-5 py-5 border-b border-gray-300 text-lg">
                  {user.points}
                </td>
                <td className="px-5 py-5 border-b border-gray-300 text-lg">
                  {user.easyQuestions+user.hardQuestions+user.mediumQuestions}
                   <ol>
                    <li className='text-sm text-green-400 font-semibold'>easy{" "+user.easyQuestions}</li>
                    <li className='text-sm font-semibold text-yellow-400'>medium{" " +user.mediumQuestions}</li>
                    <li className='text-sm font-semibold text-red-600'>hard{" "+user.hardQuestions}</li>
                   </ol>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
