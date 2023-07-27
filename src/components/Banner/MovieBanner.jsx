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

const MovieBanner = (props) => {
  const { movieId, title } = useParams();
  const [playing, setPlaying] = useState(false);
  const [Movies, setMovies] = useState({});
  const [reviews, setReviews] = useState({});
  const [expandedReviews, setExpandedReviews] = useState({});
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [activeTab, setActiveTab] = useState("details");

  const [trailer, setTrailer] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
  }, [movieId]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getreviews();
  }, [movieId]);

  const getreviews = async () => {
    setInitialLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
      );
      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

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
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const isValidURL = (url) => {
    return url.startsWith("https://") || url.startsWith("http://");
  };

  return (
    <>
      {!initialLoading ? (
        <>
          <section className="relative block section-movie-banner dark:bg-primary p-0 text-gray-600 body-font overflow-hidden bg-blend-multiply">
            <div className="hidden sm:block absolute inset-0 bg-black opacity-40"></div>
            <div className="flex flex-row relative w-full main-container">
              <div
                className={`${styles.boxWidth} flex info-container items-start mx-0 lg:h-screen h-full relative`}
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
                      <div className="text-black dark:text-white font-normal text-base">
                        {Movies.release_date.split("-")[0]}
                        <span className="mx-2">|</span>
                        {Movies.genres[0].name}
                        <span className="mx-2">|</span>
                        {Math.floor(Movies.runtime / 60)}h&nbsp;
                        {Math.floor(Movies.runtime % 60)}m
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
            <div className="details-navigation-container pl-6 text-lg">
              <div className="details-navigation">
                <ul className="flex gap-4">
                  <li
                    onClick={() => handleTabClick("details")}
                    style={{ cursor: "pointer", transitionDuration: "75ms" }}
                    className={`cursor-pointer ${
                      activeTab === "details"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    } hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                  >
                    Details
                  </li>
                  <li
                    className={`cursor-pointer ${
                      activeTab === "reviews"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    }hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Reviews
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {activeTab === "details" ? (
            <section
              className={`${styles.boxWidth} dark:bg-primary dark:text-white pt-8`}
            >
              <div className="flex justify-between items-center px-4">
                <h2
                  className={`${styles.heading3} text-gray-900 dark:text-white`}
                >
                  More Details
                </h2>
              </div>
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
          ) : (
            ""
          )}
          {activeTab === "reviews" ? (
            <section
              className={`${styles.boxWidth} dark:bg-primary dark:text-white py-8`}
            >
              <div className="reviews-container px-16">
                {" "}
                {!reviews.length ? (
                  <h2>No reviews</h2>
                ) : (
                  <>
                    {reviews.slice(0, visibleReviews).map((review) => (
                      <div className="flex flex-col mb-6">
                        <div className="review-header flex flex-row justify-between pb-4">
                          <div className="flex gap-3 items-center">
                            {review.author_details.avatar_path &&
                            isValidURL(
                              review.author_details.avatar_path.substring(1)
                            ) ? (
                              <img
                                alt="review author pic"
                                src={review.author_details.avatar_path.substring(
                                  1
                                )}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-8 h-8"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            )}
                            <span className="font-semibold text-xl">
                              {review.author}
                            </span>
                          </div>
                          {review.author_details.rating ? (
                            <div className="flex flex-row items-center gap-4 justify-start">
                              <svg
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-amber-500"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                              {review.author_details.rating}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <p className="review-para text-gray-600 dark:text-gray-400 px-4">
                          {expandedReviews[review.id]
                            ? review.content
                            : review.content.slice(0, 200) + " ....."}
                          <button
                            onClick={() => handleToggleExpand(review.id)}
                            className="text-sky-500 pl-2"
                          >
                            {expandedReviews[review.id]
                              ? "Read Less"
                              : "Read More"}
                          </button>
                        </p>
                      </div>
                    ))}

                    {reviews.length > 4 && (
                      <div className="see-more-less-container flex items-center justify-center mt-5">
                        <button
                          onClick={handleToggleVisibleReviews}
                          className="flex border-2 rounded-3xl py-2 px-4 border-sky-700 text-sky-700 dark:border-sky-700	dark:text-sky-500	"
                          style={{}}
                        >
                          {visibleReviews === 4 ? "See More" : "See Less"}
                        </button>
                      </div>
                    )}
                  </>
                )}
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

export default MovieBanner;
