import axios from "axios";
import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import { Oval } from "react-loader-spinner";
import Star from "../SingleMovieCast/Star";
import FormatPrice from "../SingleMovieCast/FormatPrice";
import "../SingleMovieCast/style.css";
const MovieBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";

  const [playing, setPlaying] = useState(false);
  const [Movies, setMovies] = useState({});

  const [trailer, setTrailer] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    update();
  }, []);

  const update = async () => {
    setInitialLoading(true);
    await axios
      .get(`${MOVIE_API}/movie/${props.id}?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        const mResults = res.data;
        setMovies(mResults);
        setInitialLoading(false);
      });
  };
  const handleTrailer = async () => {
    setInitialLoading(true);
    const { data } = await axios.get(`${MOVIE_API}/movie/${props?.id}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
      setPlaying(true);
    }

    // setMovie(data)
    setInitialLoading(false);
  };

  return (
    <>
      <section
        className="text-gray-600 body-font overflow-hidden bg-[#656565cf] bg-blend-multiply"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></section>
      {!initialLoading ? (
        <section>
          <div className="container movie-container">
            <div className="grid grid-two-column">
              <div className="product_image">
                <img
                  width={'60%'}
                  className=" object-cover object-center rounded  pt-10"
                  src={`https://image.tmdb.org/t/p/original/${Movies.poster_path}`}
                  alt={Movies.title}
                />
              </div>
              <div className="product-data">
                <h2>{Movies.title}</h2>
                <Star
                  stars={Movies.vote_average / 2}
                  reviews={Movies.vote_count}
                />
                <p className="product-data-price">
                  Revenue :  <FormatPrice price={Movies.revenue} />
                </p>
                <p className="product-data-price product-data-real-price">
                 Release : {(Movies.release_date).toString().split('-').reverse().join('-')}
                </p>
                <p>{Movies.overview}</p>

                <div className="product-data-info">
                  <p>
                    Available :
                    {Movies.production_countries.map((ele) => (
                      <span>{ele.name} </span>
                    ))}
                  </p>
                  <p>
                    Languages :
                    {Movies.spoken_languages.map((ele) => (
                      <span>{ele.english_name} </span>
                    ))}
                  </p>
                  <p>
                    Genres :{" "}
                    {Movies.genres.map((ele) => (
                      <span>{ele.name} </span>
                    ))}
                  </p>
                </div>

                <hr />
                {playing ? (
                  <div className="mx-auto">
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
                    <div className="flex my-4">
                      <button
                        onClick={handleTrailer}
                        className="flex bg-blue-gradient text-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      >
                        Watch
                      </button>
                      <button className="rounded-full w-10 h-10 bg-white hover:bg-gray-100 duration-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                        <ion-icon name="heart"></ion-icon>
                      </button>
                    </div>
                  
                )}
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
