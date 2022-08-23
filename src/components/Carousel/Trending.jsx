import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../style";

const Trending = (props) => {
  const [Movies, setMovies] = useState([]);
  const isMounted = useRef(true);
  const upload = async () => {
    await axios
      .get(
        props.title === "Trending"
          ? `https://api.themoviedb.org/3/trending/movie/day?api_key=ebf3974135e4e887c96fc16d0e3024b1`
          : `https://api.themoviedb.org/3/discover/movie?api_key=ebf3974135e4e887c96fc16d0e3024b1&with_genres=99`
      )
      .then((res) => {
        setMovies(res.data.results);
        // saveData();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(function () {
    if (isMounted.current) {
      upload();
    }
    return () => {
      isMounted.current = false;
    };
  });

  return (
    <div className={`${styles.boxWidth} my-8`}>
      <div className="flex justify-between items-center px-6">
        <h2 className={`${styles.heading3}`}>{props.title}</h2>
        <p className="">
          <Link className={`${styles.paragraph}`} to="/category">
            Show all
          </Link>
        </p>
      </div>
      <Splide
        options={{
          type: "loop",
          gap: "1rem",
          perPage: "5",
          pagination: false,
          breakpoints: {
            500: {
              perPage: 1.5,
            },
            764: {
              perPage: 2,
            },
            1024: {
              perPage: 3,
            },
            1280: {
              perPage: 4,
            },
            1400: {
              perPage: 5,
            },
          },
        }}
        aria-label="My Favorite Images"
        className="justify-center"
      >
        {Movies.map((movie) => {
          return (
            <SplideSlide>
              <div className="flex m-4" key={movie.id}>
                <div
                  className={`h-[350px] md:h-[280px] w-[250px] md:w-[220px] bg-center bg-cover mx-auto rounded-md text-center flex items-end hover:scale-105 ease-out duration-300 drop-shadow`}
                  alt="poster"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {
                    <>
                      <div className="absolute top-2 right-2 p-2 bg-gray-800 text-red-600 rounded-md cursor-pointer">
                        {" "}
                        &#10060;
                      </div>
                    </>
                  }
                  <div className="w-full bg-gray-800 opacity-90 p-2 text-white rounded-b-md">
                    {movie.title}
                  </div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

Trending.defaultProps = {
  title: "Trending",
};

export default Trending;
