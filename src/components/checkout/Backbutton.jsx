"use client"
import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation'

export default function Backbutton() {
    const router = useRouter();
  return (
    <button className='context  font-[800] text-xl flex items-center gap-x-3' onClick={() => router.back()}><FaArrowLeft/> Back to cart</button>
  )
}
