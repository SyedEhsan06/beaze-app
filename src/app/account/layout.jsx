import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

export default function layout({children}) {
  return (
    <div className='mt-16 bg-gray-50 lg:px-16 md:px-10 px-5 pt-16 pb-8 '>
       <div className='w-full md:flex'>
        <h5  className=' lg:text-4xl md:text-3xl text-2xl font-[900] headtext text-theme-footer-bg'>Welcome, Sherlock</h5>
        <button className=' ml-auto  my-3 md:mt-0 headtext md:w-[13%] w-[40%] md:py-2 py-1 text-white font-[400]  bg-[#3E3C3F] md:text-xl text-lg  rounded shadow-sm'>Logout</button>
       </div>
<div className='md:mt-16 mt-5' >
{children}
</div>
    </div>
  )
}
