
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDdqZLAOOcap6H_0DNd2i5XBjy_p3MgRdw",
  authDomain: "doctor-appointment-record.firebaseapp.com",
  projectId: "doctor-appointment-record",
  storageBucket: "doctor-appointment-record.firebasestorage.app",
  messagingSenderId: "186568009428",
  appId: "1:186568009428:web:64652648ce57faae0afd41"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export {  googleProvider };
