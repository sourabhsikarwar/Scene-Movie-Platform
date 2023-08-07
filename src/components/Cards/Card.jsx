import React from "react";
import { Link } from "react-router-dom";
import styles from "../../style";
import Star from "../../assets/image/star.webp";
import CircleRating from "../circleRating/CircleRating";
import dayjs from "dayjs";

const MovieCard = (props) => {
  return (
    <>
      {props.type === "tv" ? (
        <>
          <Link to={"/tv/" + props.movie.name + "/" + props.movie.id}>
            {" "}
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
                  <p>{props.movie.name}</p>
                  <div style={{ marginBottom: "-30px", display: "flex" }}>
                    <CircleRating
                      rating={props.movie.vote_average.toFixed(1)}
                    />
                    <span
                      className=" right-3date text-dimWhite font-normal text-xs"
                      style={{ paddingLeft: "20px" }}
                    >
                      {dayjs(props.movie.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </>
      ) : (
        <>
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
                  <p className="mb-2">{props.movie.title}</p>
                  <div style={{ marginBottom: "-30px", display: "flex" }}>
                    <CircleRating
                      rating={props.movie.vote_average.toFixed(1)}
                    />
                    <span
                      className=" right-3date text-dimWhite font-normal text-xs"
                      style={{ paddingLeft: "20px" }}
                    >
                      {dayjs(props.movie.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default MovieCard;
