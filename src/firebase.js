
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyBEbmIGvWoOo_ftAP_S2ZIDwca9dgDwi1U",
  authDomain: "netflix-clone-276fe.firebaseapp.com",
  projectId: "netflix-clone-276fe",
  storageBucket: "netflix-clone-276fe.firebasestorage.app",
  messagingSenderId: "377692229943",
  appId: "1:377692229943:web:9c72c112e38c8524560ab2",
  measurementId: "G-JB72FWVXTB"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const db=getFirestore(app);



const signUp=async (name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email,
        });

    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))

    }

}

const login= async (email,password)=>{
    try{
         await signInWithEmailAndPassword(auth,email,password);

    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const logout=()=>{
    signOut(auth);
}
export {auth,db,login,signUp,logout};