import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import {toast} from 'react-toastify'

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    Dob: "",
  });
  const [loading, setLoading] = useState(true);
  const dbInstance = collection(database, "users");

async function addUserData(userName, userEmail, phoneNumber, dateOfBirth) {
    setUserData({
      ...user,
      name: userName,
      email: userEmail,
      contact: phoneNumber,
      Dob: dateOfBirth,
    });
    
    await toast.promise(
      addDoc(dbInstance, userData),
      {
        pending: 'Registering user...',
        success: 'Sign up successful',
        error: 'Error while sign up'
      }
    );
  }

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(database, "users", email), {
      savedShows: [],
    });
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  function passwordReset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    setLoading(true);
    const unsubScribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubScribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        signUp,
        login,
        logout,
        passwordReset,
        addUserData,
        userData,
        loading,
      }}
    >
      {" "}
      {children}{" "}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
