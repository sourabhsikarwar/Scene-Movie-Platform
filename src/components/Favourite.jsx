import React from 'react'
import SavedShows from './SavedShows'

const Favourite = () => {
  return (
   
      <>
      <div className='w-full text-white'>
        <img
          className='w-full h-[400px] object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
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