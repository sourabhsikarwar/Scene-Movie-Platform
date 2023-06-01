import React, { useState, useEffect } from "react";
import styles from "../../style";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUserAuth } from "../../context/authContext";
import { database } from "../../firebase/firebaseConfig";
import { arrayUnion, doc, updateDoc, arrayRemove } from "firebase/firestore";

const MovieCard = (props) => {
  const { user } = useUserAuth();
  const [like, setLike] = useState(false);

  const movieID = doc(database, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike((prevLike) => !prevLike); // Toggle the like state
      if (like) {
        // Unlike: Remove the show from savedShows array
        await updateDoc(movieID, {
          savedShows: arrayRemove({
            id: props.movie.id,
            title: props.movie.title,
            img: props.movie.backdrop_path,
          }),
        });
      } else {
        // Like: Add the show to savedShows array
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: props.movie.id,
            title: props.movie.title,
            img: props.movie.backdrop_path,
          }),
        });
      }
    } else {
      alert("Please log in to save a movie");
    }
  };

  useEffect(() => {
    // Retrieve like state from local storage
    const savedLike = localStorage.getItem(`like_${props.movie.id}`);
    if (savedLike) {
      setLike(JSON.parse(savedLike));
    }
  }, [props.movie.id]);

  useEffect(() => {
    // Save like state to local storage whenever it changes
    localStorage.setItem(`like_${props.movie.id}`, JSON.stringify(like));
  }, [props.movie.id, like]);

  return (
    <div className={`shadow flex my-4 p-3 group`} key={props.movie.id}>
      <div
        className={`${styles.MovieCard} relative flex justify-start items-end p-4 duration-200 rounded-[6px]`}
        alt="poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movie.poster_path}), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className={`absolute w-[40px] h-[40px] right-0 top-0 cursor-pointer group-hover:flex hidden sidebar m-3 shadow`}>
          <div className="bg-blue-gradient w-full h-full rounded-full flex items-center justify-center" onClick={saveShow}>
            {like ? <FaHeart className="text-white" size={24} /> : <FaRegHeart className="text-white" size={24} />}
          </div>
        </div>
        <Link to={"/movie/" + props.movie.title + "/" + props.movie.id}>
          <div className="w-full opacity-90 text-white text-md font-medium mt-2 ">
            <p className="">{props.movie.title}</p>
            <p className="text-dimWhite font-normal text-xs mt-2">{props.movie.vote_average}/10</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;