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

const MovieBanner = (props) => {
  const { movieId, title } = useParams();
  const [playing, setPlaying] = useState(false);
  const [Movies, setMovies] = useState({});

  const [trailer, setTrailer] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
  }, [movieId]);

  const update = async () => {
    setInitialLoading(true);
    try {
      const response = await fetchData(`movie-banner/movie/${movieId}`, 1);
      if (response.success) {
        setMovies(response.data);
        setInitialLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTrailer = async () => {
    setInitialLoading(true);
    try {
      const { data } = await fetchData(`trailer/id/${movieId}`, 1);
      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : data.videos.results[0]);
        setPlaying(true);
      }

      // setMovie(data)
      setInitialLoading(false);
    } catch (error) {
      console.log(error);
    }
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
                  padding: "16px 32px 64px 0",
                  zIndex: "2",
                }}
              >
                <div className="info-container-inner sm:flex flex-wrap flex-row">
                  <div className="py-3 sm:pt-12 w-full sm:pl-8 sm:mt-10 md:pt-14 flex flex-col sm:items-start mx-0">
                    <h1
                      className={`${styles.heading2} sm:text-white pl-4 sm:pl-0 md:text-5xl mb-3 md:mb-5 font-bold sm:font-extrabold text-left`}
                    >
                      {Movies.title}
                    </h1>
                    <div className="flex mb-3 md:mb-5 pl-8 sm:pl-0">
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
                    <div className="hidden sm:flex flex-row justify-between items-start md:text-lg lg:text-xl text-gray-300 mb-1">
                      <div className="text-gray-300 mb-3 md:mb-4">
                        {Movies.release_date.split("-")[0]}
                      </div>
                      <span className="mx-2">|</span>
                      {Movies.genres[0].name}
                      <span className="mx-2">|</span>
                      {Math.floor(Movies.runtime / 60)}h&nbsp;
                      {Math.floor(Movies.runtime % 60)}m
                    </div>
                    <div className="flex pl-8 sm:hidden flex-col justify-between items-start text-gray-300 mb-3">
                      <div className="text-gray-300 mb-3">
                        <span className="text-black dark:text-white font-medium text-base">
                          Release Date:&nbsp;&nbsp;
                        </span>
                        <span className="text-black dark:text-dimWhite text-base">
                          {Movies.release_date}
                        </span>
                      </div>
                      <div>
                        <span className="text-black dark:text-white font-medium text-base">
                          Genres:&nbsp;&nbsp;
                        </span>
                        <span className="text-black dark:text-dimWhite text-base  ">
                          {Movies.genres.map((genre) => genre.name).join(" | ")}
                        </span>
                      </div>
                    </div>
                    {playing ? (
                      <div className="trailer-container pl-8 sm:pl-0">
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
                          className={`text-black sm:text-white pl-8 sm:pl-0 mb-3 sm:mb-1 dark:text-white font-light leading-5 text-base md:text-lg lg:text-xl text-left`}
                        >
                          {Movies.overview}
                        </p>
                        <div className="flex my-4 pl-8 sm:pl-0">
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
                  </div>
                </div>
              </div>
              <div className="flex img-container-outer">
                <div
                  className="block img-container"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})`,
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
            className={`${styles.boxWidth} dark:bg-primary dark:text-white py-8`}
          >
            <div className="flex justify-between items-center px-4">
              <h2
                className={`${styles.heading3} text-gray-900 dark:text-white`}
              >
                More Details
              </h2>
            </div>
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:justify-between justify-center flex-wrap my-4 mx-auto px-8"> */}
            <div className="flex flex-wrap gap-0 max-md:justify-between  my-4 mx-auto px-8">
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Status</div>
                <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                  {Movies.status}
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Release Date</div>
                <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                  {/* {Movies.release_date} */}
                  {Movies.release_date
                    .toString()
                    .split("-")
                    .reverse()
                    .join("-")}
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Duration</div>
                <div className="flex flex-wrap">
                  <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                    {Math.floor(Movies.runtime / 60)}h&nbsp;
                    {Math.floor(Movies.runtime % 60)}m
                  </span>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 md:mt-5 mb-3">
                <div className="font-medium">Genres</div>
                <div className="flex flex-wrap">
                  {Movies.genres.map((genre, index) => (
                    <span
                      key={genre.id}
                      className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70"
                    >
                      {genre.name}
                      {index !== Movies.genres.length - 1 && (
                        <span>,&nbsp;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Ratings</div>
                <div className="flex flex-wrap">
                  <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                    {Movies.vote_average} / 10
                  </span>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 md:mt-5 mb-3">
                <div className="font-medium">Spoken Languages</div>
                <div className="flex flex-wrap">
                  {Movies.spoken_languages.map((lang, index) => (
                    <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                      {lang.english_name}
                      {index !== Movies.spoken_languages.length - 1 && (
                        <span>,&nbsp;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
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

export default MovieBanner;
