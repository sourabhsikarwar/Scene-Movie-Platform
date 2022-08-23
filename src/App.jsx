import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./pages/Home"
import Movie from "./pages/Movie";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
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
        <Route
          exact
          path="/categories"
          element={
            <>
              <Categories />
            </>
          }
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
