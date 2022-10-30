import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../style";
import MovieCard from "../Cards/MovieCard";
import TvCard from "../Cards/TvCard";

const Similiar = (props) => {
  const [data, setData] = useState([]);
  const isMounted = useRef(true);
  const upload = async () => {
    await axios
      .get(`https://api.themoviedb.org/3/${props.title}/${props.id}/similar?api_key=ebf3974135e4e887c96fc16d0e3024b1&language=en-US&page=1`
      )
      .then((res) => {
        setData(res.data.results);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(function () {
    if (isMounted.current) {
      upload();
    }
    return () => {
      isMounted.current = false;
    };
  });

  return (
    <div className={`${styles.boxWidth} my-8`}>
      <div className="flex justify-between items-center px-4">
        <h2 className={`${styles.heading3}`}>Similiar</h2>
        {/* <p className="">
          <Link
            className={`${styles.paragraph} hover:text-white duration-200`}
            to={"/category/movie/" + props.title + "/" + props.id}
          >
            Show all
          </Link>
        </p> */}
      </div>
      <Splide
        options={{
          type: "loop",
          perPage: "6",
          pagination: false,
          breakpoints: {
            400: {
              perPage: 2,
            },
            764: {
              perPage: 3,
            },
            1024: {
              perPage: 4,
            },
            1280: {
              perPage: 5,
            },
            1400: {
              perPage: 6,
            },
          },
        }}
        aria-label="My Favorite Images"
        className="justify-center"
      >
        {data.map((item) => {
          return (
            <SplideSlide>
              ${props.title === `movie` ? <MovieCard movie={item} key={item.id} /> : <TvCard movie={item} key={item.id} />}
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Similiar;
