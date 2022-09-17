import React from 'react'
import styles from '../../style'
import { Link } from 'react-router-dom'

const TvCard = (props) => {
  return (
    <Link to={"/tv/" + props.movie.name + "/" + props.movie.id}>
    <div className="flex my-4 p-3 shadow group">
      <div
        className={`${styles.TvCard} relative flex justify-start items-end duration-200 p-4 rounded-[6px]`}
        alt="poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundBlendMode : "multiply"
        }}
      >
         <div className={`absolute w-[40px] h-[40px] right-0 top-0 text-white bg-blue-gradient rounded-full justify-center items-center self-end cursor-pointer group-hover:flex hidden sidebar m-3 shadow`}>
          <ion-icon name="heart"></ion-icon>
        </div>
          <div className="w-full opacity-90 text-white text-md leading-relaxed font-medium mt-2">
            <p>{props.movie.name}</p>
            <p className="text-dimWhite font-normal text-xs">{props.movie.vote_average}/10</p>
          </div>
      </div>
    </div>
    </Link>
  )
}

export default TvCard