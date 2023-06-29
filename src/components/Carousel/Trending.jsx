import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import styles from "../../style";
import MovieCard from "../Cards/MovieCard";

const Trending = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [initialLoading, setinitalLoading] = useState(true);
  const [Movies, setMovies] = useState([]);

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
      props.title === "Trending"
        ? `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${props.id}`;
    upload(url);
  }, []);

  return (
    <>
      {" "}
      {!initialLoading ? (
        <div className={`${styles.boxWidth} py-4`}>
          {" "}
          <div className="flex justify-between items-center px-4">
            <h2 className={`${styles.heading3} text-gray-900 dark:text-white`}>{props.title}</h2>
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
                  <MovieCard movie={movie} />
                </SplideSlide>
              );
            })}
          </Splide>{" "}
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
