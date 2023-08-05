import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import "../SingleMovieCast/style.css";
import { useParams } from "react-router-dom";
import fetchData from "../../helper/fetchData";
import styles from "../../style";
import axios from "axios";
import Details from "./Details";
import CommonBanner from "./CommonBanner";
import { Splide } from "@splidejs/react-splide";
import { SplideSlide } from "@splidejs/react-splide";
import Youtube from "react-youtube";


const MovieBanner = (props) => {
  const { movieId, title } = useParams();
  const [Movies, setMovies] = useState({});
  const [Videos, setVideos] = useState({});
  const [Images, setImages] = useState({});
  const [reviews, setReviews] = useState({});
  const [expandedReviews, setExpandedReviews] = useState({});
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [activeTab, setActiveTab] = useState("details");

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

  useEffect(() => {
    window.scrollTo(0, 0);
    getImages();
  }, [movieId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getVideos();
  }, [movieId]);

  const getVideos = async () => {
    setInitialLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
      );
      // Filter videos based on type (Trailer, Teaser, Clip)
      const filteredVideos = response.data.results.filter(
        (video) =>
          video.type === "Trailer" ||
          video.type === "Teaser" ||
          // video.type === "Featurette" ||
          video.type === "Clip"
      );
      setVideos(filteredVideos);
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

  const getImages = async () => {
    setInitialLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
      );
      setImages(response.data.backdrops);
    } catch (error) {
      console.log(error);
    }
  };

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


  return (
    <>
      {!initialLoading ? (
        <>
          <CommonBanner type="movie" content={Movies} movieId={movieId} />
          {/* details/review header */}
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
                  <li
                    className={`cursor-pointer ${
                      activeTab === "snapshots"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    }hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                    onClick={() => handleTabClick("snapshots")}
                  >
                    Snapshots
                  </li>
                  <li
                    className={`cursor-pointer ${
                      activeTab === "videos"
                        ? "border-b-2 border-slate-900 dark:border-white"
                        : ""
                    }hover:border-b-2 border-slate-900 dark:border-white hover:text-gray-600 dark:hover:text-gray-400 duration-75`}
                    onClick={() => handleTabClick("videos")}
                  >
                    Videos
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {activeTab === "details" && (
            <Details type="movie" title="details" Movies={Movies} />
          )}
          {activeTab === "reviews" && (
            <Details
              title="reviews"
              visibleReviews={visibleReviews}
              expandedReviews={expandedReviews}
              handleToggleExpand={handleToggleExpand}
              handleToggleVisibleReviews={handleToggleVisibleReviews}
              reviews={reviews}
            />
          )}
          {activeTab === "snapshots" && (
            <Details title="snapshots" Images={Images} />
          )}

          {activeTab === "videos" ? (
            <section
              className={`${styles.boxWidth} dark:bg-primary dark:text-white py-8`}
            >
              <h2
                className={`${styles.heading3} mx-4 text-gray-900 dark:text-white`}
              >
                Videos
              </h2>
              <div className="justify-center">
                <Splide options={splideOptions}>
                  {Videos.slice(0, 10).map((video) => (
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
