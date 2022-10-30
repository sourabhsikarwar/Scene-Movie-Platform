import React from "react";
import TvBanner from "../components/Banner/TvBanner";
import General from "../components/Carousel/General";
import Similiar from "../components/Carousel/Similiar";
import { useParams } from "react-router-dom"

const Movie = () => {
  const { tvId, title } = useParams();
  return (
    <>
      <TvBanner id={tvId} title={title}/>
      <General title="Episodes" id={tvId}/>
      <Similiar title="tv" id={tvId}/>
    </>
  );
};

export default Movie;
