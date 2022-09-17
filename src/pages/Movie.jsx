import React from "react";
import MovieBanner from "../components/Banner/MovieBanner";
import Trending from "../components/Carousel/Trending";
import { useParams } from "react-router-dom"

const Movie = () => {
  const { movieId, title } = useParams();
  console.log(movieId);
  return (
    <>
      <MovieBanner id={movieId} title={title}/>
      <Trending title={movieId} id={12}/>
      <Trending />
    </>
  );
};

export default Movie;
