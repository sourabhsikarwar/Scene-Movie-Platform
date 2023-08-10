import React from "react";
import styles from "../../style";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Youtube from "react-youtube";

const Details = (props) => {
  const isValidURL = (url) => {
    return url.startsWith("https://") || url.startsWith("http://");
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

  return (
    <>
      {/* Details */}
      {props.title === "details" && (
        <section
          className={`w-full mx-auto dark:bg-primary dark:text-white pt-8`}
        >
          <div className={`${styles.boxWidth}`}>
          <div className="flex justify-between items-center px-8">
            <h2 className={`${styles.heading3} text-gray-900 dark:text-white`}>
              More Details
            </h2>
          </div>
          {props.type === "movie" ? (
            <div className="flex flex-wrap gap-0 max-md:justify-between  my-4 mx-auto px-8">
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Status</div>
                <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                  {props.Movies.status}
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Release Date</div>
                <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                  {props.Movies.release_date
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
                    {Math.floor(props.Movies.runtime / 60)}h&nbsp;
                    {Math.floor(props.Movies.runtime % 60)}m
                  </span>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 md:mt-5 mb-3">
                <div className="font-medium">Genres</div>
                <div className="flex flex-wrap">
                  {props.Movies.genres.map((genre, index) => (
                    <span
                      key={genre.id}
                      className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70"
                    >
                      {genre.name}
                      {index !== props.Movies.genres.length - 1 && (
                        <span>,&nbsp;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              {props.Movies.vote_average ? (
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Ratings</div>
                <div className="flex flex-wrap">
                  <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                    {props.Movies.vote_average} / 10
                  </span>
                </div>
              </div>
              ) : (
                ""
              )}
              <div className="w-1/2 lg:w-1/3 md:mt-5 mb-3">
                <div className="font-medium">Spoken Languages</div>
                <div className="flex flex-wrap">
                  {props.Movies.spoken_languages.map((lang, index) => (
                    <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                      {lang.english_name}
                      {index !== props.Movies.spoken_languages.length - 1 && (
                        <span>,&nbsp;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-0 max-md:justify-between  py-4 mx-auto px-8">
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Status</div>
                <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                  {props.Tv.status}
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Ratings</div>
                <div className="flex flex-wrap">
                  <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                    {props.Tv.vote_average} / 10
                  </span>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Total Seasons</div>
                <div className="flex flex-wrap">
                  <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                    {props.Tv.number_of_seasons}
                  </span>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 mb-3">
                <div className="font-medium">Total Episodes</div>
                <div className="flex flex-wrap">
                  <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-80">
                    {props.Tv.number_of_episodes}
                  </span>
                </div>
              </div>
              {props.Tv.first_air_date ? (
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">First Air Date</div>
                <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                  {props.Tv.first_air_date
                    .toString()
                    .split("-")
                    .reverse()
                    .join("-")}
                </div>
              </div>
              ):("")}
              {props.Tv.last_episode_to_air ? (
                <div className="w-1/2 lg:w-1/3 mb-3">
                  <div className="font-medium">Last Episode</div>
                  <div className="flex flex-wrap">
                    <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                      #{props.Tv.last_episode_to_air.episode_number} :{" "}
                      {props.Tv.last_episode_to_air.air_date
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
              {props.Tv.next_episode_to_air ? (
                <div className="w-1/2 lg:w-1/3 my-3">
                  <div className="font-medium">Next Episode</div>
                  <div className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                    #{props.Tv.next_episode_to_air.episode_number} :{" "}
                    {props.Tv.next_episode_to_air.air_date
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
                  {props.Tv.genres.map((genre, index) => (
                    <span
                      key={genre.id}
                      className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70"
                    >
                      {genre.name}
                      {index !== props.Tv.genres.length - 1 && (
                        <span>,&nbsp;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              {props.Tv.spoken_languages.length ? (
              <div className="w-1/2 lg:w-1/3 my-3">
                <div className="font-medium">Spoken Languages</div>
                <div className="flex flex-wrap">
                  {props.Tv.spoken_languages.map((lang, index) => (
                    <span className="dark:text-dimWhite text-gray-900 opacity-90 dark:opacity-70">
                      {lang.english_name}
                      {index !== props.Tv.spoken_languages.length - 1 && (
                        <span>,&nbsp;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              ):("")}
            </div>
          )}
          </div>
        </section>
      )}
      {/* Reviews */}
      {props.title === "reviews" && (
        <section
          className={`w-full mx-auto dark:bg-primary dark:text-white py-8`}
        >
          <div className={`${styles.boxWidth} reviews-container px-8`}>
            {" "}
            {!props.reviews.length ? (
              <h2
                className={`${styles.heading3} ${styles.boxWidth} px-6 text-gray-900 dark:text-white`}
              >
                No reviews !
              </h2>
            ) : (
              <>
                {props.reviews.slice(0, props.visibleReviews).map((review) => (
                  <div className="flex flex-col mb-6">
                    <div className="review-header flex flex-row justify-between pb-4">
                      <div className="flex gap-3 items-center">
                        {review.author_details.avatar_path &&
                        isValidURL(
                          review.author_details.avatar_path.substring(1)
                        ) ? (
                          <img
                            alt="review author pic"
                            src={review.author_details.avatar_path.substring(1)}
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
                      <div className="flex flex-row justify-between items-center gap-4">
                        {review.created_at && (
                          <span className="text-gray-600 dark:text-gray-400 text-xs items-center">
                            {new Date(review.created_at)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")}
                          </span>
                        )}
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
                    </div>
                    <p className="review-para text-gray-600 dark:text-gray-400 px-4">
                      {props.expandedReviews[review.id]
                        ? review.content
                        : review.content.slice(0, 200) + " ....."}
                      <button
                        onClick={() => props.handleToggleExpand(review.id)}
                        className="text-sky-500 pl-2"
                      >
                        {props.expandedReviews[review.id]
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    </p>
                  </div>
                ))}
                {props.reviews.length > 4 && (
                  <div className="see-more-less-container flex items-center justify-center mt-5">
                    <button
                      onClick={props.handleToggleVisibleReviews}
                      className="flex border-2 rounded-3xl py-2 px-4 border-sky-700 text-sky-700 dark:border-sky-700	dark:text-sky-500	"
                    >
                      {props.visibleReviews === 4 ? "See More" : "See Less"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}
      {/* Snapshots */}
      {props.title === "snapshots" && (
        <section
          className={`w-full mx-auto dark:bg-primary dark:text-white py-8`}
        >
          {!props.Images.length ? (
            <h2
              className={`${styles.heading3} ${styles.boxWidth} px-6 text-gray-900 dark:text-white`}
            >
              No Snapshots !
            </h2>
          ) : (
            <>
              <div className={`${styles.boxWidth}`}>
                <h2
                  className={`${styles.heading3} mx-4 text-gray-900 dark:text-white`}
                >
                  {props.type.charAt(0).toUpperCase() + props.type.slice(1)}{" "}
                  Snapshots
                </h2>
              </div>

              <div className={`${styles.boxWidth} justify-center`}>
                <Splide
                  options={{
                    type: "loop",
                    perPage: "4",
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
                  }}
                  aria-label="My Favorite Images"
                  className="justify-center"
                >
                  {props.Images.slice(0, 36).map((snapshot) => {
                    return (
                      <SplideSlide>
                        <div className="snapshots-outer-container p-4 h-[300px] w-11/12 sm:w-[330px] md:w-full relative  duration-200  rounded-[6px]">
                          <div
                            className="snapshots-container h-[300px] w-full"
                            style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${snapshot.file_path})`,
                              backgroundSize: "cover",
                              backgroundPositionX: "center",
                            }}
                          ></div>
                        </div>
                      </SplideSlide>
                    );
                  })}
                </Splide>
              </div>
            </>
          )}
        </section>
      )}
      {props.title === "video" && (
        <section
          className={`w-full mx-auto dark:bg-primary dark:text-white py-8`}
        >
          <h2
            className={`${styles.heading3} ${styles.boxWidth} px-4 text-gray-900 dark:text-white`}
          >
            Videos
          </h2>
          <div className={`justify-center ${styles.boxWidth}`}>
            <Splide options={splideOptions}>
              {props.videos.slice(0, 10).map((video) => (
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
      )}
    </>
  );
};

export default Details;
