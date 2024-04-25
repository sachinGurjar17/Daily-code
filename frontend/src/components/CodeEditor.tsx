import React, { useState } from 'react';
import axios from 'axios';

interface CodeEditorProps {
  initialCode: string, 
  output :string 
}

const CodeEditor : React.FC<CodeEditorProps> = (props)=> {

  const [codeOutput , setCodeOutput] =  useState("");

  const [updatedCode, setUpdatedCode] = useState(props.initialCode+"");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    setUpdatedCode(e.target.value);
  }

  const handleSubmit = async()=>{
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'false',

      },
    
      headers: {
        "Content-Type": "application/json",
        'X-RapidAPI-Key': 'c90e0b52fbmsh222fbc8893bd115p14583djsne78c14180b7a',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data:{
        "source_code": updatedCode ,
        "language_id": 52
      },
    };

   
    var token ;

    try {
      const response = await axios.request(options);
      token = response.data.token ;
      console.log(response.data.token);
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
      console.log(response.data);
      setCodeOutput(response.data.stdout);
    } catch (error) {
      console.error(error);
    }
  }


  console.log(codeOutput);

  if(codeOutput === props.output) console.log("sahi hai bhai");
  
  
  

  return (
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
        {props.output === codeOutput  ? (<div className="w-[250px] h-10 bg-green-500 text-white px-4 py-2 rounded ">Accepted</div>)
            :(<div className="w-[250px] h-10 bg-red-600 text-white px-4 py-2 rounded">Wrong Answer</div>)}
      </div>
    </div>
  );
};

export default CodeEditor;
