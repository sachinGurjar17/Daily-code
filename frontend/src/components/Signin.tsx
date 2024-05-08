import { signInWithPopup } from "firebase/auth";
import {auth} from "../../utils/firebase"
import { GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from "../assets/google icon.png";

const provider = new GoogleAuthProvider();

export const Signin = () => {

    async function onSignin() {
        signInWithPopup(auth, provider)
            .then((result) => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (!credential) {
                    return;
                }
                const user = result.user;
                console.log(user);
            }).catch(() => {
                alert("erorr while signing in");
            });
    }

    return (
        <div className="flex flex-col sm:flex-row bg-black">

            <div className="w-full h-2/3 md:w-2/5 bg-black flex justify-center items-center sm:h-screen s">
                <div>
                    <h1 className="text-4xl font-bold mb-4 text-white">Code-flix</h1>
                </div>
            </div>
            <div className="w-full h-screen md:w-3/5 bg-gray-900 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="p-5">
                        <h2 className="text-2xl font-semibold mb-2 text-white text-center">Log In</h2>

                    </div>
                    <div className=' mb-4  justify-center py-1 sm:px-6 lg:px-8 '>
                        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                            <div className='bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10'>
                                <div className='flex flex-col items-center justify-center gap-4'>
                                    <p className='font-normal text-2xl text-gray-900'>Welcome</p>

                                    <p className='font-light text-sm text-gray-600'>
                                        Log in to continue to CodeFlix
                                    </p>
                                    <button
                                        type='submit'
                                        className='w-full flex justify-center items-center gap-2 py-3 px-4 border rounded font-light text-md hover:bg-gray-200 focus:outline-none focus:ring-2 '
                                        onClick={() => onSignin()}
                                    >
                                        <img src={GoogleIcon} className='w-10 h-10 mr-2 border rounded-lg' />
                                        Continue with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}