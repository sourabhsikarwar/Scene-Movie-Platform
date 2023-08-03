import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import styles from "../../style";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Oval } from "react-loader-spinner";
import { useState, useEffect } from 'react';
import GenreCard from '../Cards/GenreCard';

const Genre = (props) => {
    const [genres, setgenres] = useState([]); 
    const [initialLoading, setInitialLoading] = useState(false); 
    const apiKey = process.env.REACT_APP_API_KEY;

    const upload = async (url) => {
        setInitialLoading(true);
        await axios
            .get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
            )
            .then((res) => {
            if (res.status === 200) {
              const genrePromises = res.data.genres.map((genres) => {
                return axios.get(`https://api.themoviedb.org/3/genre/${genres.id}/movies?api_key=${apiKey}&language=en-US`)
                  .then((genreRes) => {
    
                    const movies = genreRes.data.results; 
                    const randomIdx = Math.floor(Math.random() * movies.length); 
                    const genreImage = movies[randomIdx]?.backdrop_path;

                    return {
                        ...genres,
                        image: genreImage ? `https://image.tmdb.org/t/p/w500/${genreImage}` : "",
                    };

                  })
                  .catch((err) => {
                    console.log(err.message); 
                    return genres; 
                  })
              })
    
              Promise.all(genrePromises)
                .then((genresWithImages) => {
                  setgenres(genresWithImages);
                  setInitialLoading(false);
                })
                .catch((error) => {
                  console.log(error.message);
                });
    
            }
            })
            .catch((e) => {
                console.log(e.message);
            })
    };

    useEffect(() => {
        let url =
          props.title === "Genres"
            ? `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${props.id}`;
        upload(url);
    }, []);

    return (
        <>
            {" "}
            { !initialLoading ? (
                <div className={`${styles.boxWidth} my-8`}>
                    <div className="flex justify-between items-center px-4">
                        <h2 className={`${styles.heading3}`}>Popular Genres</h2>
                    </div>
                    <Splide
                        options={{
                        type: 'loop',
                        perPage: 5,
                        pagination: false,
                        breakpoints: {
                            400: {
                            perPage: 2,
                            },
                            764: {
                            perPage: 2,
                            },
                            1024: {
                            perPage: 3,
                            },
                            1280: {
                            perPage: 4,
                            },
                            1400: {
                            perPage: 5,
                            },
                        },
                        }}
                        aria-label='My Favorite Images'
                        className='justify-center'
                    >
                        {genres.map((genre) => (
                            <SplideSlide key={genre.id}>
                                {genre.image && <GenreCard genre={genre} />}
                            </SplideSlide>
                        ))}
                    </Splide>{" "}
                </div>
            ) : (
                <div className="flex justify-center my-8">
                    <Oval
                        height="50"
                        width="50"
                        color="grey"
                        secondaryColor="grey"
                        ariaLabel="loading"
                    />
                </div>
            )}
        </>
    );
};

export default Genre;