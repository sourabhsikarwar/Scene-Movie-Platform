import React, { useState, useEffect } from "react";
import styles from "../../style";
import { Link } from "react-router-dom";

const GenreCard = (props) => {
  return (
    <div className={`shadow flex my-4 p-3 group`} key={props.genre.id}>
      <Link to={"/category/movie/" + props.genre.name + "/" + props.genre.id}>
      <div
        className={`${styles.MovieCard} relative flex justify-start items-end p-4 duration-200 rounded-[6px]`}
        alt='movie poster'
        style={{
          backgroundImage: `url(${props.genre.image}), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundBlendMode: 'multiply',
        }}
        >
          <div className="absolute w-full opacity-90 text-white text-md font-medium  mb-1">
            <p className="">{props.genre.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GenreCard;
