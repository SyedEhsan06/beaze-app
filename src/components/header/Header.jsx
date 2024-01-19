"use client"
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Header() {
    const [scrollLength, setScrollLength] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScrollLength(window.scrollY);
    };

    return (
        <header
            className={`w-full shadow transition-all duration-150 ${scrollLength > 620 ? 'fixed top-0 left-0 bg-white border z-20' : 'static'}`}
        >
            <nav className="w-full py-2">
                <ul className="px-3  flex items-center m-0  justify-between text-[18px]">
                    <li className=''>
                        <Image src="/images/logo.png" width={60} height={60} alt="logo"
                        />
                    </li>
                    <li className='context font-semibold'><Link href={'/'}>Shop </Link></li>
                    <li className='context font-semibold'><Link href={'/'}>About </Link> </li>
                    <li className='w-[350px] flex  bg-white rounded shadow-sm items-center justify-center px-2 border'>
                        <div className='w-2/12 text-[#9B9494] font-bold'>
                            <IoSearch size={18} />
                        </div>
                        <div className='w-10/12'>
                            <input type="text" className='w-full context font text-xs focus:outline-none py-[8px] text-[#9B9494] ' placeholder='Search Tops, Jeans, Blazers, suspenders' />
                        </div>
                    </li>

                    <li className=' context font-semibold'> <Link href={'/'}>Sherlock’s Account  </Link>  </li>
                    <li className='context font-semibold'>
                        <button className='flex gap-3 bg-gray-950 text-white font-semibold items-center py-1 rounded px-4'>
                            <FaCartShopping /><span> cart</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
