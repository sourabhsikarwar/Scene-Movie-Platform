import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";
import Card from "./Cards/Card";
import styles from "../style"

function Movies(props) {
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

  const [fav, setFav] = useState([]);

  const saveData = () => {
    let favData = JSON.parse(localStorage.getItem("imdb")) || [];
    setFav([...favData]);
  }

  useEffect(function () {
    const upload = async () => {
      await axios
      .get(
        `https://api.themoviedb.org/3/discover/${props.content}?api_key=ebf3974135e4e887c96fc16d0e3024b1&with_genres=${props.id}&page=${page}`
      )
      .then((res) => {
        setMovies(res.data.results);
        saveData();
      })
      .catch( (e) => {
        console.log(e);
      });
    }
    upload()
  }, [page, props]);

  // const add = (movie) => {
  //   let newArray = [...fav, movie];
  //   setFav([...newArray]);
  //   localStorage.setItem("imdb", JSON.stringify(newArray));
  // };

  // const del = (movie) => {
  //   const newArray = fav.filter((m) => m.id !== movie.id);
  //    setFav([...newArray]);
  //   localStorage.setItem("imdb", JSON.stringify(newArray));
  // };

  return (
    <>
      <div className={`${styles.boxWidth} my-8`}>
        <div className={`${styles.heading2} w-full my-2 sm:mx-2 text-center sm:text-left`}>
          {props.title}
        </div>
        {Movies.length === 0 ? (
          <div className="flex justify-center m-8">
            <Oval
              height="50"
              width="50"
              color="grey"
              secondaryColor="grey"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <div className="flex sm:justify-between justify-center flex-wrap my-4 mx-auto">
            {Movies.map((movie) => {
              return (
                <Card movie={movie}/>
              );
            })}
          </div>
        )}
      </div>
      <Pagination page={page} goBack={goBack} goNext={goNext} />
    </>
  );
}

export default Movies;
