import { getDatabase, ref , set} from "firebase/database"
import { useState } from "react";

export const AddProblem = ()=>{

    interface FormValues {
        difficulty: string ,
        title : string ,
        description : string ,
        problemID : number,
        input : string ,
        output : string ,
        initialCode : string
    }
      

    const [formValues , setFormValues] = useState<FormValues>({
        problemID : 0 ,
        title : '',
        description: '',
        difficulty: '',
        input : '',
        output : '' ,
        initialCode : ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formValues);

        alert("Your Problem is Submiited")

        const db = getDatabase();

        async function writeUserData(problemID : number , name :string , problemInfo:string , difficulty : string , input :  string  , output : string , initialCode : string){
            const reference = ref(db ,'problems/'+problemID);
            set(reference,{
                problemID :problemID,
                title : name,
                description : problemInfo,
                difficulty : difficulty ,
                input : input ,
                output : output , 
                initialCode : initialCode
            });
        } 

        await writeUserData(formValues.problemID, formValues.title , formValues.description , formValues.difficulty , formValues.input , formValues.output , formValues.initialCode);

        const problemListRef = ref(db,'problems/');

        console.log(problemListRef)
        // Add your form submission logic here
      };
    
    return (
        <div className="bg-slate-900 p-6">
            <div className=" w-7/12 mx-auto bg-orange-200 rounded p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-red-900">Add New CodeFlix Problem</h2>
                <form 
                onSubmit={handleSubmit}
                action="/submit" method="POST">
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2 p-2 ">Problem Id</label>
                        <input
                        type="text" 
                        id="problemID" 
                        name="problemID" 
                        className="border-black form-input w-full text-black p-2 "
                        value={formValues.problemID}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Problem Title:</label>
                        <input
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        type="text" id="title" className="border-black form-input w-full text-black p-2"/>
                    </div>
                    
                    <div className="mb-4">
                        <label  className="block text-gray-700 font-bold mb-2">Problem Description:</label>
                        <textarea
                        rows={10}
                        value={formValues.description}
                        onChange={handleChange}
                        name="description"
                        id="description"  className="border-black form-textarea w-full text-black p-2 " ></textarea>
                    </div>

                    <div className="mb-4">
                        <label  className="block text-gray-700 font-bold mb-2">Initital Code</label>
                        <textarea
                        rows={10}
                        value={formValues.initialCode}
                        onChange={handleChange}
                        name="initialCode"
                        id="initialCode"  className="border-black form-textarea w-full text-black p-2 " ></textarea>
                    </div>
                    
                    <div className="mb-4">
                        <label  className="block text-gray-700 font-bold mb-2">Difficulty Level:</label>
                        <select 
                        name="difficulty"
                        value={formValues.difficulty}
                        onChange={handleChange}
                        id="difficulty"  className=" border-black form-select w-full text-black">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                   
                    

                    <div>
                        <h3 className="block text-gray-700 font-bold mb-2 ">add test Cases </h3>
                        <div className="my-3 p-2 flex flex-col  gap-3 ">
                            Input- <input
                            id="input"
                            name= "input"
                            value={formValues.input}
                            onChange={handleChange}
                            type="text" className="block text-gray-700 font-bold mb-2 p-2" />
                            Output- <input
                            id="output"
                            name="output"
                            value={formValues.output}
                            type="text"
                            className="block text-gray-700 font-bold mb-2 p-2"
                            onChange={handleChange}/>
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
