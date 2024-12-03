import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {

    const[email,setemail]=useState("");
    const[pass,setpass]=useState("");

    const [data,setdata]=useState({
        email:"",
        password:"",    
    })

    useEffect(()=>{
        updatedata();
    },[email,pass,]);

    const updatedata=async ()=>{
        await setdata({...data,"email":email,"password":pass});
    }

    const handleChange=(e)=>{
        console.log(e.target.value);
        console.log(e.target.name);

        if(e.target.name==='email'){
            setemail(e.target.value);
            setdata({...data,"email":email});
        }
        else{
            setpass(e.target.value);
            setdata({...data,"password":pass});
        }

        console.log(data);
    }
    const addtodb=async (e)=>{
        console.log("hello");
        e.preventDefault();
        updatedata();
        try {
            const res=await fetch("http://localhost:5000/LogIn",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            if(!res.ok){
                return console.log("something Is wrong");
            }
            const responseData=await res.json();

            
                localStorage.setItem("token", responseData.token);
                console.log("User logged in success!");

            return;
        } catch (error) {
            console.log(error)||"Something Went Wrong";
            return;
        }
    }

  return (
    <>
    <div className='relative mx-40 my-32 h-[38vh] '>
        <div className='absolute top-[50%] left-[50%] w-[700px] h-full -translate-x-[50%] -translate-y-[50%] text-center'>
            <div className='text-4xl'>Log in your Account</div>
            <br>
            </br>
            <div className='w-full h-full'>
                <form className='justify-between h-full flex flex-col items-center'>
                    <div className='w-[700px] border-b-2 border-r-2 border-black rounded-r-lg overflow-hidden focus-within:border-r-8'><input type='email' name='email' className='px-6 py-4 focus:outline-none w-full text-xl' placeholder='Email' onChange={handleChange}></input></div>
                    <div className='w-[700px] border-b-2 border-r-2 border-black rounded-r-lg overflow-hidden focus-within:border-r-8'><input type='password' name='password' className='px-6 py-4 focus:outline-none w-full text-xl ' placeholder='Password' onChange={handleChange}></input></div>
                    <div className='w-[700px] border-black rounded-lg overflow-hidden' ><button type='submit' onClick={addtodb} className='bg-gray-800 text-zinc-100 px-6 py-4 focus:outline-none w-full text-xl font-extralight leading-10 '>Log In</button></div>
                </form>
            </div>
                <div className='flex justify-start mt-8 font-mono text-lg space-x-2'>
                    <p className='font-serif'>Not have an account?</p>
                    <Link to={'/SignUp'}>Sign Up</Link>
                </div>
        </div>
    </div>
    </>
  )
}

export default LogIn