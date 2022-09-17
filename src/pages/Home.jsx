import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import Trending from "../components/Carousel/Trending";
import TvCarousel from "../components/Carousel/TvCarousel";

const Home = () => {
  const [genreMovie, setGenreMovie] = useState([]);
  const [genreTv, setGenreTv] = useState([]);
  const isMounted = useRef(true);

  const uploadMovie = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=ebf3974135e4e887c96fc16d0e3024b1&language=en-US`
      )
      .then((res) => {
        setGenreMovie(res.data.genres);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const uploadTv = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=ebf3974135e4e887c96fc16d0e3024b1&language=en-US`
      )
      .then((res) => {
        setGenreTv(res.data.genres);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(function () {
    if (isMounted.current) {
      uploadMovie();
      uploadTv();
    }
    return () => {
      isMounted.current = false;
    };
  });

  return (
    <div>
      <Banner />
      <Trending title="Trending" id="1"/>
      <TvCarousel title="Trending" id="1"/>
      {genreMovie &&
        genreMovie.map((item) => {
          return (
            <>
              <Trending title={item.name} id={item.id} key={item.id} />
            </>
          );
        })}
      {genreTv &&
        genreTv.map((item) => {
          return (
            <>
              <TvCarousel title={item.name} id={item.id} key={item.id} />
            </>
          );
        })}
    </div>
  );
};

export default Home;
