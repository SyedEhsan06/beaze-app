"use client"
import { FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import { categoryProducts, filtertypes,filtertypesdata } from '@/utils/dummydata';
import {BiSolidChevronDown} from 'react-icons/bi'
import { useState,useEffect } from "react";
import Filterdatalist from "./Filterdatalist";
export default function Contentcategories() {
    const [showsort, setshowsort] = useState(false);
    const [selectedfilter, setselectedfilter] = useState(1);
    const [checkedmenus, setcheckedmenus] = useState([]);
    const [filtercount, setfiltercount] = useState(5);
    const [filtertypes, setfiltertypes] = useState(filtertypesdata);
    const [isfilterbaropen, setisfilterbaropen] = useState(false);

   
    
   
  
    const handleButtonClick = () => {
      setisfilterbaropen(!isfilterbaropen);
    };
  

    const handleCheckboxChange = (index) => {
      const isChecked = checkedmenus.includes(index);
    
      if (!isChecked) {
        setcheckedmenus([index]);
      } else {
        setcheckedmenus([]);
      }
    };
    
    const isVisible = (index) => checkedmenus.includes(index);

    const handelshowmore = (index) => {
       const lengths = filtertypes[index].subcategory.length
       setfiltercount(lengths)
      };
    
      const handelshowless = (index) => {
      setfiltercount(5)
      };
    


    return (
        <div className='w-full'>
            <div className='w-full flex'>
                <div className='w-9/12 flex gap-2 context text-text-secondary'>
                    <div className='flex items-center gap-2 py-1 px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm relative'><FaXmark className=' cursor-pointer text-xs' />Crop Tops</div>

                    <div className='flex items-center gap-2 py-1 px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm'><FaXmark className=' cursor-pointer text-xs' />Floral </div>
                </div>
                <div className='w-3/12 flex gap-2 context justify-between relative '>
                    <button className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-2 bg-white text-opacity-[78%]' onClick={handleButtonClick}>
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


          <div className={`fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm w-[350px] p-4 top-0 z-30 rounded-tl-[28px] border py-3 px-4  context ${isfilterbaropen ? 'block' : 'hidden'}`}>
            <div className="py-3 px-3 w-full flex gap-x-4 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700]">
            <FaXmark className=" cursor-pointer" onClick={() => setisfilterbaropen(false)}/> Filters
            </div>

            <div className="">
            {
                filtertypes.map((items, index) => (
          <div className='w-full flex flex-col  gap-y-2 py-4  border-b border-theme-footer-bg  border-opacity-[40%] context px-3' key={index}>
            <div className=' cursor-pointer' onClick={() => handleCheckboxChange(index)}>
              <div className=' flex  items-center cursor-pointer'>
                <div>
                  <p className=' text-xl font-[600] mb-0'>{items.title}</p>
                </div>

                <button className='text-xl ml-auto'><BiSolidChevronDown className={` transition-all duration-75 ${isVisible(index) && ' rotate-180'}`} /></button>

              </div>
            </div>
            <div className={`${isVisible(index) ? 'block' : 'hidden'}`}>
              <Filterdatalist subcategory={items.subcategory} showCount={filtercount} indexing={index}  onShowMore={() => handelshowmore(index)} onShowLess={() => handelshowless(index)}/>

             
            </div>
            

          </div>
        ))
      }
      
            </div>

            <div className="w-full flex items-center gap-x-4 py-3">
                <button className="w-4/12 border border-[#000000] text-text-secondary text-lg font-[300] py-1 rounded-[22px]">Reset</button>
                <button className="w-8/12 border bg-[#F8B43A] text-text-secondary text-lg font-[500] py-1 rounded-[22px] ">Apply filter</button>
              </div>
          </div>

        </div>
    )
}
