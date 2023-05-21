import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../style";
import MovieCard from "../Cards/MovieCard";

const Trending = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [movies, setMovies] = useState([]);
  const isMounted = useRef(true);
  const upload = async () => {
    await axios
      .get(
        props.title === "Trending"
          ? `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${props.id}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    if (isMounted.current) {
      upload();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchAdditionalData = async (movie) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`);
      const { crew, cast } = response.data;
      const directors = crew.filter((member) => member.job === "Director").map((director) => director.name);
      const castMembers = cast.map((member) => member.name);
      return {
        ...movie,
        directors,
        cast: castMembers,
      };
    } catch (error) {
      console.log(error.message);
      return movie;
    }
  };

  const fetchAllAdditionalData = async () => {
    const newMovies = await Promise.all(movies.map((movie) => fetchAdditionalData(movie)));
    setMovies(newMovies);
  };

  useEffect(() => {
    if (movies.length > 0) {
      fetchAllAdditionalData();
    }
  }, [movies]);

  return (
    <div className={`${styles.boxWidth} my-8`}>
      <div className="flex justify-between items-center px-4">
        <h2 className={`${styles.heading3}`}>{props.title}</h2>
        <p className="">
          <Link className={`${styles.paragraph} hover:text-white duration-200`} to={"/category/movie/" + props.title + "/" + props.id}>
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
        {movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <MovieCard movie={movie} />
            <div>
              <p>Directors: {movie.directors && movie.directors.join(", ")}</p>
              <p>Cast: {movie.cast && movie.cast.join(", ")}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

Trending.defaultProps = {
  title: "Trending",
};

export default Trending;
