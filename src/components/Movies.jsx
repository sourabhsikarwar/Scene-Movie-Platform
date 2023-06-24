import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import Pagination from './Pagination'
import Card from './Cards/Card'
import styles from '../style'
import { useParams } from 'react-router-dom'

function Movies(props) {
  const apiKey = process.env.REACT_APP_API_KEY
  const [initialLoading, setInitialLoading] = useState(false)
  const [Movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const params = useParams()
  const goBack = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const goNext = () => {
    setPage(page + 1)
  }
  useEffect(() => {
    upload()

    //use params as condition so that when content changes it can show category wise movies
  }, [page, params]) 

  const upload = async () => {
    setInitialLoading(true)
    let url = `https://api.themoviedb.org/3/discover/${props.content}?api_key=${apiKey}&with_genres=${props.id}&page=${page}`

    if (params.title === 'Trending') {
       url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`
    }

    await axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setMovies(res.data.results)
          setInitialLoading(false)
        }
      })
      .catch((e) => {
        return e;
      })
  }
  return (
    <>
      {!initialLoading ? (
        <div className='bg-gray-200 text-gray-900 dark:bg-primary dark:text-white'>
          {' '}
          <div className={`${styles.boxWidth} py-8`}>
            <div
              className={`${styles.heading2} w-full text-gray-900 dark:text-white my-2 ml-0 px-4 text-center sm:text-left`}
            >
              {props.title}
            </div>
            {Movies.length === 0 ? (
              <div
                className={`${styles.heading2} w-full my-2 ml-0 px-4 text-center sm:text-center`}
              >
                No Movie
              </div>
            ) : (
              <>
                {' '}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:justify-between justify-center flex-wrap my-4 mx-auto'>
                  {Movies.map((movie) => {
                    return <Card movie={movie} />
                  })}
                </div>
                <Pagination page={page} goBack={goBack} goNext={goNext} />
              </>
            )}
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
    </>
  )
}

export default Movies
