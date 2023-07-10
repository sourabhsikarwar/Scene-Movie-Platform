import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import styles from "../../style";
import MovieCard from "../Cards/MovieCard";
import { type } from "@testing-library/user-event/dist/type";

const Trending = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [initialLoading, setinitalLoading] = useState(true);
  const [Movies, setMovies] = useState([]);
  const [Tv, setTv] = useState([]);

  const upload = async (url) => {
    setinitalLoading(true);
    await axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setMovies(res.data.results);
          setinitalLoading(false);
        }
      })
      .catch((e) => {
        return e.message;
      });
  };

  useEffect(() => {
    let url =
      (props.title === "Trending") & (props.type === "movie")
        ? `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${props.id}`;
    upload(url);
  }, []);

  const uploadTv = async (url) => {
    setinitalLoading(true);
    await axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setTv(res.data.results);
          setinitalLoading(false);
        }
      })
      .catch((e) => {
        return e.message;
      });
  };

  useEffect(() => {
    let url =
      (props.title === "Trending") & (props.type === "tv")
        ? `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`
        : `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${props.id}`;
    uploadTv(url);
  }, []);

  return (
    <>
      {" "}
      {!initialLoading ? (
        <div className={`${styles.boxWidth} py-4`}>
          {" "}
          {props.type === "movie" ? (
            <>
              <div className="flex justify-between items-center px-4">
                {props.title === "Trending" ? (
                  <h2
                    className={`${styles.heading3} text-gray-900 dark:text-white`}
                  >
                    {props.title + " " + props.head}
                  </h2>
                ) : (
                  <h2
                    className={`${styles.heading3} text-gray-900 dark:text-white`}
                  >
                    {props.title}
                  </h2>
                )}
                <p className="">
                  <Link
                    className={`${styles.paragraph} text-gray-900 dark:text-dimWhite dark:hover:text-white duration-200`}
                    to={"/category/movie/" + props.title + "/" + props.id}
                  >
                    Show all
                  </Link>
                </p>
              </div>
              <Splide
                options={{
                  type: "loop",
                  perPage: "6",
                  pagination: false,
                  breakpoints: {
                    400: {
                      perPage: 2,
                    },
                    764: {
                      perPage: 3,
                    },
                    1024: {
                      perPage: 4,
                    },
                    1280: {
                      perPage: 5,
                    },
                    1400: {
                      perPage: 6,
                    },
                  },
                }}
                aria-label="My Favorite Images"
                className="justify-center"
              >
                {Movies.map((movie) => {
                  return (
                    <SplideSlide key={movie.id}>
                      <MovieCard type="movie" movie={movie} />
                    </SplideSlide>
                  );
                })}
              </Splide>{" "}
            </>
          ) : (
            <></>
          )}
          {props.type === "tv" ? (
            <>
              <div className="flex justify-between items-center px-4">
                <h2
                  className={`${styles.heading3} text-gray-900 dark:text-white`}
                >
                  {props.title + " " + props.head}
                </h2>
                <p className="">
                  <Link
                    className={`${styles.paragraph} text-gray-900 dark:text-dimWhite dark:hover:text-white duration-200`}
                    to={"/category/tv/" + props.title + "/" + props.id}
                  >
                    Show all
                  </Link>
                </p>
              </div>
              <Splide
                options={{
                  type: "loop",
                  perPage: "6",
                  pagination: false,
                  breakpoints: {
                    400: {
                      perPage: 2,
                    },
                    764: {
                      perPage: 3,
                    },
                    1024: {
                      perPage: 4,
                    },
                    1280: {
                      perPage: 5,
                    },
                    1400: {
                      perPage: 6,
                    },
                  },
                }}
                aria-label="My Favorite Images"
                className="justify-center"
              >
                {Tv.map((movie) => {
                  return (
                    <SplideSlide key={movie.id}>
                      <MovieCard type="tv" movie={movie} />
                    </SplideSlide>
                  );
                })}
              </Splide>{" "}
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <Oval
            height="50"
            width="50"
            color="grey"
            secondaryColor="grey"
            ariaLabel="loading"
          />
        </div>
      )}
    </>
  );
};

Trending.defaultProps = {
  title: "Trending",
};

export default Trending;
