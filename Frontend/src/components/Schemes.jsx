import React from 'react'
import { Link } from 'react-router-dom'

const Schemes = () => {
  return (
    <div>
        <div>
      <div className='text-center font-semibold leading-10'>
        <h1 className='text-5xl leading-10 tracking-wide font-bold font-sans'>Get Started</h1>
        <p className='font-medium'>Choose a plan to start listing your events. Our creator-friendly pricing is designed with you in mind to ensure it's easy and viable.</p>
      </div>
      <div className='text-center font-semibold flex flex-col justify-between gap-10 items-center mt-10'>
        <h1 className='text-3xl font-bold'>On-ground Events</h1>
        <div className='h-[540px] w-[400px] rounded-xl overflow-hidden shadow-md'> 
          <div className='w-full h-[100px] bg-[#31C0F0] flex text-5xl justify-center items-center text-zinc-100 font-bold'>
            <h1>REGULAR</h1>
          </div>
          <div>
            <h1 className='leading-[20px] text-xl p-10 font-bold capitalize'>STARTING FROM 10% COMMISSION</h1>
          </div>
          <div className='border-t-[0.1rem] border-zinc-950 flex flex-col h-[270px] justify-between py-16 text-lg px-10'>
            <div>Sell tickets to events happening on-ground/at a venue</div>
            <div>Specify safety measures available at the event</div>
            <div>Manage a guestlist and share updates</div>
          </div>
          <div>
            <Link to={"/SignUp"}><button className='bg-[#31C0F0] p-4 rounded-md text-zinc-50 text-lg'>SIGN UP</button></Link>       
          </div>
        </div>
      </div>
    </div>
        <div>
      <div className='text-center font-semibold flex flex-col justify-between gap-10 items-center mt-10'>
        <h1 className='text-3xl font-bold'>Digital Events</h1>
        <div className='flex justify-between px-16 w-full'>
            <div className='h-[540px] w-[400px] rounded-xl overflow-hidden shadow-md'> 
            <div className='w-full h-[100px] bg-[#EC1066] flex text-5xl justify-center items-center text-zinc-100 font-bold'>
                <h1>ONLINE</h1>
            </div>
            <div>
                <h1 className='leading-[20px] text-xl p-10 font-bold capitalize'>STARTING FROM 10% COMMISSION</h1>
            </div>
            <div className='border-t-[0.1rem] border-zinc-950 flex flex-col h-[270px] justify-between py-16 text-lg px-10'>
                <div>Sell tickets to digital events</div>
                <div>Host an event on any platform of your choice</div>
                <div>Send customers details to join your event online</div>
            </div>
            <div>
            <Link to={'/SignUp'}><button className='bg-[#EC1066] p-4 rounded-md text-zinc-50 text-lg'>SIGN UP</button></Link>          
            </div>
            </div>
            <div className='h-[540px] w-[400px] rounded-xl overflow-hidden shadow-md'> 
            <div className='w-full h-[100px] bg-[#EC1066] flex text-5xl justify-center items-center text-zinc-100 font-bold'>
                <h1>LIVE STREAM</h1>
            </div>
            <div>
                <h1 className='leading-[20px] text-xl p-10 font-bold capitalize'>STARTING FROM 10% COMMISSION</h1>
            </div>
            <div className='border-t-[0.1rem] border-zinc-950 flex flex-col h-[270px] justify-between py-16 text-lg px-10'>
                <div>Sell tickets to digital events</div>
                <div>Host an event on any platform of your choice</div>
                <div>Send customers details to join your event online</div>
            </div>
            <div>
            <Link to={'/SignUp'}><button className='bg-[#EC1066] p-4 rounded-md text-zinc-50 text-lg'>SIGN UP</button></Link>          
            </div>
            </div>
            <div className='h-[540px] w-[400px] rounded-xl overflow-hidden shadow-md'> 
            <div className='w-full h-[100px] bg-[#EC1066] flex text-5xl justify-center items-center text-zinc-100 font-bold'>
                <h1>PRE-RECORDED</h1>
            </div>
            <div>
                <h1 className='leading-[20px] text-xl p-10 font-bold capitalize'>STARTING FROM 10% COMMISSION</h1>
            </div>
            <div className='border-t-[0.1rem] border-zinc-950 flex flex-col h-[270px] justify-between py-16 text-lg px-10'>
                <div>Sell tickets to digital events</div>
                <div>Host an event on any platform of your choice</div>
                <div>Send customers details to join your event online</div>
            </div>
            <div>
                <Link to={'/SignUp'}><button className='bg-[#EC1066] p-4 rounded-md text-zinc-50 text-lg'>SIGN UP</button></Link>          
            </div>
            </div>

        </div>
            <h1 className='leading-10 text-xl'>Have an account already? <Link to={'/Login'} className='text-blue-500'>Login</Link></h1>
      </div>
    </div>
    </div>
  )
}

export default Schemes