import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const AddEvent = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center'>
            <form>
                <div className='w-96 px-5'>
                    <input className='border-2 border-zinc-900 w-full p-4 text-xl' placeholder='Event Name: '></input>
                </div>
            </form>
        </div>

        <Footer/>
    </div>
  )
}

export default AddEvent