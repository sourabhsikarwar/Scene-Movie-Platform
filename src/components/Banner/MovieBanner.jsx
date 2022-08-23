import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../../style"

const MovieBanner = () => {
  const [Movies, setMovies] = useState({});

  useEffect(function () {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=ebf3974135e4e887c96fc16d0e3024b1&with_genres=12"
      )
      .then((res) => {
        const mResults = res.data.results[0];
        setMovies(mResults);
      });
  }, []);

  return (
    <>

      <section className="text-gray-600 body-font overflow-hidden bg-[#151515cf] bg-blend-multiply" style={{
        backgroundImage : `url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition:"center"
        }}>
        <div className={`${styles.boxWidth} px-4 py-8 mx-auto lg:h-screen h-full flex items-center`}>
          <div className="mx-auto flex flex-wrap">
            <div className="m-auto w-2/3 sm:w-2/4 md:w-1/4 my-[5%] bg-gray-200 rounded shadow-md">
            <img
              alt={`${Movies.poster_path}`}
              className="w-full object-cover object-center rounded"
              src={`https://image.tmdb.org/t/p/original/${Movies.poster_path}`}
            /></div>
            <div className="w-2/3 sm:w-2/4 lg:py-0 sm:ml-auto mx-auto my-auto items-center">
              <h1 className="text-gray-100 text-3xl title-font font-medium mb-1">
                {Movies.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-300 ml-3">4 Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed text-gray-300">
                {Movies.overview}
              </p>
              <div className="flex my-4">
                <button className="flex bg-blue-gradient text-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default MovieBanner;
