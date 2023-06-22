import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
  updatePassword,
  getAuth,
  updatePhoneNumber,
} from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";
import { collection, addDoc, getDoc } from "firebase/firestore";
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
  }

  async function signUp(email, password) {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if (response) {
      await toast.promise(
        setDoc(doc(database, "users", email), userData), {
          pending: 'Registering user...',
          success: 'Sign up successful',
          error: 'Error while sign up'
        }
      )
    }
  }
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const docRef = doc(database, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Error loading user")
        }
      })
      .catch(() => toast.error("Login failed"));
  }

  async function profileUpdate( displayName, email, password, photoURL) {


    // Update Username and Profile photo
    await updateProfile(auth.currentUser, {
      displayName, photoURL
    })

    // Update email
    await updateEmail(auth.currentUser,email)
    
    // Update password
    await updatePassword(auth.currentUser,password)
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
        profileUpdate,
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
