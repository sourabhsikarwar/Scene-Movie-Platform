import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import styles from "../../style";
import axios from "axios";
import Details from "./Details";
import CommonBanner from "./CommonBanner";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Youtube from "react-youtube";

const TvBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";
  const { tvId, title } = useParams();
  const [Tv, setTv] = useState({});
  const [reviews, setReviews] = useState({});
  const [Images, setImages] = useState({});
  const [tvTrailer, setTvTrailer] = useState(null);
  const [videos, setVideos] = useState({});
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [activeTab, setActiveTab] = useState("details");
  const apiKey = process.env.REACT_APP_API_KEY;
  const [Episodes, setEpisodes] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [visibleEpisodes, setVisibleEpisodes] = useState(10);
  const [activeSeasonTab, setActiveSeasonTab] = useState();
  const [activeHeaderTab, setActiveHeaderTab] = useState(false);
  const [EpisodeHeader, setEpisodeHeader] = useState(false);
  const [EpisodeDisplay, setEpisodeDisplay] = useState(false);
  const [EpisodeVideosDisplay, setEpisodeVideosDisplay] = useState(false);
  const [EpisodeVideos, setEpisodeVideos] = useState({});
  const [displayDetails, setDisplayDetails] = useState(true);
  const loadMoreEpisodes = 7;

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
    getImages();
  }, [tvId]);

  const getImages = async () => {
    setInitialLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvId}/images?api_key=${apiKey}`
      );
      setImages(response.data.backdrops);
    } catch (error) {
      console.log(error);
    }
  };

  const splideOptions = {
    type: "loop", // You can customize the options here based on your requirements.
    perPage: 3,
    perMove: 1,
    pagination: false,
    breakpoints: {
      640: {
        perPage: 1,
      },
      764: {
        perPage: 2,
      },
      1024: {
        perPage: 2,
      },
      1280: {
        perPage: 3,
      },
      1400: {
        perPage: 4,
      },
    },
    arrows: true,
  };

  const getEpisodes = async (id, sid) => {
    setActiveHeaderTab(false);
    setEpisodeDisplay(true);
    setEpisodeVideosDisplay(false);
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

  const showEpisodeHeader = (no) => {
    setEpisodeHeader(true);
  };

  const showEpisodeVideo = async (id, no) => {
    setEpisodeVideosDisplay(true);
    setActiveHeaderTab(true);
    setEpisodeDisplay(false);
    try {
      // console.log("fil",response.data.results)
    } catch (error) {
      console.log(error);
    }
  };

  const update = async () => {
    setInitialLoading(true);
    await axios
      .get(
        `${MOVIE_API}/tv/${props.id}?api_key=${apiKey}&language=en-US&append_to_response=reviews,videos`
      )
      .then((res) => {
        const mResults = res.data;
        const filteredVideos = mResults.videos.results.filter(
          (video) =>
            video.type === "Trailer" ||
            video.type === "Teaser" ||
            video.type === "Official Teaser" ||
            video.type === "Main Trailer" ||
            video.type === "Featurette" ||
            video.type === "Clip"
        );
        const tvtrailer = mResults.videos.results.find(
          (vid) =>
            vid.name === "Official Trailer" ||
            vid.name === "Official Teaser" ||
            vid.name === "Main Trailer"
        );
        setTvTrailer(tvtrailer ? tvtrailer : mResults.videos.results[0]);
        setVideos(filteredVideos);
        setTv(mResults);
        setReviews(mResults.reviews.results[0]);
        setInitialLoading(false);
      });
  };
  const isValidURL = (url) => {
    return url.startsWith("https://") || url.startsWith("http://");
  };

  const handleToggleExpand = (reviewId) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const handleToggleVisibleReviews = () => {
    setVisibleReviews((prevVisibleReviews) =>
      prevVisibleReviews === 4 ? reviews.length : 4
    );
  };

  const handleSeeMoreClick = () => {
    setVisibleEpisodes(
      (prevVisibleEpisodes) => prevVisibleEpisodes + loadMoreEpisodes
    );
  };

  const handleSeasonTabClick = async (id, tab) => {
    setActiveSeasonTab(tab);
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${tab}/videos?api_key=${apiKey}`
    );
    console.log(response)
    setEpisodeVideos(response.data.results);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {!initialLoading ? (
        <>
          <CommonBanner type="tv" content={Tv} tvTrailer={tvTrailer} />
          {/* details/review header */}
          <section
            className={`w-full mx-auto dark:bg-primary dark:text-white py-8 border-b border-gray-400 dark:border-gray-300`}
          >
            <div className={`${styles.boxWidth} details-navigation-container items-center px-6 text-lg`}>
              <div className="details-navigation flex justify-between">
                <ul className="flex gap-4">
                  <li
                    onClick={() => handleTabClick("details")}
                    style={{ cursor: "pointer", transitionDuration: "75ms" }}
                    className={`cursor-pointer ${
                      activeTab === "details"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    } ${styles.heading4} hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                  >
                    Details
                  </li>
                  <li
                    className={`cursor-pointer ${
                      activeTab === "reviews"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    } ${styles.heading4} hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Reviews
                  </li>
                  <li
                    className={`cursor-pointer ${
                      activeTab === "snapshots"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    } ${styles.heading4} hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                    onClick={() => handleTabClick("snapshots")}
                  >
                    Snapshots
                  </li>
                  <li
                    className={`cursor-pointer ${
                      activeTab === "videos"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    } ${styles.heading4} hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                    onClick={() => handleTabClick("videos")}
                  >
                    Videos
                  </li>
                </ul>
                <div className="flex items-center">
                  {!displayDetails && (
                    <ion-icon style={{cursor:"pointer"}}
                    onClick={()=> {setActiveTab('details'); setDisplayDetails(true)}}
                      name="chevron-down"
                    ></ion-icon>
                  )}
                  {displayDetails && (
                    <ion-icon style={{cursor:"pointer"}}
                    onClick={()=> {setActiveTab(null); setDisplayDetails(false)}}
                    name="chevron-up"
                  ></ion-icon>
                  )}
                </div>
              </div>
            </div>
          </section>
          {activeTab === "snapshots" && (
            <Details type="tv" title="snapshots" Images={Images} />
          )}
          {activeTab === "details" && (
            <Details type="tv" Tv={Tv} title="details" />
          )}
          {activeTab === "reviews" && (
            <Details
              title="reviews"
              visibleReviews={visibleReviews}
              expandedReviews={expandedReviews}
              handleToggleExpand={handleToggleExpand}
              handleToggleVisibleReviews={handleToggleVisibleReviews}
              isValidURL={isValidURL}
              reviews={reviews}
            />
          )}
          {activeTab === "videos" && <Details title="video" videos={videos} />}
          <section
            className={`w-full mx-auto dark:bg-primary dark:text-dimWhite pt-8`}
          >
            {/* <div className={`${styles.boxWidth}`}> */}
            <div className={`${styles.boxWidth} flex gap-4 flex-row flex-wrap items-center px-6 pb-6 border-b border-gray-400 dark:border-gray-300`}>
              {Tv.seasons.map((season) => (
                <button
                  onClick={() => {
                    getEpisodes(Tv.id, season.season_number);
                    handleSeasonTabClick(Tv.id, season.season_number);
                    showEpisodeHeader(season.season_number);
                  }}
                  className={`${
                    activeSeasonTab === season.season_number
                      ? "text-cyan-500 dark:text-cyan-600"
                      : ""
                  } ${styles.heading4} text-gray-900 dark:text-white`}
                >
                  {season.season_number === 0
                    ? "Specials "
                    : `Season ${season.season_number}`}
                </button>
              ))}
            </div>
            {EpisodeHeader && (
              <div className={`${styles.boxWidth} flex flex-row justify-between flex-wrap items-center relative px-6 gap-4 py-6`}>
                <ul className="flex gap-8 episode-header text-[19px]">
                  <li
                    onClick={() => {
                      getEpisodes(Tv.id, activeSeasonTab);
                    }}
                    className={`${
                      activeSeasonTab && !activeHeaderTab
                        ? "text-cyan-500 dark:text-cyan-600"
                        : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    Episodes
                  </li>
                  <li
                    onClick={() => {
                      showEpisodeVideo(Tv.id, activeSeasonTab);
                    }}
                    className={`${
                      activeHeaderTab ? "text-cyan-500 dark:text-cyan-600" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    Videos
                  </li>
                </ul>
                {(EpisodeDisplay || EpisodeVideosDisplay)  && (
                  <ion-icon onClick={()=> {setEpisodeDisplay(false); setEpisodeHeader(false); setEpisodeVideosDisplay(false);}} style={{ cursor: "pointer" }} name="close-outline" size="large"></ion-icon>
                )}
              </div>
            )}
            {EpisodeVideosDisplay && (
              EpisodeVideos.length > 0 ? (
                <div className={`${styles.boxWidth}`}>
                  <div className="justify-center">
                    <Splide options={splideOptions}>
                      {EpisodeVideos.map((video) => (
                        <SplideSlide key={video.key} style={{ padding: "20px" }}>
                          <Youtube
                            videoId={video.key}
                            className={"youtube amru videos"}
                            containerClassName={"youtube-container amru"}
                            opts={{
                              playerVars: {
                                autoplay: 0,
                                controls: 0,
                                cc_load_policy: 0,
                                fs: 0,
                                iv_load_policy: 0,
                                modestbranding: 0,
                                rel: 0,
                                showinfo: 0,
                              },
                            }}
                          />
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>
                </div>
              ) : (
                <div className={`${styles.heading4} ${styles.boxWidth} flex px-12 py-6`}>No Videos !</div>
              )
            )}
            <div>
              {EpisodeDisplay && selectedSeason && Episodes && (
                <div className={`${styles.boxWidth} flex p-8 flex-col w-full`}>
                  {Episodes.episodes
                    .slice(0, visibleEpisodes)
                    .map((episode) => (
                      <Link
                        to={
                          "/tv/" +
                          Tv.id +
                          "/" +
                          episode.season_number +
                          "/" +
                          episode.episode_number +
                          "/" +
                          episode.name
                        }
                      >
                        <div className="flex flex-col mb-12 sm:mb-8">
                          <div className="flex flex-row gap-8">
                            <div
                              className="flex w-2/6 sm:w-1/4"
                              style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${
                                  episode.still_path ??
                                  `https://image.tmdb.org/t/p/w500${Episodes.poster_path}`
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
                                {episode.name}
                              </h2>
                              <div className="flex flex-row font-semibold text-center items-center pt-1 sm:pt-2">
                              {episode.episode_number && (
                                episode.season_number === 0 ? (
                                  <span>E{episode.episode_number}</span>
                                ) : (
                                  <>
                                    <span>S{episode.season_number}&nbsp;</span>
                                    <span>E{episode.episode_number}</span>
                                  </>
                                ))}
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
                                  <span>
                                    {Math.floor(episode.runtime % 60)}m
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-dimWhite pt-1 sm:pt-2">
                                {episode.overview}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
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
