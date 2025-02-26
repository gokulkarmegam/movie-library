import React from 'react'

function Pagination({pageNo,prev,next}) {
  return (
    <div className='bg-gray-400/30  mt-3 flex justify-center'>
        <div onClick={prev} className='px-4'><i class="fa-solid fa-arrow-left"></i></div>
        <div>{pageNo} </div>
        <div onClick={next} className='px-4' ><i class="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default Pagination;