"use client"
import React, { useState } from 'react'
import ModalImageSlider from './Modalimageslider'
import { FaXmark,FaChevronLeft  } from "react-icons/fa6";
import {BiSolidChevronDown} from 'react-icons/bi'
import {RiSubtractLine} from 'react-icons/ri'
import {IoMdAdd} from 'react-icons/io'
import Image from 'next/image';

export default function Productmodal({produtdata,modalclose}) {
    const [quantity,setquantity] = useState(1);
    const[sizeindex,setsizeindex] = useState(1);
    const [imageindex, setimageindex] = useState(0);
    const[showimage,setshowimage] = useState(true)

  return (
  <>
    {
    showimage ? <div className='px-5 pt-6 pb-8 relative'>
    <button className=' absolute top-[10px] right-3 z-10' onClick={() => {modalclose(); setshowimage(false)}}><FaXmark size={30}/></button>
    <button className=' absolute top-[10px] left-3 z-10' onClick={() => setshowimage(false)}><FaChevronLeft  size={30}/></button>
<div className=' mt-7'>
<div className='w-full h-[350px] relative mb-3 rounded-[8px] lg:hidden block'>
                <Image
                    src={produtdata?.images?.[imageindex]}
                    layout="fill"
                    objectFit="cover"
                    className='rounded-[8px] transition-all duration-300'
                    alt={`image not fond`}
                />
            </div>
</div>

    </div> :   <div className="px-5 pt-6 pb-8 relative md:min-h-[500px] md:max-h-[650px] overflow-y-auto ">
     <button className=' absolute top-[10px] right-3 z-10' onClick={() => modalclose()}><FaXmark size={30}/></button>
    <div className="w-full lg:flex lg:gap-x-5 grid grid-cols-1 gap-y-5 lg:gap-y-0">
  <div className="lg:w-[45%] ">
    <ModalImageSlider sliderdata ={produtdata.images} showonphone = {setshowimage} imageindex={imageindex} setimageindex={setimageindex}/>
  </div>
  <div className="lg:w-[50%] flex flex-col gap-4 lg:gap-0   justify-between">
  <div className="w-full flex flex-col">
              
              <h5 className="headtext font-semibold text-3xl leading-[2.8rem]">{produtdata.title}</h5>
              <p className="context font-[500] text-2xl">INR {produtdata.price}</p>

              <p className="context mt-2 text-[1rem] text-opacity-[50%] font-[300]">
                {produtdata.description}
              </p>
            </div>


            <div className="context ">
              <div className="w-full">
                <p className=" font-[400] text-lg" >Select a size</p>
                <div className="flex mt-1 gap-2 flex-wrap">
                {produtdata.attributes && Array.isArray(produtdata.attributes[1]?.value) &&
                    produtdata.attributes[1].value.map((items, index) => (
                      <button key={index} className={` transition-all duration-150 font-[400] text-sm border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] px-2 py-1 ${sizeindex === index ? ' bg-theme-footer-bg text-white text-opacity-[100%]' : 'text-opacity-[50%] text-[#00000096]'}`} onClick={() => setsizeindex(index)}>
                        {items}
                      </button>
                    ))}

                </div>
              </div>
            </div>




            <div className=" context ">
              <div className="w-full">
                <label htmlFor="sizeselect" className=" font-[400] text-lg">Select a colour</label>
            <div className="w-[40%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] px-4 py-1 flex items-center">
          <div className="w-[90%]">
            <select className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer"  id="sizeselect">
              <option value="">Select Colour</option>
              {produtdata.attributes && Array.isArray(produtdata.attributes[0]?.value) &&
                produtdata.attributes[0].value.map((items, index) => (
                      <option value="" key={index}>{items}</option>
                    ))}
            </select>
          </div>

          <div className="w-[10%]">
            <BiSolidChevronDown size={20}  className=" text-gray-950"/>
          </div>
            </div>
              </div>
            </div>



            <div className=" context">
              <div className="w-full">
                <p  className=" font-[400] text-lg">Select quantity</p>
            <div className="w-[30%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 ">
                <button disabled={quantity === 1 ? true : false} className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer" onClick={() =>setquantity(quantity-1)}><RiSubtractLine  size={20}/></button> 
                <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1">{quantity}</div> 
                <button className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer"  onClick={() =>setquantity(quantity+1)}><IoMdAdd  size={20}/></button> 
            </div>
              </div>
            </div>


            <div className=" grid grid-cols-1 gap-y-4 headtext ">
                <button className=" w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded lg:hover:bg-opacity-[90%] lg:hover:shadow-sm transition-all duration-150 " >Checkout</button>
                <button className=" w-full  text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] " onClick={() => modalclose()}>Cancel</button>
            </div>



   
  </div>
    </div>
  </div>
    }
  </>
  )
}
