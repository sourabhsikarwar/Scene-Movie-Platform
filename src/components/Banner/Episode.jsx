import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../style";
import { Oval } from "react-loader-spinner";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Episode = (props) => {
  const { tid, sid, eid, name } = useParams();
  const [Episode, setEpisode] = useState({});
  const [NextEpisodes, setNextEpisodes] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("next");
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    getEpisode(tid, sid, eid);
    getAllEpisodes(tid, sid, eid);
  }, [tid, sid, eid]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getAllEpisodes = (tid, sid, eid) => {
    setInitialLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tid}/season/${sid}?api_key=${apiKey}`
      )
      .then((res) => {
        const results = res.data;
        const nextEpisodes = results.episodes.filter(
          (episode) => episode.episode_number > eid
        );
        setNextEpisodes(nextEpisodes);
        setInitialLoading(false);
      });
  };

  const getEpisode = () => {
    setInitialLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tid}/season/${sid}/episode/${eid}?api_key=${apiKey}`
      )
      .then((res) => {
        const results = res.data;
        setEpisode(results);
        setInitialLoading(false);
      });
  };

  return (
    <>
      {!initialLoading ? (
        <>
          <section className="relative block section-movie-banner dark:bg-primary p-0 text-gray-600 body-font overflow-hidden bg-blend-multiply">
            <div className="hidden sm:block absolute inset-0 bg-black opacity-40"></div>
            <div className="flex flex-row relative w-full main-container">
              <div
                className={`flex info-container sm:justify-center items-start mx-0 lg:h-screen h-full relative`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "800px",
                  padding: "16px 32px 64px 0",
                  zIndex: "2",
                }}
              >
                <div className="info-container-inner sm:flex flex-wrap flex-row">
                  <div className="py-6 w-full pl-8 lg:mt-[-200px] md:pt-14 flex flex-col sm:items-start mx-0">
                    <h1
                      className={`${styles.heading2} sm:text-white text-lg sm:text-3xl sm:pl-0 md:text-5xl mb-3 md:mb-5 font-bold sm:font-extrabold text-left`}
                    >
                      {props.name}
                    </h1>
                    <>
                      <div className="flex flex-col justify-between items-start text-xs md:text-lg lg:text-xl text-gray-300 mb-1">
                        <div className="text-black sm:text-white dark:text-white mb-3 md:mb-4">
                          {Episode.air_date?.split("-")[0]}
                          <span className="mx-2">|</span>S
                          {Episode.season_number}
                          &nbsp;E{Episode.episode_number}
                          <span className="mx-2">|</span>
                          {Math.floor(Episode.runtime / 60)}h&nbsp;
                          {Math.floor(Episode.runtime % 60)}m
                          <span className="mx-2">|</span>
                          {Math.floor(Episode.vote_average % 10)} / 10
                        </div>
                      </div>
                      <p
                        className={`text-black sm:text-white mb-3 sm:mb-1 dark:text-white font-light leading-5 text-xs sm:text-base md:text-lg lg:text-xl text-left`}
                      >
                        {Episode.overview}
                      </p>
                    </>
                  </div>
                </div>
              </div>
              <div className="flex img-container-outer">
                <div
                  className="block img-container"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${Episode.still_path})`,
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
          {NextEpisodes.length ? (
            <section
              className={`w-full mx-auto dark:bg-primary dark:text-dimWhite px-4 pt-8`}
            >
              <div
                className={`${styles.boxWidth} details-navigation-container items-center px-6 text-lg`}
              >
                <div className="details-navigation pb-10 flex justify-between">
                  <ul className="flex gap-4">
                    <li
                      onClick={() => handleTabClick("next")}
                      style={{ cursor: "pointer", transitionDuration: "75ms" }}
                      className={`cursor-pointer ${
                        activeTab === "details"
                          ? "border-b-2 border-slate-900 dark:border-white"
                          : ""
                      } ${
                        styles.heading4
                      } hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                    >
                      Next Episodes
                    </li>
                    <li
                      className={`cursor-pointer ${
                        activeTab === "reviews"
                          ? "border-b-2 border-slate-900 dark:border-white"
                          : ""
                      } ${
                        styles.heading4
                      } hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                      onClick={() => handleTabClick("cast")}
                    >
                      Guest Stars
                    </li>
                  </ul>
                </div>
              </div>
              {activeTab === "next" && (
                <div
                  className={`${styles.boxWidth} flex gap-4 flex-row flex-wrap items-center px-4`}
                >
                  {NextEpisodes &&
                    NextEpisodes.map((nextepisode) => (
                      <Link
                        to={
                          "/tv/" +
                          tid +
                          "/" +
                          sid +
                          "/" +
                          nextepisode.episode_number +
                          "/" +
                          nextepisode.name
                        }
                      >
                        <div className="flex flex-col mb-12 sm:mb-8">
                          <div className="flex flex-row gap-8">
                            <div
                              className="flex w-2/6 sm:w-1/4"
                              style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                                  nextepisode.still_path ??
                                  `https://image.tmdb.org/t/p/w500${nextepisode.poster_path}`
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundBlendMode: "multiply",
                                height: "150px",
                                borderRadius: "10px",
                              }}
                            ></div>
                            <div className="flex flex-col w-8/12 sm:w-3/4 text-black dark:text-white">
                              <h2 className={`${styles.heading3}`}>
                                {nextepisode.name}
                              </h2>
                              <div className="flex flex-row font-semibold text-center items-center pt-1 sm:pt-2">
                                {nextepisode.season_number === 0 ? (
                                  <span>E{nextepisode.episode_number}</span>
                                ) : (
                                  <>
                                    <span>
                                      S{nextepisode.season_number}&nbsp;
                                    </span>
                                    <span>E{nextepisode.episode_number}</span>
                                  </>
                                )}
                                <span className="mx-2">|</span>
                                {nextepisode.air_date && (
                                  <>
                                    <span className="">
                                      {nextepisode.air_date
                                        .toString()
                                        .split("-")
                                        .reverse()
                                        .join("-")}
                                    </span>
                                    <span className="mx-2">|</span>
                                  </>
                                )}
                                {nextepisode.runtime > 60 ||
                                nextepisode.runtime === 60 ? (
                                  <span>
                                    {Math.floor(nextepisode.runtime / 60)}
                                    hr&nbsp;
                                    {Math.floor(nextepisode.runtime % 60)}m
                                  </span>
                                ) : (
                                  <span>
                                    {Math.floor(nextepisode.runtime % 60)}m
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-dimWhite pt-1 sm:pt-2">
                                {nextepisode.overview}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
              {activeTab === "cast" && (
                <Splide
                  options={{
                    type: "loop", // You can customize the options here based on your requirements.
                    perPage: 5,
                    perMove: 1,
                    pagination: false,
                    breakpoints: {
                      340: {
                        perPage: 1,
                      },
                      640: {
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
                    arrows: true,
                  }}
                >
                  {Episode.guest_stars.map((star) => (
                    <SplideSlide key={star.id}>
                      <div className={`shadow flex my-4 p-3 `} key={star.id}>
                        <div
                          className={`${styles.MovieCard} relative flex justify-start items-end p-4 duration-200 rounded-[6px]`}
                          alt="movie poster"
                          style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/${star.profile_path}), 
                        linear-gradient(0deg, #0D1117 0%, #131922 10%, #19212D 20%, transparent 100%)`,
                            backgroundSize: "cover",
                            backgroundPositionX: "center",
                            backgroundBlendMode: "multiply",
                          }}
                        >
                          <div className="w-full opacity-90 text-white text-md font-medium mt-2 ">
                            <p>{star.original_name}</p>
                            <span className="flex text-gray-400">
                              <p className="opacity-70">as&nbsp;</p>
                              <p className="mb-0 opacity-90">
                                {star.character}
                              </p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              )}
            </section>
          ) : (
            ""
          )}
        </>
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

export default Episode;
