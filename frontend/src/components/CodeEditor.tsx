import  { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { problemAtom  } from '../stores/atoms/problem';
import { useRecoilState} from 'recoil';
import { useParams } from 'react-router-dom';
import { getDatabase,onValue , ref , update} from 'firebase/database';
import { Editor } from '@monaco-editor/react';
import { userAtom } from '../stores/atoms/user';
import { updateUserData } from '../../utils/firebaseFunction';


const CodeEditor = ()=> {

  const [problem , setproblem]  = useRecoilState(problemAtom); 

  const [codeOutput , setCodeOutput] =  useState("");

  const {id} = useParams();
  
  const [updatedCode, setUpdatedCode] = useState(problem.initialCode+" ");

  const [user,setUser] = useRecoilState(userAtom);

  const [loader , setLoader] = useState(false);
  
  
useEffect(() => {
    const fetchData = async () => {
        const db = getDatabase();
        const problemListRef = ref(db, `/problems/${id}`);
        onValue(problemListRef, (snapshot) => {           
            const data = snapshot.val();                  
            setproblem(data);  
            setUpdatedCode(() => data.initialCode);
        });
    };
    fetchData();
}, [id,setproblem]);


useEffect(() => {
  const updateUserDataIndb = async()=>{
    
    if (codeOutput == problem.output && user.user && !user.user.solvedQuestions.includes(problem.problemID)) {
      console.log("update user in db");
      
      let pointsToAdd = 0;
      let updatedEasyQuestions = user.user.easyQuestions;
      let updatedMediumQuestions = user.user.mediumQuestions;
      let updatedHardQuestions = user.user.hardQuestions;
  
      switch (problem.difficulty) {
        case 'Easy':
          pointsToAdd = 30;
          updatedEasyQuestions += 1;
          break;
        case 'Medium':
          pointsToAdd = 60;
          updatedMediumQuestions += 1;
          break;
        case 'Hard':
          pointsToAdd = 100;
          updatedHardQuestions += 1;
          break;
        default:
          break;
      }
      
      setUser({
        isLoading: false,
        user: {
          ...user.user,
          points: user.user.points + pointsToAdd,
          totalSolvedQuestion : user.user.totalSolvedQuestion+1 ,
          easyQuestions: updatedEasyQuestions,
          mediumQuestions: updatedMediumQuestions,
          hardQuestions: updatedHardQuestions,
          lastSubmission: problem.problemID,
          solvedQuestions:[...user.user.solvedQuestions,problem.problemID]
        },
      });
  
      await updateUserData(user.user);
      
    }
  }
  updateUserDataIndb();
  
  const updateProblemDataIndb = async()=>{
    
    if(codeOutput === problem.output){
      const updateProblemData = async()=>{

        const db = getDatabase();
        console.log(problem);
        console.log(problem.problemID);
        
        
        const problemRef = ref(db,`problems/${problem.problemID}`);
        await update(problemRef,{
          lastSubmittedBy : user.user?.username,
          totalSubmissions:problem.totalSubmissions+1,
        })
      }
      updateProblemData();
    }
  }
  updateProblemDataIndb();
}, [codeOutput]);



const handleSubmit = async()=>{

   setLoader(true) ;
   setCodeOutput("");

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'false',
      field:'*',
      wait : "true"
    },
  
    headers: {
      "Content-Type": "application/json",
      'X-RapidAPI-Key': 'c90e0b52fbmsh222fbc8893bd115p14583djsne78c14180b7a',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data:{
      "source_code": updatedCode,
      "language_id": 52
    },
  };

   
  let token ;

  try {
    const response = await axios.request(options);
    token = response.data.token ;
  } catch (error) {
    console.error(error);
  }

  const baseUrl = "https://judge0-ce.p.rapidapi.com/submissions/";
  const queryParams = `${encodeURIComponent(token)}`;
  
  const url = baseUrl + queryParams;
  

  const st = {
    method: 'GET',
    url: url,
    params: {
      base64_encoded: 'false',
    },
  
    headers: {
      'X-RapidAPI-Key': 'c90e0b52fbmsh222fbc8893bd115p14583djsne78c14180b7a',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    
  };
  
  try {
    const response = await axios.request(st);
    setCodeOutput(response.data.stdout);
  } catch (error) {
    console.error(error);
  }
  setLoader(false);
}

if(loader){
  return (
    <div className='text-white texl-lg '>
      Compiling ....
    </div>
  )
}


return (

    <div className="m-4 p-6 bg-slate-600 rounded-lg shadow md:ml-5 mt-3 w-full md:w-[50vw] ">🟢🔴🟡
    <Editor
      height="70vh"
      defaultLanguage="cpp"
      value={updatedCode}
      onChange={(value)=>{
        setUpdatedCode(value+"");
      }}
      theme="vs-dark"
      options={{
        fontSize: 15  ,
        scrollBeyondLastLine: true,
      }}
      language='cpp'
    />
    <div className="flex justify-end mt-2">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Run Code
      </button>
      <br />
      {problem.output === codeOutput  ? (<div className="w-[250px] h-10 bg-green-500 text-white px-4 py-2 rounded ">Accepted</div>)
          :(<div className="w-[250px] h-10 bg-red-600 text-white px-4 py-2 rounded">Wrong Answer</div>)}
    </div>
      <div>
      {codeOutput != "" ?(<div className='bg-blue-200 text-bold  flex flex-col gap-2 m-2 p-2 border border-solid rounded-3xl border-red-400 '>
      <div className='flex border-solid border rounded-3xl p-1'>
        <h1 className='text-bold text-md'>Input : </h1>
        {problem.input}
      </div>
      <div className='flex border-solid border rounded-3xl p-1'>
        <h1  className='text-bold text-md'>Your Output : </h1>
        {codeOutput}
      </div>
      <div className='flex border-solid border rounded-3xl p-1'>
        <h1  className='text-bold text-md'>Expected Output :</h1>
        {problem.output}
      </div>
    </div>):(<div className='bg-blue-200 text-bold m-10 p-5 border border-solid rounded-3xl border-red-400 '> Loading Outut </div>)}
      </div>
  </div>

);
};


export default CodeEditor;
