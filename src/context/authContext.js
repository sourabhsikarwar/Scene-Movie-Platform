import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  // const userId = user.uid;
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    contact:"",
    Dob:"",
    Favourites:[]
  })
  const dbInstance = collection(database, "users");

  function addUserData(userName, userEmail){
    setUserData({name:userName, email:userEmail})
    // console.log(userData)
    addDoc(dbInstance, userData)
      .then(() => {
        alert("Data Sent Successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function signUp(email, password) {
     return createUserWithEmailAndPassword(auth, email, password)
  }
  function login(email, password) {
    // localStorage.setItem("userId", userId);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    // localStorage.removeItem("userId");
    return signOut(auth);
  }
  function googleSignIn(){
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function passwordReset(email){
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubScribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    return () => {
        unsubScribe();
    }
  }, [])

  return (
    <userAuthContext.Provider value={{user, signUp, login, logout, googleSignIn, passwordReset, addUserData, userData}}> {children} </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
