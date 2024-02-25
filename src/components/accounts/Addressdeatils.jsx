import { Addressdetails } from '@/utils/dummydata'
import React, { useState } from 'react'

export default function Addressdeatils() {
  const [bars, setbars] = useState(0)


  const handelopenadddeatis = (id) => {
    bars === id ? setbars(0) : setbars(id)
  }
  return (
    <div className='w-full'>
      <div className=' grid grid-cols-1 gap-y-4 text-lg font-[500]'>
        {
          Addressdetails.map((items, index) => (
            <div className={`w-full bg-white cursor-pointer shadow-sm  px-10 py-5 rounded-[13px] transition-all duration-150 `} key={index}>
              <div className='w-full flex items-center' onClick={() => handelopenadddeatis(items.id)}>
                <h5 className=' font-[600] text-xl headtext text-text-secondary '>{items.title}</h5>

                <div className='ml-auto'>
                  <img src={bars === items.id ? '/images/web/subicon.png' : '/images/web/addicon.png'} alt="" className='w-[15px]' />
                </div>
              </div>



              <div className={`${items.id === bars ? 'block' : 'hidden'}`}>
                <div className=" lg:mt-5 mt-2 grid grid-cols-1 gap-y-2 lg:text-[1rem] text-sm">
                  <div className=" w-full context">
                    <label htmlFor="add1" className="mb-2">
                      Address Line 1{" "}
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                        *
                      </sup>{" "}
                    </label>

                    <input
                      type="text"
                      id="add1"
                      className="w-full border border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]"
                      placeholder="Flat, House, Building and other details"
                    />
                  </div>
                  <div className=" w-full context">
                    <label htmlFor="add2" className="mb-2">
                      Address Line 2{" "}
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                        *
                      </sup>{" "}
                    </label>

                    <input
                      type="text"
                      id="add2"
                      className="w-full border border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]"
                      placeholder="Lane, Street & Landmark"
                    />
                  </div>

                  <div className=" w-full grid lg:grid-cols-3 grid-cols-2 gap-y-2 lg:gap-y-0 gap-x-3">
                    <div className=" w-full context">
                      <label htmlFor="City" className="mb-2">
                        City{" "}
                        <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                          *
                        </sup>{" "}
                      </label>

                      <input
                        type="text"
                        id="City"
                        className="w-full border border-text-secondary shadow-sm px-4 h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                      />
                    </div>

                    <div className=" w-full context">
                      <label htmlFor="State" className="mb-2">
                        State{" "}
                        <sup className="text-[#FF2A2A] !top-[5px] text-[24px] ">
                          *
                        </sup>{" "}
                      </label>

                      <input
                        type="text"
                        id="State"
                        className="w-full border border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                      />
                    </div>

                    <div className=" w-full context">
                      <label htmlFor="Pincode" className="mb-2">
                        Pincode{" "}
                        <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                          *
                        </sup>{" "}
                      </label>

                      <input
                        type="text"
                        id="Pincode"
                        className="w-full border border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                      />
                    </div>
                  </div>
                </div>


                <div className='mt-12 flex gap-x-10'>
                <button className=' border border-theme-footer-bg w-[50%]  font-[600] text-xl headtext rounded-[21.5px] text-theme-footer-bg py-2  text-center' onClick={() => setbars(0)}>Cancel</button>
                <button className=' bg-[#F8B43A] w-[50%]  font-[600] text-xl headtext rounded-[21.5px] text-theme-footer-bg py-2  text-center border border-transparent'>Save Details</button>
                </div>
              </div>
              

            </div>
          ))
        }
      </div>



      <div className='mt-10'>
        <button className=' bg-[#F8B43A] w-[40%]  font-[600] text-xl headtext rounded-[21.5px] text-theme-footer-bg py-2  text-center'>Add another</button>
      </div>
    </div>
  )
}
