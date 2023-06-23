import React, { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

function SavedCards({ item, deleteMovie }) {
  const navigate = useNavigate()
  const apiKey = process.env.REACT_APP_API_KEY
  const [genre, setGenre] = useState([])
  const [initialLoading, setInitialLoading] = useState(false)

  useEffect(() => {
    //get the genres of a particular movie
    getGenre()
  }, [])

  const getGenre = async () => {
    setInitialLoading(true)
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}`,
      {
        method: 'get',
      }
    ).then((res) => res.json())
    if (response) {
      //set the genre
      setGenre(response.genres)
      setInitialLoading(false)
    }
  }

  const removeFromFavourite = (id) => {
    // delete a particular movie from favourites
    deleteMovie(id)
  }

  return (
    <div className='flex flex-wrap -mx-4'>
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
        <div className='relative inline-block w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-5/6 px-4 mb-4 mx-4'>
          {' '}
          <div className='max-w-sm bg-white shadow-lg rounded-lg overflow-hidden bg-black'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
              alt='Movie'
              className='w-full h-32 object-cover cursor-pointer'
              onClick={() => navigate(`/movie/${item.title} /${item.id}`)}
            />

            <div className='px-6 py-4'>
              <div className='flex items-stretch'>
                <p
                  className='text-xl font-semibold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-white flex-1 cursor-pointer'
                  onClick={() => navigate(`/movie/${item.title} /${item.id}`)}
                >
                  {item?.title}
                </p>

                <p
                  className='text-white cursor-pointer flex--1'
                  onClick={() => removeFromFavourite(item.id)}
                >
                  <FaHeart className='mt-2 ml-2 text-white' />
                </p>
              </div>

              <p className='text-gray-700 mb-4 overflow-hidden overflow-ellipsis whitespace-nowrap mt-6'>
                genre:{' '}
                <span className='text-white'>
                  {genre.map((item, index) => (
                    <>
                      {item.name}
                      {genre.length - 1 !== index && ', '}
                    </>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedCards
