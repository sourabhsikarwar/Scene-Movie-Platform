import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Trending from "./components/Trending";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Banner />
              <Movies />
              <Trending/>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
