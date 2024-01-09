"use client"
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
export default function Header() {
    return (
        <header className="w-full shadow">
            <nav className="w-full pt-1">
                <ul className="px-3 pb-3 flex items-end m-0 ">
                    <li className='mr-36'>
                        <Image src="/images/logo.png" width={60} height={60} alt="logo"
                        />
                    </li>
                    <li className=' px-6 context font-semibold'>Shop </li>
                    <li className=' px-6 context font-semibold'>About </li>
                    <li className=' mx-7 w-[350px] flex  bg-white rounded shadow-sm items-center justify-center px-2'>
                        <div className='w-2/12 text-[#9B9494] font-bold'>
                            <IoSearch size={18} />
                        </div>
                        <div className='w-10/12'>
                            <input type="text" className='w-full context font text-xs focus:outline-none py-[8px] text-[#9B9494]' placeholder='Search Tops, Jeans, Blazers, suspenders' />
                        </div>
                    </li>

                    <li className=' px-20 context font-semibold'>Sherlock’s Account  </li>
                    <li className=' ml-auto context font-semibold'>
                        <button className='flex gap-2 bg-gray-950 text-white font-semibold items-center py-1 rounded px-3'>
                            <FaCartShopping /><span> cart</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
