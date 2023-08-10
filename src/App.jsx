import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { UserAuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {lazy,Suspense, useEffect, useState} from 'react';
import { Oval } from 'react-loader-spinner';
import ScrollToTop from "./components/ScrollToTop";
import alanBtn from "@alan-ai/alan-sdk-web";

const About=lazy(()=>import('./pages/About'));
const Login=lazy(()=>import('./components/Login'));
const Signup=lazy(()=>import('./components/Signup'));
const Profile=lazy(()=>import('./components/Profile'));
const Home=lazy(()=>import('./pages/Home'));
const Movie=lazy(()=>import('./pages/Movie'));
const Tv=lazy(()=>import('./pages/Tv'));
const Episode=lazy(()=>import('./pages/Episode'));
const Categories=lazy(()=>import('./pages/Categories'));
const NotFound404=lazy(()=>import('./pages/NotFound404'));
const Favourite=lazy(()=>import('./components/Favourite'));
const Favourites=lazy(()=>import('./components/Favourites'));
const Reset=lazy(()=>import('./components/Reset'));

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(()=>{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark');
    }
    else{
      setTheme('light');
    }
  },[])

  // add/remove dark/light class from document body
  useEffect(() => {
    if(theme==="dark"){
      document.querySelector("body").classList.remove("dark");
    }
    else{
      document.querySelector("body").classList.add("dark");
    }
  }, [theme])

  useEffect(() => {
    alanBtn({
      key: "9affcb79b8366d688d4e7723b6da68792e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData && commandData.command === 'openURL') {
          if (commandData.target === '_blank') {
              window.open(commandData.url, '_newtab' + Math.floor(Math.random() * 999999));
          } else {
              window.location.href = commandData.url;
          }
      }
      }
    });
  }, []);
  
  // toggle dark and light modes
  const handleThemeSwitch=()=>{
    setTheme(theme==="dark"?"light":"dark");
  }; 
  return (
    <BrowserRouter>
    <Suspense fallback={<div className='flex justify-center items-center h-screen my-8'>
          <Oval
            height='50'
            width='50'
            color='grey'
            secondaryColor='grey'
            ariaLabel='loading'
          />
        </div>}>
      <UserAuthContextProvider>
        <ToastContainer/>
        <Navbar handleThemeSwitch={handleThemeSwitch}/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/favourites"
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            exact
            path="/passwordReset"
            element={
              <>
                <Reset />
              </>
            }
          />
          <Route
            exact
            path="/movie/:title/:movieId"
            element={
              <ProtectedRoute>
                <Movie />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/tv/:title/:tvId"
            element={
              <ProtectedRoute>
                <Tv />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/tv/:tid/:sid/:eid/:name"
            element={
              <ProtectedRoute>
                <Episode />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/category/:content/:title/:id"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/tv/:tid/:sid/:eid/:name"
            element={
              <ProtectedRoute>
                <Episode />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/favourite"
            element={
              <ProtectedRoute>
                <Favourite />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<NotFound404 />}
          />
        </Routes>
        <ScrollToTop/>
        <Footer />
      </UserAuthContextProvider>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
