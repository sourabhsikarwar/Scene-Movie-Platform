import React from "react";
import { Link } from "react-router-dom";
import styles from "../../style";

const MovieCard = (props) => {
  return (
    <Link to={"/movie/" + props.movie.title + "/" + props.movie.id}>
    <div className={`shadow flex my-4 p-3`} key={props.movie.id}>
      <div
        className={`${styles.Card} flex justify-start items-end p-4 duration-200 rounded-[6px]`}
        alt="poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movie.poster_path}), linear-gradient(0deg, #0D1117 0%, #111111 10%, #0D1117 15%, transparent 100%)`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="w-full opacity-90 text-white text-md font-medium mt-2">
          <p>{props.movie.title}</p>
          <p className="text-dimWhite font-normal text-xs mt-2">
            {props.movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default MovieCard;
