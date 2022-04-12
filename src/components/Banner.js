import React, { useState, useEffect } from "react";
import bannerBG from "../style/BannerS.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

// const navigation = [
//   { name: "Home", href: "/" },
//   { name: "Favourites", href: "/favourites" },
// ];

function Banner() {
  const [Movies, setMovies] = useState({});

  useEffect(function () {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=ebf3974135e4e887c96fc16d0e3024b1"
      )
      .then((res) => {
        const mResults = res.data.results[0];
        setMovies(mResults);
      });
  }, []);

  return (
    <>
      {/* <div
        className={` bg-[url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})] ${bannerBG.bggradient} h-[85vh] bg-center bg-cover flex items-center justify-start bg-blend-overlay`}
      >
        <div className="container text-white lg:px-28 flex-col justify-start w-6/12">
          <h1 className="drop-shadow-2xl text-5xl leading-normal">
            {Movies.title}
          </h1>
          <p className="my-2">{Movies.overview + "..."}</p>
          <div>
            <button>See More</button>
            <button>Add to Favourites</button>
          </div>
        </div>
      </div> */}

      {/* ========================== */}

      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                  <span className="block xl:inline">{Movies.title}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {Movies.overview + "..."}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/"
                      className="w-full flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-8"
                    >
                      See More
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/favourites"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-3 md:text-lg md:px-8"
                    >
                      Add to Favourites
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={`https://image.tmdb.org/t/p/original/${Movies.backdrop_path}`}
            alt="bannerimg"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
