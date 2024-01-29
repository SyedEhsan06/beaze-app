"use client"
import { categoriesdata } from '@/utils/dummydata';
import React, { useState } from 'react'
import { BiSolidChevronDown } from "react-icons/bi";
import Sidemenufilterlist from './Sidemenufilterlist';


export default function Sidemenu() {
  const [checkedmenus, setcheckedmenus] = useState([]);
  const [filtercount, setfiltercount] = useState(5);
  

  const handleCheckboxChange = (index) => {
    const currentIndex = checkedmenus.indexOf(index);
    const newCheckedItems = [...checkedmenus];

    if (currentIndex === -1) {
      newCheckedItems.push(index);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setcheckedmenus(newCheckedItems);
  };

  const isVisible = (index) => checkedmenus.includes(index);

  const handelshowmore = (index) => {
    const lengths = categoriesdata[index].subcategory.length
    setfiltercount(lengths)
  };

  const handelshowless = (index) => {
    setfiltercount(5)
  };
  return (
    <aside className='w-full  py-0  px-5 overflow-y-auto'>
      {
        categoriesdata.map((items, index) => (
          <div className='w-full flex flex-col  gap-y-2 my-7 context' key={index}>
            <div className=' cursor-pointer' onClick={() => handleCheckboxChange(index)}>
              <div className=' flex gap-x-4 items-center cursor-pointer pl-[1.5rem]'>
                <div>
                  <p className=' text-xl font-[500] mb-0 leading-[1.50rem]'>{items.title}</p>
                </div>

                <div className='flex items-center'>
                  <button className='text-xl'><BiSolidChevronDown className={` transition-all duration-75 ${isVisible(index) && ' rotate-180'}`} /></button>
                </div>

              </div>
            </div>
            <div className={`${isVisible(index) ? 'block' : 'hidden'}`}>
             <Sidemenufilterlist subcategory={items.subcategory} showCount={filtercount} indexing={index} onShowMore={() => handelshowmore(index)} onShowLess={() => handelshowless(index)}/>
            </div>

          </div>
        ))
      }
    </aside>
  )
}
