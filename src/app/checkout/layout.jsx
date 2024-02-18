import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

export default function layout({children}) {
  return (
    <div className='mt-16 bg-gray-50 px-5 pt-6 pb-8 '>
<button className='context  font-[800] text-xl flex items-center gap-x-3'><FaArrowLeft/> Back to cart</button>
<div className=' mt-6' >
{children}
</div>
    </div>
  )
}
