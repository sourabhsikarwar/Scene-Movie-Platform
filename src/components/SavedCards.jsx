import React, { useState, useEffect, useRef } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useUserAuth } from '../context/authContext'
import { database } from '../firebase/firebaseConfig'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function SavedCards({ item }) {
  const apiKey = process.env.REACT_APP_API_KEY
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async (url) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}`,
      {
        method: 'get',
      }
    ).then((res) => res.json())
    console.log(response)
  }

  return (
    <div class='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 transition ease-in-out delay-150 hover:-translate-y-6 hover:translate-y-6 hover:-translate-x-8 hover:translate-x-6 hover:scale-110  duration-300 mt-10 m-4 absolute top-30 left-0 w-full h-full bg-black/100 hover:opacity-100 text-white mb-2 text-xl font-medium  text-neutral-800 dark:text-neutral-50'>
      <Link to={'/movie/' + item.title + '/' + item.id}>
        <img
          className='w-full h-auto '
          src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
          alt={item?.title}
        />
      </Link>
      <div className='p-6 absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <div className='flex items-stretch'>
          {' '}
          <h5 class='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
            {item?.title}{' '}
          </h5>
          <button>
            <AiOutlinePlus />
          </button>
        </div>

        <p class='mb-4 text-base text-neutral-600 dark:text-neutral-200 float-left'></p>
      </div>
    </div>
  )
}

export default SavedCards
