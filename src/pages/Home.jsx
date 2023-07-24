import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../components/Banner/Banner'
import Genre from '../components/Carousel/Genre'
import Trending from '../components/Carousel/Trending'
import Search from '../components/Search'
import { Oval } from 'react-loader-spinner'
import fetchData from '../helper/fetchData'

const Home = () => {
  const [genreMovie, setGenreMovie] = useState([])
  const [genreTv, setGenreTv] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true)
  const apiKey = process.env.REACT_APP_API_KEY;

  const uploadMovie = async () => {
    setInitialLoading(true)
    try {
      const response = await fetchData('get-all-genres', 1)
      //  console.log('response:', response.data)
      if (response.success) {
        setGenreMovie(response.data.genres)
        setInitialLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    uploadMovie()
  }, [])

  const uploadTv = async () => {
    setInitialLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        if (res.status === 200) {
          setGenreTv(res.data.genres);
          setInitialLoading(false);
        }
      })
      .catch((e) => {
        return e.message;
      });
  };

  useEffect(() => {
    uploadTv();
  }, []);

  return (
    <div className='bg-gray-200 text-gray-900 dark:bg-primary dark:text-dimWhite'>
      {!initialLoading ? (
        <div>
          <Banner />
          <Search />
          <Trending title="Trending" id="1" type="movie" head="Movies" />
          <Trending title="Trending" id="1" type="tv" head="TV Shows" />
          <Genre title='Genres' id='1' />
          {genreMovie &&
            genreMovie.map((item, index) => {
              return <Trending title={item.name} id={item.id} key={index} head="" type="movie"/>
            })}
        </div>
      ) : (
        <div className='flex justify-center py-8'>
          <Oval
            height='50'
            width='50'
            color='grey'
            secondaryColor='grey'
            ariaLabel='loading'
          />
        </div>
      )}
    </div>
  )
}

export default Home
