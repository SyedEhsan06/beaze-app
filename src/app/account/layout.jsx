import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

export default function layout({children}) {
  return (
    <div className='mt-16 bg-gray-50 px-16 pt-16 pb-8 '>
       <div className='w-full flex'>
        <h5  className=' text-4xl font-[900] headtext text-theme-footer-bg'>Welcome, Sherlock</h5>
        <button className=' ml-auto headtext w-[13%] py-2 text-white font-[400]  bg-[#3E3C3F] text-xl  rounded shadow-sm'>Logout</button>
       </div>
<div className=' mt-16' >
{children}
</div>
    </div>
  )
}
