"use client"
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";
import Shopmenu from './Shopmenu';
import { FaXmark, FaChevronLeft } from "react-icons/fa6";
import { fetchData } from '@/utils/apicall';


export default function Header() {
    const [scrollLength, setScrollLength] = useState(0);
    const [showmenu, setshowmenu] = useState(false);
    const [showhide, setshowhide] = useState(0);
    const [showshop, setshowshop] = useState(false);
    const [shopmenudata, setshopmenudata] = useState([])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        handelgetshopmenudata()
    }, [])

    const handleScroll = () => {
        setScrollLength(window.scrollY);
    };

    const handelshowmenu = () => {
        showhide === 1 ? setshowhide(0) : setshowhide(1)
    }
    const handelgetshopmenudata = async () => {
        try {
            const response = await fetchData('category')
            setshopmenudata(response.categories)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        document.addEventListener('click', function (event) {
        if(!event.target.className.includes('showmenu')){
            setshowmenu(false)
        }
        });
    }
        , [])

    return (
        <header  >
            <nav className={` showmenu  z-10 w-full shadow py-2 transition-all hidden lg:block duration-150 ${scrollLength > 620 ? 'fixed top-0 left-0 bg-white border z-20 ' : ' absolute top-0 left-0  bg-white bg-opacity-[50%] linkshdow'}`}>
                <ul className="px-3  flex items-center m-0  justify-between text-[20px] xl:[24px] ">
                    <li className='px-2'>
                       <Link href={'/'}> <Image src="/images/logo.png" width={60} height={60} alt="logo"/></Link>
                   
                    </li>
                    <li className={`context showmenu   px-5 duration-75 transition-all cursor-pointer ${showmenu ? 'bg-white  rounded-2xl font-[800]' : 'font-semibold'}`} onClick={() => setshowmenu(!showmenu)} >Shop</li>

                    <li className='context font-semibold px-2'><Link href={'/'}>About </Link> </li>
                    <li className='w-[350px] xl:w-[400px] flex  bg-white rounded shadow-sm items-center justify-center px-2 border gap-3'>
                        <div className='w-1/12 text-[#9B9494] font-bold'>
                            <button className='px-2'>
                                <IoSearch size={20} />
                            </button>
                        </div>
                        <div className='w-11/12'>
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
                    showmenu && <div className="absolute showmenu bg-[#EBE9DB] pt-8 pb-16 px-40 w-full left-0 top-[100%] transition-all duration-75">
                        <Shopmenu   meudata={shopmenudata} />
                    </div>

                }

            </nav>



            <nav className={`w-full shadow py-2 transition-all z-20 block lg:hidden duration-150 ${scrollLength > 620 ? 'fixed top-0 left-0 bg-white border z-20 ' : ' absolute top-0 left-0  bg-white bg-opacity-[50%]'}`}>
                <ul className="px-4  flex items-center m-0  justify-between text-[24px]">
                    <li className=''>
                        <Image src="/images/logo.png" width={60} height={60} alt="logo"
                        />
                    </li>
                    <li className='context font-semibold flex items-center'>
                        <div className='flex items-center justify-center cursor-pointer' onClick={handelshowmenu}>
                            Menu  <IoIosArrowDown className={`mt-[2px] transition-all duration-75 ${showhide === 1 && ' rotate-[180deg]'}`} size={18} />
                        </div>
                        {
                            showhide === 1 &&
                            <div className="absolute w-[80%]  bg-[#EBE9DB] left-0 top-[100%] h-[92vh] transition-all duration-75  overflow-y-auto">
                                <div className='w-full flex'>
                                    {
                                        showshop && <button className='text-white text-2xl p-2 bg-gray-950'>
                                            <FaChevronLeft size={22} onClick={() => setshowshop(false)} />
                                        </button>
                                    }
                                    <button className=' ml-auto text-white text-2xl p-2 bg-gray-950' onClick={() => setshowhide(0)}>
                                        <FaXmark />
                                    </button>

                                </div>
                                <div className=' py-5 px-3'>
                                    {
                                        showshop ? <div className='w-full'>

                                            <Shopmenu meudata={shopmenudata} /></div> : <div className='w-full h-[100%]  '>
                                            <div className=''>
                                                <ul className=' text-3xl font-[700]'>
                                                    <li className='pb-4 cursor-pointer' onClick={() => setshowshop(true)}>Shop</li>
                                                    <li className='pb-4'><Link href='/'>About</Link></li>
                                                    <li className='pb-4'><Link href='/'>Sing in</Link></li>
                                                    <li ><Link href='/'>Create account</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </li>


                    <li className='context font-semibold'>
                        <button className='flex items-center gap-x-6 justify-center cursor-pointer' >
                            {
                                showhide == 2 ? <FaXmark className=' cursor-pointer' onClick={() => setshowhide(0)} /> : <IoSearch className=' cursor-pointer' onClick={() => setshowhide(2)} />
                            }
                            <FaCartShopping />
                        </button>
                    </li>
                </ul>



                {
                    showhide === 2 && <div className="absolute   px-8  w-full left-0 top-[110%] transition-all duration-75">
                        <input type="text" className='w-full context font text-[16px] focus:outline-none p-2 rounded text-[#03071E] ' placeholder='Search Tops, Jeans, Blazers, suspenders' />
                    </div>
                }
            </nav>

        </header>
    )
}
