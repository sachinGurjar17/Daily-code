import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../stores/atoms/user";

export const AddProblem = () => {

  const user = useRecoilValue(userAtom); 
  
  interface FormValues {
    difficulty: string;
    title: string;
    description: string;
    problemID: number;
    input: string;
    output: string;
    initialCode: string;
    tags:string[],
    contributedBy : string ,
    lastSubmittedBy : string,
    totalSubmissions:number
  }

  const tags : string[]= ["Array","String","LinkedList","BinarySearch","Sorting","Tree","Graph","Math","Algorithm","Dynamic Programming"]

  const [formValues, setFormValues] = useState<FormValues>({
    problemID: 0,
    title: "",
    description: "",
    difficulty: "",
    input: "",
    output: "",
    initialCode: "",
    tags:[],
    contributedBy:"",
    lastSubmittedBy:"",
    totalSubmissions:0
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditorChange = (value: string | undefined) => {
    setFormValues((prevState) => ({
      ...prevState,
      initialCode: value || "", // If the value is undefined, set it to an empty string
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    const db = getDatabase();

    async function writeProblemData(
      problemID: number,
      name: string,
      problemInfo: string,
      difficulty: string,
      input: string,
      output: string,
      initialCode: string,
      tags : string[]
    ) {
      const reference = ref(db, "problems/" + problemID);
      set(reference, {
        problemID: problemID,
        title: name,
        description: problemInfo,
        difficulty: difficulty,
        input: input,
        output: output,
        initialCode: initialCode,
        tags:tags,
        contributedBy : user.user?.username ,
        lastSubmittedBy : "",
        totalSubmissions:0,
      });
    }

    alert("Your Problem is Submitted");
    

    await writeProblemData(
      formValues.problemID,
      formValues.title,
      formValues.description,
      formValues.difficulty,
      formValues.input,
      formValues.output,
      formValues.initialCode,
      formValues.tags,
    );

  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-3xl bg-slate-200 rounded-lg shadow-lg p-8  mx-2 md:mx-20 lg:mx-40 mt-4 ">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New CodeFlix Problem</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Problem Id</label>
            <input
              type="number"
              id="problemID"
              name="problemID"
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:border-indigo-500"
              value={formValues.problemID}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Problem Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:border-indigo-500"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Problem Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:border-indigo-500"
              value={formValues.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Initial Code</label>
            <Editor
                height="50vh"
                defaultLanguage="cpp"
                value={formValues.initialCode}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    fontSize: 15  ,
                    scrollBeyondLastLine: true,
                }}
                language='cpp'
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Difficulty Level</label>
            <select
              id="difficulty"
              name="difficulty"
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:border-indigo-500"
              value={formValues.difficulty}
              onChange={handleChange}
              required
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <div className="border flex flex-row flex-wrap gap-2  border-gray-300 rounded-lg w-full p-3 bg-white mb-2 ">
            <h1>selected options :</h1>
                {
                  formValues.tags.map((tag)=>(
                    <div className="text-white border rounded-md p-1 bg-slate-400 text-sm font-thin   border-blue-300">{tag+" "}</div>
                  ))
                }
                <select 
                  name="tags"
                  id="tags"
                  className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  value={formValues.tags.map.toString()}
                  multiple
                  size={3}
                  onChange={(e)=>{
                    if (!formValues.tags.includes(e.target.value)) {
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        tags: [...prevValues.tags, e.target.value],
                      }));          
                    }else{
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        tags: prevValues.tags.filter((tag)=> tag !== e.target.value),
                      }));
                    }
                }}
                  
                > sacjom
                    {tags.map((tag) => (
                      <option 
                        className="border border-blue-300 p-2 m-2 rounded-md w-full "
                        key={tag.toString()}
                        value={tag}>
                        {formValues.tags.includes(tag) ? <div>{tag+"  ✅" }</div>: <div>{tag}</div>}
                    </option>
                    ))}
                </select>
            </div>
          </div>
          <div>
            <h3 className="block text-gray-700 font-bold mb-2">Test Cases</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Input</label>
                <input
                  type="text"
                  id="input"
                  name="input"
                  className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  value={formValues.input}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Output</label>
                <input
                  type="text"
                  id="output"
                  name="output"
                  className="border border-gray-300 rounded-lg w-full p-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  value={formValues.output}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
