import React from 'react'
import {FcGoogle} from "react-icons/fc"

function OAuth() {
  return (
    <button className='flex
     justify-center items-center w-full bg-blue-gradient
     text-black uppercase px-7 py-2 rounded
     '
     >
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        continue with Google
    </button>
  )
}

export default OAuth