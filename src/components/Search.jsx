import React, { useEffect, useState } from "react";
import styles from "../style";
import Card from "./Cards/Card";
import axios from "axios";

const Search = () => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [query, setQuery] = useState("");
  const [Movies, setMovies] = useState([]);

  const getSearchedMovies = async (url) => {
    try {
      let res = await axios.get(url);
      setMovies(res.data.results.splice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      const timeOut = setTimeout(() => {
        getSearchedMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`);

      }, 600)

      return () => clearTimeout(timeOut);
    }
    , [query, apiKey]
  );

  return (
    <div className={`${styles.boxWidth} px-4 my-8`}>
      <div className="flex gap-8 items-center">
        <h1 className="text-2xl text-white">Search: </h1>
        <input type="search" placeholder="Search" onChange={e => setQuery(e.target.value)} className="rounded border-none ring-1 ring-blue-300 outline-none" />
      </div>
      {query && <div className={`${styles.boxWidth} my-8`}>
        <div
          className={`text-2xl text-white w-full my-2 sm:mx-2 text-center sm:text-left`}
        >
          Showing results for {query}
        </div>
        {Movies.length === 0 ? (
          <div className="flex justify-center m-8 text-white text-2xl">
            No result Found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 justify-center my-4 mx-auto">
            {Movies.map((movie) => {
              return <Card movie={movie} />;
            })}
          </div>
        )}
      </div>}
    </div>
  );
};

export default Search;
