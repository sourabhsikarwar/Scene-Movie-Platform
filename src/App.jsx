import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./pages/Home"
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Tv from "./pages/Tv";
import Categories from "./pages/Categories";
import { UserAuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <UserAuthContextProvider>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/favourites"
          element={
            <ProtectedRoute>
              <Favourites/>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
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
          path="/movie/:title/:movieId"
          element={
            <ProtectedRoute>
              <Movie/>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/tv/:title/:tvId"
          element={
            <ProtectedRoute>
              <Tv/>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/category/:content/:title/:id"
          element={
            <ProtectedRoute>
              <Categories/>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/search/:query"
          element={
            // <ProtectedRoute>
              <Search/>
            // </ProtectedRoute>
          }
        />
        {/* <Route
          exact
          path="/category/movie/:title/:id"
          element={
            <ProtectedRoute>
              <Categories/>
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer/>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
