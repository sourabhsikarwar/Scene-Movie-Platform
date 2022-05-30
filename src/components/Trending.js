// import logo from "../assets/img/mLogo";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto my-8">
      <div className="flex justify-between">
        <p className="md:text-2xl text-xl font-medium my-2 mx-4">
          {props.title}
        </p>
        <Link className="md:text-md text-sm mx-4 my-auto" to="#">
          Show all
        </Link>
      </div>
      <Splide
        options={{
          // rewind: true,
          type: "loop",
          gap: "1rem",
          perPage: "5",
          // autoplay: true,
          trimSpace: true,
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
              <div className="flex m-4 bg-gray-200" key={movie.id}>
                <div
                  className={`bg-[url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})] h-[350px] md:h-[280px] w-[250px] md:w-[220px] bg-center bg-cover rounded-md text-center flex items-end hover:scale-105 ease-out duration-300 drop-shadow`}
                  alt="poster"
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

export default Trending;
