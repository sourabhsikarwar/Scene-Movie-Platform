import React, { useState, useEffect, useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useUserAuth } from '../context/authContext';
import { database } from '../firebase/firebaseConfig';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useUserAuth();
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };

  useEffect(() => {
    onSnapshot(doc(database, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(database, 'users', `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>My Favourites</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          ref={sliderRef}
          className='w-full h-full overflow-x-hidden whitespace-nowrap relative'
        >
          {movies.map((item) => (
            
            <div
              key={item.id}
              className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
            >
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
              <Link to = {"/movie/" + item.title + "/" + item.id}>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>
                </Link>
                <p onClick={() => deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'>
                  <AiOutlineClose />
                </p>
              </div>
            </div>
           
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShows;