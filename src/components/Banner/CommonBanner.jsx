import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import styles from "../../style";
import fetchData from "../../helper/fetchData";
import axios from "axios";

const CommonBanner = (props) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [tvPlaying, setTvPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  // Function to toggle the content visibility
  const toggleContentOverview = () => {
    setShowFullContent(!showFullContent);
  };
  const [contentRating, setContentRating] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    getContentRatings();
  }, [props.content.id]);

  const getContentRatings = async () => {
    setInitialLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${props.content.id}/content_ratings?api_key=${apiKey}`
      );
      setContentRating(response.data.results);
      setInitialLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTvTrailer = async () => {
    setInitialLoading(true);
    setTvPlaying(true);
    setInitialLoading(false);
  };

  const handleTrailer = async () => {
    setInitialLoading(true);
    try {
      const { data } = await fetchData(`trailer/id/${props.movieId}`, 1);
      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : data.videos.results[0]);
        setPlaying(true);
      }
      setInitialLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
              padding: "16px 32px 64px 0",
              zIndex: "2",
            }}
          >
            <div className="info-container-inner sm:flex flex-wrap flex-row">
              <div className="py-3 sm:pt-12 w-full pl-8 sm:mt-10 md:pt-14 flex flex-col sm:items-start mx-0">
                <h1
                  className={`${styles.heading2} sm:text-white  sm:pl-0 md:text-5xl mb-3 md:mb-5 font-bold sm:font-extrabold text-left`}
                >
                  {props.type === "movie"
                    ? props.content.title
                    : props.content.name}
                </h1>
                {props.type === "movie" ? (
                  <>
                    <div className="flex mb-3 md:mb-5 sm:pl-0">
                      <span className="flex items-center lg:mx-0">
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          W="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          W="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span className="ml-3 text-black sm:text-white text-base md:text-lg lg:text-xl dark:text-white">
                          4 Reviews
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-row justify-between items-start md:text-lg lg:text-xl text-gray-300 mb-1">
                      <div className="text-black sm:text-white dark:text-white mb-3 md:mb-4">
                        {props.content.release_date.split("-")[0]}
                        <span className="mx-2">|</span>
                        {props.content.genres[0].name}
                        {props.content.runtime ? (
                          <>
                            <span className="mx-2">|</span>
                            {Math.floor(props.content.runtime / 60)}h&nbsp;
                            {Math.floor(props.content.runtime % 60)}m
                          </>
                        ):("")}
                      </div>
                    </div>
                    {playing ? (
                      <div className="trailer-container sm:pl-0">
                        <Youtube
                          videoId={trailer.key}
                          className={"youtube amru"}
                          containerClassName={"youtube-container amru"}
                          opts={{
                            playerVars: {
                              autoplay: 1,
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
                        <button
                          onClick={() => setPlaying(false)}
                          className={"button close-video"}
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <>
                        <p
                          className={`text-black sm:text-white sm:pl-0 mb-3 sm:mb-1 dark:text-white font-light leading-5 text-base md:text-lg lg:text-xl text-left`}
                        >
                          {showFullContent ||
                          props.content.overview.length < 200
                            ? props.content.overview
                            : props.content.overview.slice(0, 250) + " ..... "}
                          {props.content.overview.length > 250 &&
                            (showFullContent ? (
                              <button
                                className="text-zinc-500 font-medium"
                                onClick={toggleContentOverview}
                              >
                                &nbsp;read less
                              </button>
                            ) : (
                              <button
                                className="text-zinc-500 font-medium"
                                onClick={toggleContentOverview}
                              >
                                &nbsp;read more
                              </button>
                            ))}
                          {/* {props.content.overview} */}
                        </p>
                        <div className="flex my-4 sm:pl-0">
                          <button
                            onClick={handleTrailer}
                            className="flex bg-blue-gradient text-black border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
                          >
                            Watch
                          </button>
                          <button className="rounded-full w-10 h-10 bg-white hover:bg-gray-100 duration-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                            <ion-icon name="heart"></ion-icon>
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex flex-col justify-between items-start md:text-lg lg:text-xl text-gray-300 mb-1">
                      <div className="text-black sm:text-white dark:text-white mb-3 md:mb-4">
                        {props.content.first_air_date ? (
                          <>
                            {props.content.first_air_date.split("-")[0]}
                            <span className="mx-2">|</span>
                          </>
                        ):("")}
                        {props.content.genres[0].name}
                        <span className="mx-2">|</span>
                        {Math.floor(props.content.vote_average % 10)} / 10
                      </div>
                      <div className="text-black sm:text-white dark:text-white mb-2 md:mb-4">
                        Content Rating:&nbsp;
                        {contentRating &&
                          contentRating.length >= 6 &&
                          contentRating.slice(0, 5).map((ratings, index) => (
                            <span className="dark:text-dimWhite text-gray-900 sm:text-dimWhite opacity-70 dark:opacity-70">
                              {ratings.rating}
                              {index !== 4 && <span>,&nbsp;</span>}
                            </span>
                          ))}
                        {contentRating &&
                          contentRating.length < 6 &&
                          contentRating.map((ratings, index) => (
                            <span className="dark:text-dimWhite text-gray-900 sm:text-dimWhite opacity-70 dark:opacity-70">
                              {ratings.rating}
                              {index !== contentRating.length - 1 && (
                                <span>,&nbsp;</span>
                              )}
                            </span>
                          ))}
                      </div>
                      {props.contentRating ? (
                        <div className="text-black sm:text-white dark:text-white mb-2 md:mb-4">
                          Content Rating:&nbsp;
                          {contentRating &&
                            contentRating.length >= 6 &&
                            contentRating.slice(0, 5).map((ratings, index) => (
                              <span>
                                {ratings.rating}
                                {index !== 4 && <span>,&nbsp;</span>}
                              </span>
                            ))}
                          {contentRating &&
                            contentRating.length < 6 &&
                            contentRating.map((ratings, index) => (
                              <span>
                                {ratings.rating}
                                {index !== contentRating.length - 1 && (
                                  <span>,&nbsp;</span>
                                )}
                              </span>
                            ))}
                        </div>
                      ):("")}
                      <div className="text-black sm:text-white dark:text-white mb-2 md:mb-4">
                        Seasons:&nbsp;
                        <span className="dark:text-dimWhite text-gray-900 sm:text-dimWhite opacity-70 dark:opacity-70">
                          {props.content.number_of_seasons}
                        </span>
                        <span className="mx-2">|</span>
                        Episodes:&nbsp;
                        <span className="dark:text-dimWhite text-gray-900 sm:text-dimWhite opacity-70 dark:opacity-70">
                          {props.content.number_of_episodes}
                        </span>
                      </div>
                    </div>
                    {tvPlaying ? (
                      <div className="trailer-container sm:pl-0">
                        <Youtube
                          videoId={props.tvTrailer.key}
                          className={"youtube amru"}
                          containerClassName={"youtube-container amru"}
                          opts={{
                            playerVars: {
                              autoplay: 1,
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
                        <button
                          onClick={() => setTvPlaying(false)}
                          className={"button close-video"}
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <>
                        <p
                          className={`text-black sm:text-white mb-3 sm:mb-1 dark:text-white font-light leading-5 text-base md:text-lg lg:text-xl text-left`}
                        >
                          {showFullContent ||
                          props.content.overview.length < 200
                            ? props.content.overview
                            : props.content.overview.slice(0, 250) + " ..... "}
                          {props.content.overview.length > 250 &&
                            (showFullContent ? (
                              <button
                                className="text-zinc-500 font-medium"
                                onClick={toggleContentOverview}
                              >
                                &nbsp;read less
                              </button>
                            ) : (
                              <button
                                className="text-zinc-500 font-medium"
                                onClick={toggleContentOverview}
                              >
                                &nbsp;read more
                              </button>
                            ))}
                        </p>
                        {props.tvTrailer && (
                          <div className="flex my-4 sm:pl-0">
                            <button
                              onClick={handleTvTrailer}
                              className="flex bg-blue-gradient text-black border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
                            >
                              Watch
                            </button>
                            <button className="rounded-full w-10 h-10 bg-white hover:bg-gray-100 duration-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                              <ion-icon name="heart"></ion-icon>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex img-container-outer">
            <div
              className="block img-container"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.content.backdrop_path})`,
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
    </>
  );
};

export default CommonBanner;
