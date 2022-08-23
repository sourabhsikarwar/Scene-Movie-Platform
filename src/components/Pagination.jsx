import React from 'react'

function Pagination(props) {
  
  return (
    <>
    <div className="flex justify-center m-8">
        <button className='p-2 border-2 border-gray-400 border-r-0 text-gray-900 rounded-l-md' onClick={props.goBack}>Prev</button>
        <button className='p-2 border-2 border-gray-400 bg-gray-100 text-gray-900'>{props.page}</button>
        <button className='p-2 border-2 border-gray-400 border-l-0 text-gray-900 rounded-r-md' onClick={props.goNext}>Next</button>
    </div>
    </>
  )
}

export default Pagination