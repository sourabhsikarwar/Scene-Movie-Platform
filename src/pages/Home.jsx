import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import Trending from "../components/Carousel/Trending";
import Search from "../components/Search";
import { Oval } from "react-loader-spinner";

const Home = () => {
  const [genreMovie, setGenreMovie] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const apiKey = process.env.REACT_APP_API_KEY;

  const uploadMovie = async () => {
    setInitialLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        if (res.status === 200) {
          setGenreMovie(res.data.genres);
          setInitialLoading(false);
        }
      })
      .catch((e) => {
        return e.message;
      });
  };

  useEffect(() => {
    uploadMovie();
  }, []);

  return (
    <div className="bg-gray-200 text-gray-900 dark:bg-primary dark:text-dimWhite">
      {!initialLoading ? (
        <div>
          <Banner />
          <Search />
          <Trending
            title="Trending"
            id="1"
          />
          {genreMovie &&
            genreMovie.map((item) => {
              return (
                <Trending
                  title={item.name}
                  id={item.id}
                  key={item.id}
                />
              );
            })}
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
