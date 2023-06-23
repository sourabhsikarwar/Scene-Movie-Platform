import React from 'react'

function Pagination(props) {
  
  return (
    <>
    <div className="flex justify-center m-8">
        <button className='px-4 py-2 border-[1px] border-blue-300 border-r-0 text-gray-900 dark:text-white rounded-l-md' onClick={props.goBack}>Prev</button>
        <button className='px-4 py-2 border-[1px] border-blue-300 text-gray-900 dark:text-white'>{props.page}</button>
        <button className='px-4 py-2 border-[1px] border-blue-300 border-l-0 text-gray-900 dark:text-white rounded-r-md' onClick={props.goNext}>Next</button>
    </div>
    </>
  )
}

export default Pagination