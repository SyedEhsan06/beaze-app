import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import { categoryProducts } from '@/utils/dummydata';
export default function Contentcategories() {
    return (
        <div className='w-full'>
            <div className='w-full flex'>
                <div className='w-9/12 flex gap-2 context text-text-secondary'>
                    <div className='flex items-center gap-2 py-1 px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm'><FaXmark className=' cursor-pointer text-xs' />Crop Tops</div>
                    <div className='flex items-center gap-2 py-1 px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm'><FaXmark className=' cursor-pointer text-xs' />Floral </div>
                </div>
                <div className='w-3/12 flex gap-2 context justify-between '>
                    <div className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-2 bg-white text-opacity-[78%]'>
                        <HiBars3 /> More filters
                    </div>

                    <div className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-2 bg-white text-opacity-[78%]'>
                        <FaAngleDown /> Sort
                    </div>
                </div>
            </div>

            <div className='mt-5 grid grid-cols-4 gap-4 context'>
                {
                    categoryProducts.map((items, index) => (
                        <div>
                            <div className=' flex flex-col text-[#03071E]' key={index}>
                                <div className='relative group  cursor-pointer'>
                                    <img src={`/images/web/categories/${items.img}`} alt="" />
                                    <p className=' transition-all duration-75 cursor-pointer rounded-xl absolute left-[50%] translate-x-[-50%] hidden group-hover:block bottom-5 z-10 bg-button-secondary px-3  text-text-secondary text-[1rem]'>Quick buy</p>
                                </div>
                                <h6 className=' font-[700]  text-xl mt-2  leading-5 '>{items.pname}</h6>
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
