import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import Genre from "../components/Carousel/Genre";
import Trending from "../components/Carousel/Trending";
import Search from "../components/Search";
import { Oval } from "react-loader-spinner";
import fetchData from "../helper/fetchData";

const Home = () => {
  const [genreMovie, setGenreMovie] = useState([]);
  const [genreTv, setGenreTv] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;
  const [toggle, setToggle] = useState(false);
  const [showMovies, setshowMovies] = useState(true);
  const [showTvShows, setshowTvShows] = useState(false);

  const toggleContent = () => {
    setToggle(!toggle);
    setshowMovies(!showMovies);
    setshowTvShows(!showTvShows);
  };
  const uploadMovie = async () => {
    setInitialLoading(true);
    try {
      const response = await fetchData("get-all-genres", 1);
      //  console.log('response:', response.data)
      if (response.success) {
        setGenreMovie(response.data.genres);
        setInitialLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    uploadMovie();
  }, []);

  useEffect(() => {
    uploadTv();
  }, []);

  useEffect(() => {
    getAiringToday();
  }, []);

  const getAiringToday = async () => {
    setInitialLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        if (res.status === 200) {
          setAiringToday(res.data.results);
          setInitialLoading(false);
        }
      })
      .catch((e) => {
        return e.message;
      });
  };

  const uploadTv = async () => {
    setInitialLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        if (res.status === 200) {
          setGenreTv(res.data.genres);
          setInitialLoading(false);
        }
      })
      .catch((e) => {
        return e.message;
      });
  };


  return (
    <div className="bg-gray-200 text-gray-900 dark:bg-primary dark:text-dimWhite">
      {!initialLoading ? (
        <div>
          <Banner />
          <div className="flex flex-col relative items-start">
            <Search />
            <div className="content-toggle md:absolute flex flex-row gap-4 justify-end px-4 text-gray-900 my-4 md:mt-1">
              <span className="text-2xl dark:text-white font-normal">Movies</span>
              <div className="flex">
                <div className="relative">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="opacity-0 absolute flex justify-between items-center w-14 h-7 rounded-full p-1 z-10 cursor-pointer"
                    checked={toggle}
                    onChange={toggleContent}
                  />
                  <label
                    htmlFor="checkbox"
                    className="cursor-pointer flex justify-between items-center w-14 h-8 rounded-full relative p-1 bg-gray-400 dark:bg-gray-400 border"
                  >
                    <span
                      className={`bg-secondary opacity-60 absolute w-6 h-7 right-8 border-2 rounded-full transition-transform ${
                        !toggle ? "translate-x-8" : "translate-x-0"
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              <span className="text-2xl dark:text-white font-normal">TV Series</span>
            </div>
          </div>
          {showMovies && (
            <>
              <Trending title="Trending" id="1" type="movie" head="Movies" />
              <Genre title="Genres" id="1" />
              {genreMovie &&
                genreMovie.map((item, index) => {
                  return (
                    <Trending
                      title={item.name}
                      id={item.id}
                      key={index}
                      head=""
                      type="movie"
                    />
                  );
                })}
            </>
          )}
          {showTvShows && (
            <>
              <Trending title="Trending" id="1" type="tv" head="TV Shows" />
              <Trending title="Airing Today" type="airingtoday" data={airingToday} />
              {genreTv &&
                genreTv.map((item, index) => {
                  return (
                    <Trending
                      title={item.name}
                      id={item.id}
                      key={index}
                      head=""
                      type="tv"
                    />
                  );
                })}
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <Oval
            height="50"
            width="50"
            color="grey"
            secondaryColor="grey"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
