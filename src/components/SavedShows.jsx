import React, { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useUserAuth } from "../context/authContext";
import { database } from "../firebase/firebaseConfig";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

import { Link } from "react-router-dom";
import SavedCards from "./SavedCards";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useUserAuth();
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };

  useEffect(() => {
    onSnapshot(doc(database, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(database, "users", `${user?.email}`);
  const deleteMovie = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <h2 className="text-gray-900 dark:text-white font-bold md:text-xl p-4 bg-gray-200 dark:bg-primary">
        My Favourites
      </h2>
      <div className="relative flex items-center group bg-gray-200 dark:bg-primary">
        {movies?.length > 0 && (
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
        )}
        {movies?.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="text-gray-900 dark:text-white text-4xl font-bold mb-4">
              Oops! You don't have any favourite movies.
            </p>
            <p className="text-gray-900 dark:text-gray-300 text-lg mb-8">
              Start exploring and saving your favourite movies now!
            </p>
            <Link to="/">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Browse Movies
              </button>
            </Link>
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="w-full h-full overflow-x-hidden whitespace-nowrap relative flex items-stretch"
          >
            {movies &&
              movies?.map((item) => (
                <SavedCards
                  item={item}
                  deleteMovie={deleteMovie}
                />
              ))}
          </div>
        )}
        {movies?.length > 0 && (
          <MdChevronRight
            onClick={slideRight}
            className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
        )}
      </div>
    </>
  );
};

export default SavedShows;
