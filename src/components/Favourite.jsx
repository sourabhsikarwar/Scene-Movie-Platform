import React from 'react'
import SavedShows from './SavedShows'
import background from '../assets/image/bg.webp'

const Favourite = () => {
  return (
   
      <>
      <div className='w-full text-white'>
        <img
          className='w-full h-[400px] object-cover'
          src={background}
          alt='favorites background' loading='lazy'
        />
      
        <div className='absolute top-[20%] p-4 md:p-8'>
          
        </div>
      </div>
      <SavedShows />
    </>

      





   
  )
}

export default Favourite