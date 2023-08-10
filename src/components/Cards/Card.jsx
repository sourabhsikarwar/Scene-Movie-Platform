import React from "react";
import { Link } from "react-router-dom";
import styles from "../../style";
import CircleRating from "../circleRating/CircleRating";
import dayjs from "dayjs";

const MovieCard = (props) => {
  return (
    <>
      <Link
        to={`/${props.type}/${
          props.type === "tv" ? props.movie.name : props.movie.title
        }/${props.movie.id}`}
      >
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
              <p className="mb-2">
                {props.type === "tv" ? props.movie.name : props.movie.title}
              </p>
              <div className="flex mb-[-30px]">
                <CircleRating rating={props.movie.vote_average.toFixed(1)} />
                <span className="pl-[20px] right-3date text-dimWhite font-normal text-xs">
                  {dayjs(props.type=== 'movie' ? props.movie.release_date : props.movie.first_air_date).format("MMM D, YYYY")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
