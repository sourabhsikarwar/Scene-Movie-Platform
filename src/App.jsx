import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ResetPasswword from "./components/ResetPasswword";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Categories from "./pages/Categories";
import { UserAuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound404 from "./pages/NotFound404";

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
            path="/PasswordReset"
            element = {
              <>
              <ResetPasswword/>
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
          <Route path="*" element={<NotFound404 />} />
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
