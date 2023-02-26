import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import Trending from "../components/Carousel/Trending";
import Search from "../components/Search";

const Home = () => {
  const [genreMovie, setGenreMovie] = useState([]);
  const isMounted = useRef(true);
  const apiKey = process.env.REACT_APP_API_KEY

  const uploadMovie = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        setGenreMovie(res.data.genres);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(function () {
    if (isMounted.current) {
      uploadMovie();
    }
    return () => {
      isMounted.current = false;
    };
  });

  return (
    <div>
      <Banner />
      <Search/>
      <Trending title="Trending" id="1"/>
      {genreMovie &&
        genreMovie.map((item) => {
          return (
            <>
              <Trending title={item.name} id={item.id} key={item.id} />
            </>
          );
        })}
    </div>
  );
};

export default Home;
