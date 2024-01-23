"use client"
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";
import Shopmenu from './Shopmenu';
export default function Header() {
    const [scrollLength, setScrollLength] = useState(0);
    const[showmenu,setshowmenu] = useState(false)
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
        <header>
            <nav className={` z-10 w-full shadow py-2 transition-all hidden lg:block duration-150 ${scrollLength > 620 ? 'fixed top-0 left-0 bg-white border z-20 ' : ' absolute top-0 left-0  bg-transparent linkshdow'}`}>
                <ul className="px-3  flex items-center m-0  justify-between text-[20px] xl:[24px] ">
                    <li className='px-2'>
                        <Image src="/images/logo.png" width={60} height={60} alt="logo"
                        />
                    </li>
                    <li className={`context font-semibold px-2 duration-75 transition-all cursor-pointer ${showmenu ? 'bg-white  rounded-2xl' : null}`} onClick={() => setshowmenu(!showmenu)} >Shop</li>
                    
                    <li className='context font-semibold px-2'><Link href={'/'}>About </Link> </li>
                    <li className='w-[350px] xl:w-[400px] flex  bg-white rounded shadow-sm items-center justify-center px-2 border'>
                        <div className='w-2/12 text-[#9B9494] font-bold'>
                            <IoSearch size={20} />
                        </div>
                        <div className='w-10/12'>
                            <input type="text" className='w-full context font text-[16px] focus:outline-none py-[8px] text-[#03071E] ' placeholder='Search Tops, Jeans, Blazers, suspenders' />
                        </div>
                    </li>

                    <li className=' context font-semibold px-2'> <Link href={'/'}>Sign in   </Link>  |  <Link href={'/'}> Create an Account  </Link> </li>
                    <li className='context font-semibold px-2'>
                        <button className='flex gap-3 bg-gray-950 text-white font-semibold items-center py-1 rounded px-4 uppercase'>
                            <FaCartShopping size={18} /> cart
                        </button>
                    </li>
                </ul>

               {
                showmenu &&  <Shopmenu/>
               }
               
            </nav>



            <nav className={`w-full shadow py-2 transition-all block lg:hidden duration-150 ${scrollLength > 620 ? 'fixed top-0 left-0 bg-white border z-20 ' : ' absolute top-0 left-0  bg-white bg-opacity-[50%]'}`}>
                <ul className="px-4  flex items-center m-0  justify-between text-[24px]">
                    <li className=''>
                        <Image src="/images/logo.png" width={60} height={60} alt="logo"
                        />
                    </li>
                    <li className='context font-semibold flex items-center'>
                    <div className='flex items-center justify-center'>
                    Menu  <IoIosArrowDown className='mt-[2px]' size={18}/>
                        </div>
                    </li>
                  
                   
                    <li className='context font-semibold'>
                        <button className='flex items-center gap-x-6 justify-center'>
                        <IoSearch/>
                        <FaCartShopping />
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
