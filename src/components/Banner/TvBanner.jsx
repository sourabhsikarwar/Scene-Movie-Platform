import axios from "axios";
import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import { Oval } from "react-loader-spinner";
// for star rating convert number into star
import Star from "../SingleMovieCast/Star";
//  format price is used to format country currency
import FormatPrice from "../SingleMovieCast/FormatPrice";
import "../SingleMovieCast/style.css";
import { useParams } from "react-router-dom";

const MovieBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";
  const { tvId, title } = useParams();
  const [playing, setPlaying] = useState(false);
  const [Tv, setTv] = useState({});

  const [trailer, setTrailer] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;
  const totalMinutes = Tv.runtime;

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
  const handleTrailer = async () => {
    setInitialLoading(true);
    const { data } = await axios.get(`${MOVIE_API}/tv/${props?.id}`, {
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
      {!initialLoading ? (
        <section className="container movie-container" key={Tv.id}>
          <div className="grid grid-two-column">
            <div className="product_image">
              <img
                width={"60%"}
                className=" object-cover object-center rounded  pt-10"
                src={`https://image.tmdb.org/t/p/original/${Tv.poster_path}`}
                alt={Tv.title}
              />
            </div>
            <div className="product-data">
              <h2>{Tv.name}</h2> {console.log("data in tv", Tv)}
              <Star stars={Tv.vote_average / 2} reviews={Tv.vote_count} />
              <p className="product-data-price product-data-real-price">
                Release :{" "}
                {Tv.first_air_date.toString().split("-").reverse().join("-")}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ marginRight: "10px" }}>
                  Total Seasons: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {Tv.number_of_seasons}
                  </span>
                </p>
                <p>
                  Total Episodes: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {Tv.number_of_episodes}
                  </span>
                </p>
                {/* <p>Episode Duration &nbsp;
                    <span style={{fontWeight: "bold"}}>{Math.floor(Tv.episode_run_time / 60)} h&nbsp; {Math.floor(Tv.episode_run_time % 60)}</span>
                  </p> */}
              </div>
              <p>{Tv.overview}</p>
              <div className="product-data-info">
                <p>
                  Languages :
                  {Tv.spoken_languages.map((ele) => (
                    <span>{ele.english_name} </span>
                  ))}
                </p>
                <p>
                  Genres :{" "}
                  {Tv.genres.map((ele) => (
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
                    // onClick={handleTrailer}
                    className="flex bg-blue-gradient text-black border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
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
