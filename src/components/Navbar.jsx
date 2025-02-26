import React from 'react'
import Logo from "../MovieLogo.png"
import {Link} from "react-router"

function Navbar() {
  return (
    <div className='flex border space-x-8 items-center px-3 py-2' >
        <img className='w-[30px]' src={Logo}/>
        <Link className='text-blue-500 text-1xl' to ='/' >Movies</Link>
        <Link className='text-blue-500 text-1xl' to ='/Watchlist'>Watchlist 😀</Link>
    </div>
  )
}

export default Navbar