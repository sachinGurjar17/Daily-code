import { getDatabase, ref , set} from "firebase/database"
import { useState } from "react";

export const AddProblem = ()=>{

    interface FormValues {
        difficulty: string ,
        title : string ,
        description : string ,
        problemID : number
    }
      

    const [formValues , setFormValues] = useState<FormValues>({
        problemID : 0 ,
        title : '',
        description: '',
        difficulty: ''
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

        async function writeUserData(problemID : number , name :string , problemInfo:string , difficulty : string){
            const reference = ref(db ,'problems/'+problemID);
            set(reference,{
                problemID :problemID,
                title : name,
                description : problemInfo,
                difficulty : difficulty 
            });
        } 

        await writeUserData(formValues.problemID, formValues.title , formValues.description , formValues.difficulty);

        const problemListRef = ref(db,'problems/');

        console.log(problemListRef)
        // Add your form submission logic here
      };
    

    
    return (
        <div className="bg-slate-900 p-6">
            <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-red-900">Submit LeetCode Problem</h2>
                <form 
                onSubmit={handleSubmit}
                action="/submit" method="POST">
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Problem Id</label>
                        <input
                        type="text" 
                        id="problemID" 
                        name="problemID" 
                        className="form-input w-full text-black"
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
                        type="text" id="title" className="form-input w-full text-black"/>
                    </div>
                    
                    <div className="mb-4">
                        <label  className="block text-gray-700 font-bold mb-2">Problem Description:</label>
                        <textarea
                        rows={10}
                        value={formValues.description}
                        onChange={handleChange}
                        name="description"
                        id="description"  className="form-textarea w-full text-black" ></textarea>
                    </div>
                    
                    <div className="mb-4">
                        <label  className="block text-gray-700 font-bold mb-2">Difficulty Level:</label>
                        <select 
                        name="difficulty"
                        value={formValues.difficulty}
                        onChange={handleChange}
                        id="difficulty"  className="form-select w-full text-black">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
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