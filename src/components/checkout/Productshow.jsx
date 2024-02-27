import React from 'react'
import { searchdatadummy } from '@/utils/dummydata'
import Image from 'next/image'

export default function Productshow() {
  return (
    <div className='h-[80vh] overflow-y-auto w-full bg-white shadow-sm border lg:relative '>
  <div className=' grid grid-cols-1 gap-y-3  px-10 py-8'>
  {searchdatadummy.map((items, index) => (
              <div className="w-full flex gap-3 " key={index}>
                <div className="w-[35%]">
                  <div className="w-full h-[130px] relative mb-3 rounded-[7px]">
                    <Image
                      src={items.img}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[7px] transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="w-[60%] context flex flex-col pb-3 mt-3  ">
                  <h5 className="text-lg font-[500] leading-4">
                    {items.ptitle}
                  </h5>
                  <p className=" text-[1rem] text-text-secondary font-[300]">
                    Size : M | Colour : Black
                  </p>
                  <p className=" text-[1rem] text-text-secondary font-[300]">
                  Quantity : 1
                  </p>
              

                  <p className=" text-[1rem] font-[500] mt-1">
                    INR {items.price}
                  </p>
                </div>
              
              </div>
            ))}
  </div>

  <button className='w-full lg:sticky fixed  bottom-0 left-0 headtext text-white font-extrabold text-[1.5rem] py-2 bg-[#A5A0A8] '>Continue to Payment</button>
    </div>
  )
}
