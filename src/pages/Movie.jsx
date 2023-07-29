import React from "react";
import MovieBanner from "../components/Banner/MovieBanner";
import { useParams } from "react-router-dom"
import Similiar from "../components/Carousel/Similiar";

const Movie = () => {
  const { movieId, title } = useParams();
 
  return (
    <div className="bg-gray-200 text-gray-900 dark:bg-primary dark:text-dimWhite "> 
      <MovieBanner id={movieId} title={title}/>
      <Similiar title="movie" id={movieId}/>
    </div>
  );
};

export default Movie;
