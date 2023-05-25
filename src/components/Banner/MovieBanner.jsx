import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../../style";

const MovieBanner = (props) => {
  const [Movies, setMovies] = useState({});
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const update = async () => {
      await axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.id}?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        const mResults = res.data;
        console.log(mResults);
        setMovies(mResults);
      });
    }
    window.scrollTo(0, 0);
    update()
  }, [props.id, apiKey]);

  return (
    <>
      <section
        className="text-gray-600 body-font overflow-hidden bg-[#151515cf] bg-blend-multiply"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`${styles.boxWidth} px-4 py-8 mx-auto lg:h-screen h-full flex items-center`}
        >
          <div className="mx-auto flex flex-wrap">
            <div className="m-auto w-2/3 h-full sm:w-2/4 md:w-1/4 my-[5%] bg-gray-200 rounded shadow-md">
              <img
                alt={`${Movies.poster_path}`}
                className="w-full h-full object-cover object-center rounded"
                src={`https://image.tmdb.org/t/p/original/${Movies.poster_path}`}
              />
            </div>
            <div className="w-2/3 sm:w-2/4 lg:py-0 sm:ml-auto mx-auto my-auto items-center">
              <h1 className={`${styles.heading2} font-extrabold`}>{Movies.title}</h1>
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
              <p className={`${styles.paragraph}`}>{Movies.overview}</p>
              <div className="flex my-4">
                <button className="flex bg-blue-gradient text-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Watch
                </button>
                <button className="rounded-full w-10 h-10 bg-white hover:bg-gray-100 duration-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                  <ion-icon name="heart"></ion-icon>
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
