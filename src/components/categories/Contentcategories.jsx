"use client"
import { FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import { categoryProducts, filtertypes, filtertypesdata } from '@/utils/dummydata';
import { BiSolidChevronDown } from 'react-icons/bi'
import { useState, useEffect,useRef } from "react";
import Filterdatalist from "./Filterdatalist";
import Image from "next/image";
export default function Contentcategories() {
  const [showsort, setshowsort] = useState(false);
  const [selectedfilter, setselectedfilter] = useState(1);
  const [checkedmenus, setcheckedmenus] = useState([]);
  const [filtercount, setfiltercount] = useState(5);
  const [filtertypes, setfiltertypes] = useState(filtertypesdata);
  const [isfilterbaropen, setisfilterbaropen] = useState(false);
  const divRef = useRef();
  

  useEffect(() => {
    const handleBodyClick = (event) => {
      const clickedElement = event.target;
      if (divRef.current && !clickedElement.classList.contains('your-specific-class')) {
        let ancestor = clickedElement.parentElement;

        while (ancestor && ancestor !== document.body) {
          if (ancestor.classList.contains('your-specific-class')) {
            return;
          }
          ancestor = ancestor.parentElement;
        }

        setisfilterbaropen(false)
      }
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []); 



  const handleButtonClick = () => {
    setisfilterbaropen(!isfilterbaropen);
  };


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
    const lengths = filtertypes[index].subcategory.length
    setfiltercount(lengths)
  };

  const handelshowless = (index) => {
    setfiltercount(5)
  };



  return (
    <div className='w-full'>
      <div className='w-full flex pt-3 pb-2 gap-x-4'>
        <div className='w-8/12 flex gap-2 context text-text-secondary flex-wrap'>
          <div>
            <div className='flex items-center gap-2  px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm relative py-1'><FaXmark className=' cursor-pointer text-xs' />Crop Tops</div>
          </div>

          <div>
            <div className='flex items-center gap-2  px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm py-1'><FaXmark className=' cursor-pointer text-xs' />Floral </div>
          </div>

        </div>
        <div className='w-4/12 flex gap-3 context justify-between relative items-center '>
          <div>
            <button className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-4 bg-white text-opacity-[78%]' onClick={handleButtonClick}>
              <HiBars3 /><span className="mt-[2px]"> More filters</span>
            </button>
          </div>

          <div>
            <button className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-4 bg-white text-opacity-[78%] ' onClick={() => setshowsort(!showsort)}>
              <FaAngleDown className={`transition-all duration-75 ${showsort && 'rotate-[180deg]'}`} /> Sort
            </button>
          </div>

          <div className={`top-[110%] w-[200px] border  right-0 bg-white shadow rounded-lg absolute z-20 ${showsort ? 'block' : 'hidden'}`}>
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

      <div className='mt-5 grid grid-cols-4 gap-8 context'>
        {
          categoryProducts.map((items, index) => (
            <div key={index} className=" group relative">
              <div className=' flex flex-col text-[#03071E]'>
                <div className='   cursor-pointer  transition-all duration-100 relative rounded-[6px]  group-hover:opacity-50 h-[200px] w-full overflow-hidden'>
                  {/* <img src={`/images/web/categories/${items.img}`} alt="" className="h-[100%] w-[100%]" /> */}
                  <Image
                    src={`/images/web/categories/${items.img}`}
                    alt="Your Image"
                    layout="fill"
                    objectFit="cover" 
                  />

                </div>
                <h6 className=' font-[700]  text-[1.1rem] mt-2  leading-[1rem] '>{items.pname}</h6>
                <p className='py-1 text-[1rem] font-[400]'>Rs {items.price}</p>
                <button className=' transition-all duration-100 w-full py-2 text-center bg-theme-footer-bg rounded text-white text-lg font-[400] hover:bg-opacity-[80%]'>Add to Cart</button>
              </div>
              <p className='w-[70%] transition-all duration-100 cursor-pointer rounded-xl absolute left-[50%] translate-x-[-50%] hidden group-hover:block top-[50%] z-10 bg-button-secondary px-5  text-text-secondary text-[1rem]  text-center  hover:shadow-gray-950  hover:shadow'  >Quick buy</p>
            </div>
          ))
        }
      </div>


      <div className={`your-specific-class fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm w-[350px] p-4 top-0 z-30 rounded-tl-[28px] border py-3 px-4  context ${isfilterbaropen ? 'block' : 'hidden'}`} ref={divRef}>
        <div className="py-3 px-3 w-full flex gap-x-4 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700]">
          <FaXmark className=" cursor-pointer" onClick={() => setisfilterbaropen(false)} /> Filters
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
                <div className={` ${isVisible(index) ? 'block' : 'hidden'}`} >
                  <Filterdatalist subcategory={items.subcategory} showCount={filtercount} indexing={index} onShowMore={() => handelshowmore(index)} onShowLess={() => handelshowless(index)} />


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
