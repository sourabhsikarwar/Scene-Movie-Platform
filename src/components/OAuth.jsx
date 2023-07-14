import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react'
import {FcGoogle} from "react-icons/fc"
import { database } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

 function OAuth() {

    const navigate=useNavigate();
    async function onGoogleClick(){     
        try {
            const auth= getAuth();
            const provider=new GoogleAuthProvider();

            const result= await signInWithPopup(auth,provider);
            const user= result.user;
            
            // check if user exists
            const docRef= doc(database,"users",user.uid)
            const docSnap= await getDoc(docRef)

            //If user does not exist, add the user to dataDase
            if(!docSnap.exists()){
                await setDoc(docRef,{
                    name:user.displayName,
                    email:user.email,
                    contact:user.phoneNumber,
                    image:user.photoURL,
                })
            }

 
            //Navigate to home page 
            navigate("/");

        } catch (error) {
            return error;
            
        }
    }
  return (
    <button onClick={onGoogleClick}
    className='flex
     justify-center items-center w-full bg-blue-gradient
     text-black uppercase px-7 py-2 rounded
     '
     >
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        continue with Google
    </button>
  )
}

export default OAuth