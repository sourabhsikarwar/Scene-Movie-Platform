import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import { Oval } from "react-loader-spinner";
import "../SingleMovieCast/style.css";
import { useParams } from "react-router-dom";
import styles from "../../style";
import axios from "axios";
import Details from "./Details";
import CommonBanner from "./CommonBanner";

const TvBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";
  const { tvId, title } = useParams();
  const [Tv, setTv] = useState({});
  const [reviews, setReviews] = useState({});
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [activeTab, setActiveTab] = useState("details");
  const apiKey = process.env.REACT_APP_API_KEY;

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
  }, [tvId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getreviews();
  }, [tvId]);

  const getreviews = async () => {
    setInitialLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvId}/reviews?api_key=${apiKey}`
      );
      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
          <CommonBanner type="tv" content={Tv} />
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
                </ul>
              </div>
            </div>
          </section>
          {activeTab === "details" && (
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
            </section>
          )}
          {activeTab === 'reviews' && (
            <Details title="reviews" visibleReviews={visibleReviews} expandedReviews={expandedReviews} handleToggleExpand={handleToggleExpand} handleToggleVisibleReviews={handleToggleVisibleReviews} reviews={reviews} />
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

export default TvBanner;
