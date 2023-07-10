import axios from "axios";
import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import styles from "../../style";
// for star rating convert number into star
import Star from "../SingleMovieCast/Star";
//  format price is used to format country currency
import { useParams } from "react-router-dom";

const MovieBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";
  const { tvId, title } = useParams();
  const [Tv, setTv] = useState({});

  const [initialLoading, setInitialLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
  }, [tvId]);

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
        <section
          className="relative text-gray-600 body-font overflow-hidden bg-[#656565cf] bg-blend-multiply"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              Tv.backdrop_path ? Tv.backdrop_path : Tv.poster_path
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          key={Tv.id}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div
            className={`${styles.boxWidth} px-4 py-8 mx-auto lg:h-screen h-full flex items-center relative z-10`}
          >
            <div className="mx-auto flex flex-wrap flex-row">
              <div className="m-auto w-2/3 h-full sm:w-2/4 md:w-1/4 my-[1%] bg-gray-200 rounded shadow-md">
                <img
                  alt={`${Tv.poster_path}`}
                  className="w-full h-full object-cover object-center rounded"
                  src={`https://image.tmdb.org/t/p/original/${Tv.poster_path}`}
                  loading="lazy"
                />
              </div>{" "}
              <div className="py-3 lg:py-4 flex flex-col items-center md:items-start md:w-2/3 mx-auto">
                <h1
                  className={`${styles.heading2} font-extrabold text-center md:text-left`}
                >
                  {Tv.name}
                </h1>
                <Star stars={Tv.vote_average / 2} reviews={Tv.vote_count} />
                <div className="flex flex-row justify-between items-start text-gray-300 mt-3">
                  {Tv.first_air_date.split("-")[0]}
                  <span className="mx-2">|</span>
                  {Tv.spoken_languages[0].english_name}
                  <span className="mx-2">|</span>
                  {Tv.genres[0].name}
                </div>
                <div
                  className="my-3"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p
                    className={`${styles.paragraph} leading-4 sm:text-sm lg:text-base text-center md:text-left`}
                    style={{ marginRight: "10px" }}
                  >
                    Total Seasons: &nbsp;
                    <span style={{ fontWeight: "bold" }}>
                      {Tv.number_of_seasons}
                    </span>
                  </p>
                  <p
                    className={`${styles.paragraph} leading-4 sm:text-sm lg:text-base text-center md:text-left`}
                  >
                    Total Episodes: &nbsp;
                    <span style={{ fontWeight: "bold" }}>
                      {Tv.number_of_episodes}
                    </span>
                  </p>
                </div>
                <p
                  className={`${styles.paragraph} leading-4 sm:text-sm lg:text-base text-center md:text-left`}
                >
                  {Tv.overview}
                </p>
              </div>
            </div>
          </div>
        </section>
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
