import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import "../SingleMovieCast/style.css";
import { useParams } from "react-router-dom";
import fetchData from "../../helper/fetchData";
import styles from "../../style";
import axios from "axios";

const TvBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";
  const { tvId, title } = useParams();
  const [Tv, setTv] = useState({});
  const apiKey = process.env.REACT_APP_API_KEY;
  const [DetailsOpen, setDetailsOpen] = useState(true);
  const [Episodes, setEpisodes] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [visibleEpisodes, setVisibleEpisodes] = useState(10);
  const [activeTab, setActiveTab] = useState();
  const loadMoreEpisodes = 7;

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
  }, [tvId]);

  const handleSeeMoreClick = () => {
    setVisibleEpisodes(
      (prevVisibleEpisodes) => prevVisibleEpisodes + loadMoreEpisodes
    );
  };

  const getEpisodes = async (id, sid) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${sid}?api_key=${apiKey}`
      )
      .then((res) => {
        const results = res.data;
        setEpisodes(results);
        setSelectedSeason(sid + 1);

        // setInitialLoading(false);
      });
  };

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
        <>
          <section className="relative block section-movie-banner dark:bg-primary p-0 text-gray-600 body-font overflow-hidden bg-blend-multiply">
            <div className="hidden sm:block absolute inset-0 bg-black opacity-40"></div>
            <div className="flex flex-row relative w-full main-container">
              <div
                className={`flex info-container items-start mx-0 lg:h-screen h-full relative`}
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
                    <div className="flex flex-col justify-between items-start md:text-lg lg:text-xl text-gray-300 mb-1">
                      <div className="text-black sm:text-white dark:text-white mb-3 md:mb-4">
                        {Tv.first_air_date.split("-")[0]}
                        <span className="mx-2">|</span>
                        {Tv.genres[0].name}
                        <span className="mx-2">|</span>
                        {Math.floor(Tv.vote_average % 10)} / 10
                      </div>
                      <div className="text-black sm:text-white dark:text-white mb-2 md:mb-4">
                        Seasons:&nbsp;{Tv.number_of_seasons}
                        <span className="mx-2">|</span>
                        Episodes:&nbsp;{Tv.number_of_episodes}
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
          <section
            className={`${styles.boxWidth} dark:bg-primary dark:text-white pt-8`}
          >
            <div className="flex justify-between items-center px-4">
              <h2
                className={`${styles.heading3} text-gray-900 dark:text-white`}
              >
                More Details
              </h2>
              <div>
                {DetailsOpen && (
                  <button onClick={handleDetailsClose}>
                    <ion-icon name="chevron-up-outline"></ion-icon>
                  </button>
                )}
                {!DetailsOpen && (
                  <button onClick={handleDetailsOpen}>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </button>
                )}
              </div>
            </div>
            {DetailsOpen && (
              <div className="flex flex-wrap gap-0 max-md:justify-between  py-4 mx-auto px-8">
                <div className="w-1/2 lg:w-1/3 my-3">
                  <div className="font-medium">Status</div>
                  <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                    {Tv.status}
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/3 my-3">
                  <div className="font-medium">Ratings</div>
                  <div className="flex flex-wrap">
                    <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                      {Tv.vote_average} / 10
                    </span>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/3 my-3">
                  <div className="font-medium">Total Seasons</div>
                  <div className="flex flex-wrap">
                    <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                      {Tv.number_of_seasons}
                    </span>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/3 mb-3">
                  <div className="font-medium">Total Episodes</div>
                  <div className="flex flex-wrap">
                    <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                      {Tv.number_of_episodes}
                    </span>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/3 my-3">
                  <div className="font-medium">First Air Date</div>
                  <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                    {Tv.first_air_date
                      .toString()
                      .split("-")
                      .reverse()
                      .join("-")}
                  </div>
                </div>
                {Tv.last_episode_to_air ? (
                  <div className="w-1/2 lg:w-1/3 mb-3">
                    <div className="font-medium">Last Episode</div>
                    <div className="flex flex-wrap">
                      <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                        #{Tv.last_episode_to_air.episode_number} :{" "}
                        {Tv.last_episode_to_air.air_date
                          .toString()
                          .split("-")
                          .reverse()
                          .join("-")}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {Tv.next_episode_to_air ? (
                  <div className="w-1/2 lg:w-1/3 my-3">
                    <div className="font-medium">Next Episode</div>
                    <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                      #{Tv.next_episode_to_air.episode_number} :{" "}
                      {Tv.next_episode_to_air.air_date
                        .toString()
                        .split("-")
                        .reverse()
                        .join("-")}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="w-1/2 lg:w-1/3 mb-3">
                  <div className="font-medium">Genres</div>
                  <div className="flex flex-wrap pr-5">
                    {Tv.genres.map((genre, index) => (
                      <span
                        key={genre.id}
                        className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70"
                      >
                        {genre.name}
                        {index !== Tv.genres.length - 1 && <span>,&nbsp;</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/3 my-3">
                  <div className="font-medium">Spoken Languages</div>
                  <div className="flex flex-wrap">
                    {Tv.spoken_languages.map((lang, index) => (
                      <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                        {lang.english_name}
                        {index !== Tv.spoken_languages.length - 1 && (
                          <span>,&nbsp;</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
          <section
            className={`${styles.boxWidth} dark:bg-primary dark:text-dimWhite pt-8`}
          >
            <div className="flex gap-4 flex-row flex-wrap items-center px-4">
              {Tv.seasons.map((season) => (
                <button
                  onClick={() => {
                    getEpisodes(Tv.id, season.season_number);
                    handleTabClick(season.season_number);
                  }}
                  className={`${
                    activeTab === season.season_number
                      ? "text-cyan-500 dark:text-cyan-600"
                      : ""
                  } text-gray-900 dark:text-dimWhite`}
                >
                  {season.season_number === 0
                    ? "Specials "
                    : `Season ${season.season_number}`}
                </button>
              ))}
            </div>
            <div>
              {selectedSeason && Episodes && (
                <div className="flex p-8 flex-col w-full">
                  {Episodes.episodes
                    .slice(0, visibleEpisodes)
                    .map((episode) => (
                      <div className="flex flex-col mb-12 sm:mb-8">
                        <div className="flex flex-row gap-8">
                          <div className="flex w-2/6 sm:w-1/4">
                            <div
                              // className="flex w-2/6 sm:w-1/4"
                              style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                                  episode.still_path ??
                                  `https://image.tmdb.org/t/p/w500${Episodes.poster_path}`
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundBlendMode: "multiply",
                                height: "150px",
                                width: "auto",
                                borderRadius: "6%",
                              }}
                            ></div>
                          </div>
                          <div className="flex flex-col w-8/12 sm:w-3/4 text-black dark:text-white">
                            <h2 className={`${styles.heading3}`}>
                              {episode.name}
                            </h2>
                            <div className="flex flex-row font-semibold text-center items-center pt-1 sm:pt-2">
                              {episode.season_number === 0 ? (
                                <span>E{episode.episode_number}</span>
                              ) : (
                                <>
                                  <span>S{episode.season_number}&nbsp;</span>
                                  <span>E{episode.episode_number}</span>
                                </>
                              )}
                              <span className="mx-2">|</span>
                              {episode.air_date && (
                                <>
                                  <span className="">
                                    {episode.air_date
                                      .toString()
                                      .split("-")
                                      .reverse()
                                      .join("-")}
                                  </span>
                                  <span className="mx-2">|</span>
                                </>
                              )}
                              {episode.runtime > 60 ||
                              episode.runtime === 60 ? (
                                <span>
                                  {Math.floor(episode.runtime / 60)}hr&nbsp;
                                  {Math.floor(episode.runtime % 60)}m
                                </span>
                              ) : (
                                <span>{Math.floor(episode.runtime % 60)}m</span>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-dimWhite pt-1 sm:pt-2">
                            {episode.overview}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {visibleEpisodes < Episodes.episodes.length && (
                    <button
                      className="flex border-2 rounded-3xl py-2 px-4 border-sky-700 text-sky-700 dark:border-sky-700	dark:text-sky-500 w-1/6 justify-center items-center mx-auto	"
                      onClick={handleSeeMoreClick}
                    >
                      See More
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
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

export default TvBanner;
