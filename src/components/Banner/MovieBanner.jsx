import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import "../SingleMovieCast/style.css";
import { useParams } from "react-router-dom";
import fetchData from "../../helper/fetchData";
import styles from "../../style";
import axios from "axios";
import Details from "./Details";
import CommonBanner from "./CommonBanner";

const MovieBanner = (props) => {
  const { movieId, title } = useParams();
  const [Movies, setMovies] = useState({});
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
