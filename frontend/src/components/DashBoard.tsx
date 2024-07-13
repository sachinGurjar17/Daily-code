import { useRecoilValue } from 'recoil';
import { userAtom } from '../stores/atoms/user';

const DashBoard = () => {

  const user = useRecoilValue(userAtom);

  return (
    <div className="min-h-screen bg-slate-600 text-white ">
      <header className="bg-slate-800 p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center text-[70px] bg-white rounded-full text-center h-[100px] w-[100px] text-slate-600">
              <span>{user.user?.username.charAt(0)}</span>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold">{user.user?.username}</h2>
              <p>Points: {user.user?.points}</p>
              <p>Solved Questions: {user.user?.totalSolvedQuestion}</p>
            </div>
           </div>

        </div>
           <div className='flex flex-col items-center justify-center md:grid md:grid-cols-3 gap-4 text-center'>               
                <div className="block max-w-sm p-4 bg-green-400 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Easy Questions</h5>
                    <p className="font-bold text-gray-700">{user.user?.easyQuestions}</p>
                </div>
                <div className="block max-w-sm p-4 bg-yellow-400 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Medium Questions</h5>
                    <p className="font-bold text-gray-700">{user.user?.mediumQuestions}</p>
                </div>
                <div className="block max-w-sm p-4 bg-red-400 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Hard Questions</h5>
                    <p className="font-bold text-gray-700">{user.user?.hardQuestions}</p>
                </div>
            </div>

            <div className="p-6 bg-slate-600 text-white rounded-lg shadow-md">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">Solved Questions</h2>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold">Total Solved Problems</h3>
                    <p className="text-2xl">{user.user?.solvedQuestions.length}</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Solved Problems List</h3>
                    <ul className="list-disc list-inside">
                    {user.user?.solvedQuestions.map((questionId, index) => (
                        <li key={index} className="text-lg">
                        Problem ID: {questionId}
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
          
        </div>
    </div>
  );
};

export default DashBoard;
