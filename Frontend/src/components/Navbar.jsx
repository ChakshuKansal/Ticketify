import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-[#0C172F] h-40 px-5 text-zinc-200 text-2xl flex w-full justify-around gap-32 font-sans'>
        <div className='flex justify-between items-center min-w-[500px] h-full'>
            <div><img className='h-32' src="https://static.vecteezy.com/system/resources/previews/012/027/723/original/admit-one-ticket-icon-black-and-white-isolated-wite-free-vector.jpg" alt="\"></img></div>
            <div><Link to={'/'}>Home</Link></div>
            <div><Link to={'/'}>Events</Link></div>
        </div>
        <div className='flex items-center justify-between w-[260px]'>
            <Link to={"/Admin"} className='border-2 border-white rounded-full p-4 text-xl hover:bg-blue-950'>List Your Event</Link>
            <Link to={'/SignUp'}>Register</Link>
        </div>
    </div>

  )
}

export default Navbar