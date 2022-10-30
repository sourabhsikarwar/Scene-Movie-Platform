import React from "react";
import styles from "../../style";

const TvGeneralCard = (props) => {
  return (
      <div className={`shadow flex my-4 p-3`} key={props.detail.id}>
        <div
          className={`${styles.Card} flex justify-start items-end p-4 duration-200 rounded-[6px]`}
          alt="poster"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.detail.still_path}), linear-gradient(0deg, #0D1117 0%, #111111 10%, #0D1117 15%, transparent 100%)`,
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          <div className="w-full opacity-90 text-white text-md font-medium mt-2">
            <p> {props.detail.episode_number + ". " + props.detail.name }</p> 
            <p className="text-dimWhite font-normal text-xs mt-2">
              {props.detail.vote_average}/10
            </p>
          </div>
        </div>
      </div>
  );
};

export default TvGeneralCard;
