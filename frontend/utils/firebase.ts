
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9YsaGdUg2kqTF1AWjZdJny4azZU97Fig",
  authDomain: "leetcode-clone-9f324.firebaseapp.com",
  databaseURL: "https://leetcode-clone-9f324-default-rtdb.firebaseio.com",
  projectId: "leetcode-clone-9f324",
  storageBucket: "leetcode-clone-9f324.appspot.com",
  messagingSenderId: "811474371546",
  appId: "1:811474371546:web:28d35b303db9aa3a11b6e3",
  measurementId: "G-T1QX80SBWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app ;