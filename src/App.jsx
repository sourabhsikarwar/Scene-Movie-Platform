import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Categories from "./pages/Categories";
import { UserAuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound404 from "./pages/NotFound404";
import Favourite from "./components/Favourite";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <ToastContainer/>
        <Navbar />
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
            path="/movie/:title/:movieId"
            element={
              <ProtectedRoute>
                <Movie />
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
        <Footer />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
