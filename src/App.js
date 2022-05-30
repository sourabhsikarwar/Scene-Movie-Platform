import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Trending from "./components/Trending";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./pages/Home"
import Movie from "./pages/Movie";

function App() {
  // const apiKey = process.env.REACT_APP_IMDB;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              {/* <Banner />
              <Movies />
              <Trending/> */}
              <Home/>
            </>
          }
        />
        <Route
          exact
          path="/favourites"
          element={
            <>
              <Favourites />
            </>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <>
              <Profile />
            </>
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
          path="/movie"
          element={
            <>
              <Movie />
            </>
          }
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
