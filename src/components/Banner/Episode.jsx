import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../style";
import { Oval } from "react-loader-spinner";

const Episode = (props) => {
  const { tid, sid, eid, name } = useParams();
  const [Episode, setEpisode] = useState({});
  const [NextEpisodes, setNextEpisodes] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    getEpisode(tid, sid, eid);
    getAllEpisodes(tid, sid, eid);
  }, [tid, sid, eid]);

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
              <h2
                className={`${styles.heading3} mx-4 text-gray-900 mb-6 dark:text-white`}
              >
                Next Episodes
              </h2>
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
                                  {Math.floor(nextepisode.runtime / 60)}hr&nbsp;
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
