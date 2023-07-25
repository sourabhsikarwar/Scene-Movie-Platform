import React from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";
import Tv from "../components/TvShows";

const Categories = () => {
  const { id, title, content } = useParams();

  return (
    <div>
      {content === "movie" ? (
        <Movies id={id} title={title} content={content} />
      ) : (
        ""
      )}
      {content === "tv" ? <Tv id={id} title={title} content={content} /> : ""}
    </div>
  );
};

export default Categories;
