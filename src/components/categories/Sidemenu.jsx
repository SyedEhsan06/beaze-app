"use client"
import { categoriesdata } from '@/utils/dummydata';
import React, { useState } from 'react'
import { BiSolidChevronDown } from "react-icons/bi";


export default function Sidemenu() {
  const [checkedmenus, setcheckedmenus] = useState([]);

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
  return (
    <aside className='w-full  py-0  px-5 overflow-y-auto'>
      {
        categoriesdata.map((items, index) => (
          <div className='w-full flex flex-col  gap-y-2 my-7 context' key={index}>
            <div className=' cursor-pointer' onClick={() => handleCheckboxChange(index)}>
              <div className=' flex gap-x-4 items-center cursor-pointer pl-8'>
                <div>
                  <p className=' text-xl font-[500] mb-0'>{items.title}</p>
                </div>

                <div className='flex items-center'>
                  <button className='text-xl'><BiSolidChevronDown className={` transition-all duration-75 ${isVisible(index) && ' rotate-180'}`} /></button>
                </div>

              </div>
            </div>
            <div className={`${isVisible(index) ? 'block' : 'hidden'}`}>
              {
                items.subcategory.map((subitems, subindex) => (

                  <div className='flex flex-col my-1' key={subindex}>
                    <div className='flex gap-x-4 items-center pb-2'>
                      <div className=' relative w-[15px] h-[15px]'>
                        <input type="checkbox" id={subitems.title + index} />
                      </div>
                      <label htmlFor={subitems.title + index} className=' text-lg cursor-pointer'>{subitems.title}</label>
                    </div>

                  </div>
                ))
              }
            </div>

          </div>
        ))
      }
    </aside>
  )
}
