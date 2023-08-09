import React from "react";
import { useParams } from "react-router-dom";
import EpisodeBanner from "../components/Banner/Episode";

const Episode = () => {
  const { tid, sid, eid, name } = useParams();

  return (
    <>
      <EpisodeBanner tid={tid} sid={sid} eid={eid} name={name} type="episode" />
    </>
  );
};

export default Episode;
