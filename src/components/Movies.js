import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

function Movies() {
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
      `https://api.themoviedb.org/3/trending/movie/day?api_key=ebf3974135e4e887c96fc16d0e3024b1&page=${page}`
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
      <div className="container-xl mx-auto items-center">
        <div className="flex justify-center mt-8 font-medium text-3xl">
          Trending Movies
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
          <div className="flex justify-center flex-wrap my-8">
            {Movies.map((movie) => {
              return (
                <div
                  className="flex m-4 bg-gray-200"
                  onMouseEnter={() => setHover(movie.id)}
                  onMouseLeave={() => setHover("")}
                  key={movie.id}
                >
                  <div
                    className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.poster_path})] h-[350px] md:h-[280px] w-[250px] md:w-[220px] bg-center bg-cover rounded-md text-center flex items-end hover:scale-105 ease-out duration-300 drop-shadow drop-shadow`}
                  >
                    {Hover === movie.id && (
                      <>
                        {!fav.find((m) => m.id === movie.id) ? (
                          <div
                            className="absolute top-2 right-2 p-2 bg-gray-800 text-red-600 rounded-md cursor-pointer"
                            onClick={() => {
                              add(movie);
                            }}
                          >
                            {" "}
                            &#10084;
                          </div>
                        ) : (
                          <div
                            className="absolute top-2 right-2 p-2 bg-gray-800 text-red-600 rounded-md cursor-pointer"
                            onClick={() => {
                              del(movie);
                            }}
                          >
                            {" "}
                            &#10060;
                          </div>
                        )}
                      </>
                    )}
                    <div className="w-full bg-gray-800 opacity-90 p-2 text-white rounded-b-md">
                      {movie.title}
                    </div>
                  </div>
                </div>
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
