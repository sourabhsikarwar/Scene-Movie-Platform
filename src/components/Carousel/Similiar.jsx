
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styles from "../../style";
import MovieCard from "../Cards/MovieCard";

const Similar = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState([]);
  const isMounted = useRef(true);
  const upload = async () => {
    await axios
      .get(`https://api.themoviedb.org/3/${props.title}/${props.id}/similar?api_key=${apiKey}&language=en-US&page=1`)
      .then((res) => {
        setData(res.data.results);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    if (isMounted.current) {
      upload();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchAdditionalData = async (item) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}`);
      const { crew, cast } = response.data;
      const directors = crew.filter((member) => member.job === "Director").map((director) => director.name);
      const castMembers = cast.map((member) => member.name);
      return {
        ...item,
        directors,
        cast: castMembers,
      };
    } catch (error) {
      console.log(error.message);
      return item;
    }
  };

  const fetchAllAdditionalData = async () => {
    const newData = await Promise.all(data.map((item) => fetchAdditionalData(item)));
    setData(newData);
  };

  useEffect(() => {
    if (data.length > 0) {
      fetchAllAdditionalData();
    }
  }, [data]);

  return (
    <div className={`${styles.boxWidth} my-8`}>
      <div className="flex justify-between items-center px-4">
        <h2 className={`${styles.heading3}`}>Similar</h2>
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
        {data.map((item) => (
          <SplideSlide key={item.id}>
            <MovieCard movie={item} />
            <div>
              <p>Directors: {item.directors && item.directors.join(", ")}</p>
              <p>Cast: {item.cast && item.cast.join(", ")}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Similar;
