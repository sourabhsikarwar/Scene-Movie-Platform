import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";
import { collection, addDoc, setDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    Dob: "",
    Favourite: [],
  });
  const dbInstance = collection(database, "users");

  function addUserData(userName, userEmail) {
    setUserData({
      ...user,
      name: userName,
      email: userEmail,
      contact: "8989151788",
      Dob: "18/01/2002",
    });
    addDoc(dbInstance, userData)
      .then(() => {
        alert("Data Sent Successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
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
    const unsubScribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
