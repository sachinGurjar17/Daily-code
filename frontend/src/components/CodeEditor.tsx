import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { problemAtom  } from '../stores/atoms/problem';
import { useRecoilState} from 'recoil';
import { useParams } from 'react-router-dom';
import { getDatabase,onValue , ref} from 'firebase/database';


const CodeEditor = ()=> {

  const [problem , setproblem]  = useRecoilState(problemAtom); 

  const [codeOutput , setCodeOutput] =  useState("");

  const {id} = useParams();
  
  const [updatedCode, setUpdatedCode] = useState(problem.initialCode+" ");
  
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
}, [id]);


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    setUpdatedCode(e.target.value);
  }

  const handleSubmit = async()=>{
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
  }


  return (
    <>
    <div className="w-8/12 p-6 bg-gray-100 rounded-lg shadow">
      <textarea
        value={updatedCode}
        onChange={handleChange}
        className="w-full h-96 text-lg font-bold resize-none border border-black rounded-md p-8"
        placeholder="Enter your code here..."
      ></textarea>
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
    </div>

    {codeOutput != "" ?(<div className='bg-blue-200 text-bold w-8/12 flex flex-col gap-10 m-10 p-5 border border-solid rounded-3xl border-red-400 '>
      <div className='flex  gap-5 border-solid border rounded-3xl p-4 border-yellow-500'>
        <h1 className='text-bold text-lg'>Input : </h1>
        {problem.input}
      </div>
      <div className='flex  gap-5 border-solid border rounded-3xl p-4 border-yellow-500'>
        <h1  className='text-bold text-lg'>Your Output : </h1>
        {codeOutput}
      </div>
      <div className='flex  gap-5 border-solid border rounded-3xl p-4 border-yellow-500'>
        <h1  className='text-bold text-lg'>Expected Output :</h1>
        {problem.output}
      </div>
    </div>):(<div className='bg-blue-200 text-bold w-8/12 flex flex-col gap-10 m-10 p-5 border border-solid rounded-3xl border-red-400 '> Loading Outut </div>)}
    </>
  );
};


export default CodeEditor;
