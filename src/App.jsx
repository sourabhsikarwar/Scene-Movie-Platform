import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import About from './pages/About';
import TvShows from "./pages/TvShows";
import Movie from "./pages/Movie";
import Categories from "./pages/Categories";
import { UserAuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
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
            path="/about"
            element={
                <About />
            }
          />
          <Route
            exact
            path="/tvshows"
            element={
                <TvShows />
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
          {/* <Route
            exact
            path="/search/:query"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
        <Footer />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
