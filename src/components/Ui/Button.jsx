import React from 'react'

const Button = (props) => {
  return (
    <button className='bg-blue-gradient text-black px-6 py-2 rounded-md shadow hover:bg-blue-gradient-2 duration-300'>
        {props.content}
    </button>
  )
}

export default Button