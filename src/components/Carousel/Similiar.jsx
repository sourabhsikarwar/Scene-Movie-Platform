import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import React, { useState, useEffect } from 'react'
import styles from '../../style'
import MovieCard from '../Cards/MovieCard'
import { Oval } from 'react-loader-spinner'
import { useParams } from 'react-router-dom';
import fetchData from '../../helper/fetchData';

const Similiar = (props) => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [data, setData] = useState([])
  const { movieId, title } = useParams();

  const upload = async () => {
    setInitialLoading(true)
     try {
       const response = await fetchData(`similar/${props.title}/${props.id}`, 1)
       if (response.success) {
        setData(response.data.results)
         setInitialLoading(false)
       }
     } catch (error) {
       console.log(error)
     }
  }

  useEffect(() => {
    upload()
  }, [movieId])

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
        <div
          className={` dark:bg-primary dark:text-dimWhite py-8`}
        >
          <div className={`${styles.boxWidth} flex justify-between items-center px-4`}>
            <h2 className={`${styles.heading3} text-gray-900 dark:text-white`}>
              Similiar
            </h2>
          </div>
          <div className={`${styles.boxWidth}`}>
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
                  {props.title === 'movie' && (
                    <MovieCard type ={props.title} movie={item} key={item.id} title={item.title} />
                  )}
                  {props.title === 'tv' && (
                    <MovieCard type ={props.title} movie={item} key={item.id} title={item.name} />
                  )}
                </SplideSlide>
              )
            })}
          </Splide>
          </div>
          
        </div>
      )}
    </>
  )
}

export default Similiar
