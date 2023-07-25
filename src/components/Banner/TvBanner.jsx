import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import { Oval } from "react-loader-spinner";
// for star rating convert number into star
import Star from "../SingleMovieCast/Star";
//  format price is used to format country currency
import FormatPrice from "../SingleMovieCast/FormatPrice";
import "../SingleMovieCast/style.css";
import { useParams } from "react-router-dom";
import fetchData from "../../helper/fetchData";
import styles from "../../style";
import axios from "axios";

const TvBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";
  const [playing, setPlaying] = useState(false);
  const [Movies, setMovies] = useState({});
  const { tvId, title } = useParams();
  const [Tv, setTv] = useState({});
  const apiKey = process.env.REACT_APP_API_KEY;

  const [trailer, setTrailer] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
  }, [tvId]);

  const update = async () => {
    setInitialLoading(true);
    await axios
      .get(`${MOVIE_API}/tv/${props.id}?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        const mResults = res.data;
        setTv(mResults);
        setInitialLoading(false);
      });
  };

  return (
    <>
      {!initialLoading ? (
        <section className="relative block section-movie-banner dark:bg-primary p-0 text-gray-600 body-font overflow-hidden bg-blend-multiply">
          <div className="hidden sm:block absolute inset-0 bg-black opacity-40"></div>
          <div className="flex flex-row relative w-full main-container">
            <div
              className={`${styles.boxWidth} flex info-container items-start mx-0 lg:h-screen h-full relative`}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "800px",
                padding: "16px 32px 64px 10px",
                zIndex: "2",
              }}
            >
              <div className="info-container-inner sm:flex flex-wrap flex-row">
                <div className="py-3 sm:pt-12 w-full pl-8 sm:mt-10 md:pt-14 flex flex-col sm:items-start mx-0">
                  <h1
                    className={`${styles.heading2} sm:text-white md:text-5xl mb-3 md:mb-5 font-bold sm:font-extrabold text-left`}
                  >
                    {Tv.name}
                  </h1>
                  <div className="hidden sm:flex flex-col justify-between items-start md:text-lg lg:text-xl text-gray-300 mb-1">
                    <div className="text-gray-300 mb-3 md:mb-4">
                      {Tv.first_air_date.split("-")[0]}
                      <span className="mx-2">|</span>
                      {Tv.genres[0].name}
                      <span className="mx-2">|</span>
                      {Math.floor(Tv.vote_average % 10)} / 10
                    </div>
                    <div className="text-gray-300 mb-2 md:mb-4">
                      Seasons:&nbsp;{Tv.number_of_seasons}
                      <span className="mx-2">|</span>
                      Episodes:&nbsp;{Tv.number_of_episodes}
                    </div>
                  </div>
                  <div className="flex sm:hidden flex-col justify-between items-start text-gray-300 mb-3">
                    <div className="text-gray-300 mb-1">
                      <span className="text-black dark:text-white font-medium text-base">
                        Release Date:&nbsp;&nbsp;
                      </span>
                      <span className="text-black dark:text-dimWhite text-base">
                        {Tv.first_air_date}
                      </span>
                    </div>
                    <div className="text-gray-300 mb-1">
                      <span className="text-black dark:text-white font-medium text-base">
                        Genres:&nbsp;&nbsp;
                      </span>
                      <span className="text-black dark:text-dimWhite text-base  ">
                        {Tv.genres.map((genre) => genre.name).join(" | ")}
                      </span>
                    </div>
                    <div className="text-gray-300 mb-1">
                      <span className="text-black dark:text-white font-medium text-base">
                        Total Episodes:&nbsp;&nbsp;
                      </span>
                      <span className="text-black dark:text-dimWhite text-base  ">
                        {Tv.number_of_episodes}
                      </span>
                    </div>
                    <div className="text-gray-300 mb-1">
                      <span className="text-black dark:text-white font-medium text-base">
                        Total Seasons:&nbsp;&nbsp;
                      </span>
                      <span className="text-black dark:text-dimWhite text-base  ">
                      {Tv.number_of_seasons}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`text-black sm:text-white mb-3 sm:mb-1 dark:text-white font-light leading-5 text-base md:text-lg lg:text-xl text-left`}
                  >
                    {Tv.overview}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex img-container-outer">
              <div
                className="block img-container"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${Tv.backdrop_path})`,
                  backgroundPosition: "84%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%",
                  position: "absolute",
                  right: "-11%",
                  width: "103%",
                }}
              ></div>
            </div>
          </div>
        </section>
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
    </>
  );
};

export default TvBanner;
