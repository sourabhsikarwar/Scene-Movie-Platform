import React, { useEffect, useState } from 'react'
import styles from '../style'
import Card from './Cards/Card'
import { Oval } from 'react-loader-spinner'
import fetchData from '../helper/fetchData'

const Search = () => {
  const [query, setQuery] = useState('')
  const [Movies, setMovies] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)

  const upload = async () => {
    setInitialLoading(true)
    try {
      const response = await fetchData('search', 2, JSON.stringify({ query }))
      if (response.success) {
        setMovies(response.data.results.splice(0, 8))
        setInitialLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      upload()
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className={`${styles.boxWidth} px-4 my-8`}>
      <div className='flex md:gap-8 gap-4 w-full items-center'>
        <h1 className='text-xl sm:text-2xl text-gray-900 dark:text-white'>Search: </h1>
        <input
          type='search'
          placeholder='Search'
          style={{ color: 'black', padding: "8px 10px", maxWidth: "60%"}}
          onChange={(e) => setQuery(e.target.value)}
          className='rounded text-black border-none ring-1 ring-blue-300 outline-none w-auto'
        />
      </div>
      {initialLoading && (
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
      {!initialLoading && query && (
        <div className={`${styles.boxWidth} my-8`}>
          <div
            className={`text-2xl dark:text-dimWhite dark:hover:text-white w-full my-2 sm:mx-2 text-center sm:text-left`}
          >
            Showing results for {query}
          </div>
          {Movies.length === 0 ? (
            <div className='flex justify-center m-8 dark:text-dimWhite dark:hover:text-white text-2xl'>
              No result Found
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-4 justify-center my-4 mx-auto'>
              {Movies.map((movie) => {
                return <Card movie={movie} />
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
