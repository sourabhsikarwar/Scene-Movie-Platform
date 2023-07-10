import React from "react";
import TvBanner from "../components/Banner/TvBanner";
import { useParams } from "react-router-dom";
import Similiar from "../components/Carousel/Similiar";

const Tv = () => {
  const { tvId, title } = useParams();

  return (
    <>
      <TvBanner id={tvId} title={title} />
      <Similiar title="tv" id={tvId} />
    </>
  );
};

export default Tv;
