import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";
import Card from "./Cards/Card";
import styles from "../style"

function Movies(props) {
  const [Movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const isMounted = useRef(true);
  const goBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const goNext = () => {
    setPage(page + 1);
  };

  const [Hover, setHover] = useState("");
  const [fav, setFav] = useState([]);

  const saveData = () => {
    let favData = JSON.parse(localStorage.getItem("imdb")) || [];
    setFav([...favData]);
  }

  const upload = async () => {
    await axios
    .get(
      props.title === 'search' 
      ? `https://api.themoviedb.org/3/search/company?api_key=ebf3974135e4e887c96fc16d0e3024b1&query=${props.query}&page=1`
      : `https://api.themoviedb.org/3/discover/${props.content}?api_key=ebf3974135e4e887c96fc16d0e3024b1&with_genres=${props.id}&page=${page}`
    )
    .then((res) => {
      setMovies(res.data.results);
      saveData();
    })
    .catch( (e) => {
      console.log(e);
    });
  }

  useEffect(function () {
    if(isMounted.current){
      upload();
    }
    return () => {
      isMounted.current = false
    }
  });

  const add = (movie) => {
    let newArray = [...fav, movie];
    setFav([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  const del = (movie) => {
    const newArray = fav.filter((m) => m.id !== movie.id);
     setFav([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  return (
    <>
      <div className={`${styles.boxWidth} my-8`}>
        <div className={`${styles.heading2} my-2 mx-2"`}>
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
          <div className="flex justify-between flex-wrap my-4 mx-auto">
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
