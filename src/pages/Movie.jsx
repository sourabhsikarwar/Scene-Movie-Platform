import React from "react";
import MovieBanner from "../components/Banner/MovieBanner";
import Trending from "../components/Carousel/Trending";

const Movie = () => {
  return (
    <>
      <MovieBanner />
      <Trending title="Similiar Results"/>
      <Trending />
    </>
  );
};

export default Movie;
