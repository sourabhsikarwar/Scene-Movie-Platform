import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../style'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

function Banner() {
  const [Movies, setMovies] = useState({})
  const [initialLoading, setInitialLoaing] = useState(true)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    upload()
  }, [])

  const upload = async () => {
    setInitialLoaing(true)
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=12`
      )
      .then((res) => {
        if (res.data) {
          const mResults = res.data.results[0]
          setMovies(mResults)
          setInitialLoaing(false)
        }
      })
  }
  return (
    <>
      <section
        className={`text-gray-600 body-font`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path}), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
        }}
      >
        {!initialLoading ? (
          <div
            className={`${styles.boxWidth} mx-auto flex px-8 py-8 flex-row md:items-end items-end md:h-[85vh] h-[90vh]`}
          >
            <div className='md:w-full lg:pr-24 md:pr-16 flex flex-col md:items-center md:text-center md:mb-0 items-center text-center'>
              <h1 className={`${styles.heading1} mb-2 text-gray-100`}>
                {Movies.title}
              </h1>
              <div className='flex justify-center my-4'>
                <Link to={'/movie/' + Movies.title + '/' + Movies.id}>
                  <button className='inline-flex bg-blue-gradient text-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
                    See More
                  </button>
                </Link>
                <button className='ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg'>
                  Play
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center my-8'>
            <Oval
              height='50'
              width='50'
              color='grey'
              secondaryColor='grey'
              ariaLabel='loading'
            />
          </div>
        )}
      </section>
    </>
  )
}

export default Banner
