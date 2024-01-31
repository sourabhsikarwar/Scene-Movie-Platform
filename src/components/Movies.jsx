import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";
import Card from "./Cards/Card";
import styles from "../style";

function Movies(props) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [Movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const goBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const goNext = () => {
    setPage(page + 1);
  };

  useEffect(
    function () {
      const upload = async () => {
        await axios
          .get(
            `https://api.themoviedb.org/3/discover/${props.content}?api_key=${apiKey}&with_genres=${props.id}&page=${page}`
          )
          .then((res) => {
            setMovies(res.data.results);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      upload();
    },
    [page, props, apiKey]
  );

  return (
    <>
      <div className={`${styles.boxWidth} my-8`}>
        <div
          className={`${styles.heading2} w-full my-2 ml-0 px-4 text-center sm:text-left`}
        >
          {props.title}
        </div>
        {Movies.length === 0 ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-4 border-cyan-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:justify-between justify-center flex-wrap my-4 mx-auto">
            {Movies.map((movie) => {
              return <Card movie={movie} />;
            })}
          </div>
        )}
      </div>
      <Pagination page={page} goBack={goBack} goNext={goNext} />
    </>
  );
}

export default Movies;
