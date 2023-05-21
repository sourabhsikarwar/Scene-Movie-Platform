import React from "react";
import styles from "../../style";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <Link to={"/movie/" + props.movie.title + "/" + props.movie.id}>
      <div className={`shadow flex my-4 p-3 group`} key={props.movie.id}>
        <div
          className={`${styles.MovieCard} relative flex justify-start items-end p-4 duration-200 rounded-[6px]`}
          alt="poster"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movie.poster_path}), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          <div
            className={`absolute w-[40px] h-[40px] right-0 top-0 text-white bg-blue-gradient rounded-full justify-center items-center self-end cursor-pointer group-hover:flex hidden sidebar m-3 shadow`}
          >
            <ion-icon name="heart"></ion-icon>
          </div>
          <div className="w-full opacity-90 text-white text-md font-medium mt-2 ">
            <p className="">{props.movie.title}</p>
            <p className="text-dimWhite font-normal text-xs mt-2">
              {props.movie.vote_average.toFixed(1)}/10
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
