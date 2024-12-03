import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[pass,setpass]=useState("");

    const [data,setdata]=useState({
        fullname:"",
        email:"",
        password:"",    
    });

    useEffect(()=>{
        updatedata();
    },[name,email,pass,]);

    const updatedata=async ()=>{
        await setdata({...data,"email":email,"fullname":name,"password":pass});
    }

    const handleChange=(e)=>{
        console.log(e.target.value);
        console.log(e.target.name);
        if(e.target.name==='fullname'){
            setname(e.target.value);
            console.log(name);
            setdata({...data,"fullname":name});
        }
        else if(e.target.name==='email'){
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
        e.preventDefault();
        updatedata();
        try {
            const res=await fetch("http://localhost:5000/SignUp",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            if(!res.ok){
                return console.log("something Is wrong");
            }
            return console.log("User Registered");
        } catch (error) {
            console.log(error)||"Something Went Wrong";
            return;
        }
    }

  return (
    <>
    <div className='relative mx-40 my-20 h-[48vh] '>
        <div className='absolute top-[50%] left-[50%] w-[700px] h-full -translate-x-[50%] -translate-y-[50%] text-center'>
            <div className='text-4xl'>Create Account</div>
            <br>
            </br>
            <div className='w-full h-full'>
                <form className='justify-between h-full flex flex-col items-center'>
                    <div className='w-[700px] border-b-2 border-r-2 border-black rounded-r-lg overflow-hidden focus-within:border-r-8'><input type='text' name='fullname' className='px-6 py-4  focus:outline-none  w-full text-xl' placeholder='Full Name' onChange={handleChange}></input></div>
                    <div className='w-[700px] border-b-2 border-r-2 border-black rounded-r-lg overflow-hidden focus-within:border-r-8'><input type='email' name='email' className='px-6 py-4 focus:outline-none w-full text-xl' placeholder='Email' onChange={handleChange}></input></div>
                    <div className='w-[700px] border-b-2 border-r-2 border-black rounded-r-lg overflow-hidden focus-within:border-r-8'><input type='password' name='password' className='px-6 py-4 focus:outline-none w-full text-xl ' placeholder='Password' onChange={handleChange}></input></div>
                    <div className='w-[700px] border-black rounded-lg overflow-hidden' ><button type='submit' onClick={addtodb} className='bg-gray-800 text-zinc-100 px-6 py-4 focus:outline-none w-full text-xl font-extralight leading-10 '>Create Account</button></div>
                </form>
            </div>
                <div className='flex justify-start mt-8 font-mono text-lg space-x-2'>
                    <p className='font-serif'>Already have an account?</p>
                    <Link to={'/LogIn'}>Log in</Link>
                </div>
        </div>
    </div>
    </>
  )
}

export default SignUp