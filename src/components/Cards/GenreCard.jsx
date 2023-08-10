import React, { useState, useEffect } from "react";
import styles from "../../style";
import { Link } from "react-router-dom";

const GenreCard = (props) => {
  return (
    <div
      className={`flex flex-wrap justify-center relative w-11/12 h-full shadow my-4 p-3 group`}
      key={props.genre.id}
    >
      <Link to={"/category/movie/" + props.genre.name + "/" + props.genre.id}>
        <div
          className={`${styles.GenreCard} relative flex-auto duration-200 rounded-[6px] h-full overflow-hidden transition-all`}
        >
          <div
            className="absolute w-full h-full z-10 flex items-end"
            style={{
              background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 10%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0.05) 90%,  transparent 100%)`,
            }}
          >
            <div className="pt-4 pb-6 px-6">
              <p className="text-white text-lg md:text-xl lg:text-2xl font-bold">
                {props.genre.name.toUpperCase()}
              </p>
            </div>
          </div>
          <img
            className={`w-full min-h-full block object-cover`}
            src={props.genre.image}
            alt="genre"
          />
        </div>
      </Link>
    </div>
  );
};

export default GenreCard;
