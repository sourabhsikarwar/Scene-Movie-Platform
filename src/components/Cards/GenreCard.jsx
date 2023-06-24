import React, { useState, useEffect } from "react";
import styles from "../../style";
import { Link } from "react-router-dom";

const GenreCard = (props) => {

  return (
    <div className={`flex flex-wrap justify-center relative w-11/12 h-full shadow my-4 p-3 group`} key={props.genre.id}>
        <Link to={"/category/movie/" + props.genre.name + "/" + props.genre.id}>
                
            <div
                className={`${styles.GenreCard} relative flex-auto duration-200 rounded-[6px] h-full overflow-hidden transition-all`}
                style={{
                    background: `rgba(0, 0, 0, 0.5)`,
                }}
            >
                <div
                    className="absolute w-7/12 h-full z-10 flex items-end"
                    style={{
                        background: `linear-gradient(to right, #030b17 90%, #0c111b00)`,
                    }}
                >
                    <div className="pt-4 pb-6 px-6">
                        <p className="text-black dark:text-white text-lg md:text-xl lg:text-2xl font-bold">{props.genre.name}</p>
                    </div>
                </div>

                <img className={`w-11/12 min-h-full block ml-24 object-cover`} src={props.genre.image} alt="genre" />
            </div>
            
        </Link>
    </div>
  );

};

export default GenreCard;