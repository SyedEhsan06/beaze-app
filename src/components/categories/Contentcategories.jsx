"use client"
import { FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import { categoryProducts, filtertypes } from '@/utils/dummydata';
import { useState } from "react";
export default function Contentcategories() {
    const [showsort, setshowsort] = useState(false);
    const [selectedfilter, setselectedfilter] = useState(1)
    return (
        <div className='w-full'>
            <div className='w-full flex'>
                <div className='w-9/12 flex gap-2 context text-text-secondary'>
                    <div className='flex items-center gap-2 py-1 px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm relative'><FaXmark className=' cursor-pointer text-xs' />Crop Tops</div>

                    <div className='flex items-center gap-2 py-1 px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm'><FaXmark className=' cursor-pointer text-xs' />Floral </div>
                </div>
                <div className='w-3/12 flex gap-2 context justify-between relative '>
                    <button className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-2 bg-white text-opacity-[78%]'>
                        <HiBars3 /> More filters
                    </button>

                    <button className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-2 bg-white text-opacity-[78%] ' onClick={() => setshowsort(!showsort)}>
                        <FaAngleDown className={`transition-all duration-75 ${showsort && 'rotate-[180deg]'}`} /> Sort
                    </button>

                    <div className={`top-[110%] w-[200px]  right-0 bg-white shadow-sm rounded-lg absolute z-20 ${showsort ? 'block' : 'hidden'}`}>
                        <ul className='text-sm font-[400] cursor-pointer '>
                            {
                                filtertypes.map((items, index) => (
                                    <li className={`py-2 border-b px-4 ${selectedfilter === index && ' text-white bg-theme-footer-bg'}`} key={index} onClick={() => setselectedfilter(index)}>{items.title}</li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
            </div>

            <div className='mt-5 grid grid-cols-4 gap-4 context'>
                {
                    categoryProducts.map((items, index) => (
                        <div key={index}>
                            <div className=' flex flex-col text-[#03071E]'>
                                <div className='relative group  cursor-pointer'>
                                    <img src={`/images/web/categories/${items.img}`} alt="" />
                                    <p className=' transition-all duration-75 cursor-pointer rounded-xl absolute left-[50%] translate-x-[-50%] hidden group-hover:block bottom-5 z-10 bg-button-secondary px-3  text-text-secondary text-[1rem]'>Quick buy</p>
                                </div>
                                <h6 className=' font-[700]  text-[1rem] mt-2  leading-5 '>{items.pname}</h6>
                                <p className='py-1 text-[1rem] font-[400]'>Rs {items.price}</p>
                                <button className='w-full py-2 text-center bg-theme-footer-bg rounded text-white text-lg font-[400]'>Add to Cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
