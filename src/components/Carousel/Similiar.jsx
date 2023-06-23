import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from '../../style'
import MovieCard from '../Cards/MovieCard'
import { Oval } from 'react-loader-spinner'

const Similiar = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [initialLoading, setInitialLoading] = useState(true)
  const [data, setData] = useState([])

  const upload = async () => {
    setInitialLoading(true)
    await axios
      .get(
        `https://api.themoviedb.org/3/${props.title}/${props.id}/similar?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.results)
          setInitialLoading(false)
        }
      })
      .catch((e) => {
        return e.message
      })
  }

  useEffect(() => {
    upload()
  }, [])

  return (
    <>
      {initialLoading ? (
        <div className='flex justify-center my-8'>
          <Oval
            height='50'
            width='50'
            color='grey'
            secondaryColor='grey'
            ariaLabel='loading'
          />
        </div>
      ) : (
        <div className={`${styles.boxWidth} dark:bg-primary dark:text-dimWhite py-8`}>
          <div className='flex justify-between items-center px-4'>
            <h2 className={`${styles.heading3} text-gray-900 dark:text-white`}>Similiar</h2>
          </div>
          <Splide
            options={{
              type: 'loop',
              perPage: '6',
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
            aria-label='My Favorite Images'
            className='justify-center'
          >
            {data.map((item) => {
              return (
                <SplideSlide>
                  <MovieCard movie={item} key={item.id} />
                </SplideSlide>
              )
            })}
          </Splide>
        </div>
      )}
    </>
  )
}

export default Similiar
