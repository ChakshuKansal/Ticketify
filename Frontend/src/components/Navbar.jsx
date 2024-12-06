import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-[#0C172F] h-32 px-5 text-zinc-200 text-2xl flex items-center justify-between w-full font-sans'>
        <div className='flex items-center gap-10'>
            <div className='h-32'>
                <img className='h-full' src="https://static.vecteezy.com/system/resources/previews/012/027/723/original/admit-one-ticket-icon-black-and-white-isolated-wite-free-vector.jpg" alt="Logo" />
            </div>
            <div className='hidden md:flex gap-8'>
                <Link to={'/'} className='hover:text-white transition duration-300'>Home</Link>
                <Link to={'/'} className='hover:text-white transition duration-300'>Events</Link>
            </div>
        </div>

        <div className='flex items-center gap-4'>
            <Link to={"/Admin"} className='border-2 border-white rounded-full p-4 text-xl hover:bg-blue-800 transition duration-300'>
                List Your Event
            </Link>
            <Link to={'/SignUp'} className='text-lg hover:text-white transition duration-300'>
                Register
            </Link>
        </div>
    </div>
  )
}

export default Navbar;
