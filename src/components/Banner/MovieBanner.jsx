import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../../style";
import Youtube from "react-youtube";
import { Oval } from "react-loader-spinner";

const MovieBanner = (props) => {
  const MOVIE_API = "https://api.themoviedb.org/3";

  const [playing, setPlaying] = useState(false);
  const [Movies, setMovies] = useState({});
  // const [movie, setMovie] = useState(null)
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
      >
        {!initialLoading ? (
          <div
            className={`${styles.boxWidth} px-4 py-8 mx-auto lg:h-screen h-full flex items-center`}
          >
            <div className="mx-auto flex flex-wrap flex-col lg:flex-row">
              <div className="m-auto w-2/3 h-full sm:w-2/4 md:w-1/4 my-[5%] bg-gray-200 rounded shadow-md">
                <img
                  alt={`${Movies.poster_path}`}
                  className="w-full h-full object-cover object-center rounded"
                  src={`https://image.tmdb.org/t/p/original/${Movies.poster_path}`} loading='lazy'
                />
              </div>
              <div className="lg:py-0 items-center mx-auto">
                <h1
                  className={`${styles.heading2} font-extrabold text-center lg:text-left`}
                >
                  {Movies.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center mx-auto lg:mx-0">
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
                    <span className="text-gray-300 ml-3">4 Reviews</span>
                  </span>
                </div>
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
                  <>
                    <p className={`${styles.paragraph}`}>{Movies.overview}</p>
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
                  </>
                )}
              </div>
            </div>
          </div>
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
      </section>
    </>
  );
};

export default MovieBanner;
