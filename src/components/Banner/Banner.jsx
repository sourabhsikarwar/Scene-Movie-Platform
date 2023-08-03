import React, { useState, useEffect } from "react";
import styles from "../../style";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import fetchData from "../../helper/fetchData";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Banner() {
  const [Popular, setPopular] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    setInitialLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      setPopular(response.data.results);
      setInitialLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className={`text-gray-600 body-font`}>
        {!initialLoading ? (
          <Splide
            options={{
              type: "loop",
              perPage: 1,
              pagination: true,
              autoplay: true,
              interval: 5000,
            }}
            className={`splide-container`}
          >
            {/* Map over the Popular movies data and display banners */}
            {Popular.slice(0,5).map((movie) => (
              <SplideSlide key={movie.id}>
                <div
                  className={`text-gray-600 body-font`}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                      movie.backdrop_path ??
                      "https://image.tmdb.org/t/p/original/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg"
                    }), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                  }}
                >
                  <div
                    className={`${styles.boxWidth} mx-auto flex px-8 py-8 flex-row justify-center md:items-end items-end md:h-[85vh] h-[90vh]`}
                  >
                    <div className="md:w-full mb-10 flex flex-col md:items-center md:text-center md:mb-0 items-center text-center">
                      <h1 className={`${styles.heading1} mb-2 text-gray-100`}>
                        {movie.title}
                      </h1>
                      <div className="flex justify-center my-4">
                        <Link to={"/movie/" + movie.title + "/" + movie.id}>
                          <button className="inline-flex bg-blue-gradient text-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            See More
                          </button>
                        </Link>
                        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                          Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div className="flex justify-center my-8">
            <Oval
              height="50"
              width="50"
              color="grey"
              secondaryColor="grey"
              ariaLabel="loading"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default Banner;
