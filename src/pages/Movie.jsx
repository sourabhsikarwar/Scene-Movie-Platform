import React from "react";
import MovieBanner from "../components/Banner/MovieBanner";
import { useParams } from "react-router-dom"
import Similiar from "../components/Carousel/Similiar";

const Movie = () => {
  const { movieId, title } = useParams();
  console.log(movieId);
  return (
    <>
      <MovieBanner id={movieId} title={title}/>
      <Similiar title="movie" id={movieId}/>
    </>
  );
};

export default Movie;
