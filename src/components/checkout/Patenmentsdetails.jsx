"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import Countryinput from '../countryinput/Countryinput';
import Modal from "react-awesome-modal";
import { FaXmark } from "react-icons/fa6";



export default function Patenmentsdetails() {
  const [selectedCountry, setSelectedCountry] = useState()
  const [tabs, settabs] = useState(0)
const[ismodalopen,setismodalopen] = useState(false)

const closeModal = () => {
  setismodalopen(false)
}

  return (
    <div className=' w-full'>
      <div className=' flex gap-x-10  headtext font-[600] text-2xl items-center px-4 mt-4 '>
        <div><button className=' font-[800] text-3xl text-[#039C2EB0] text-opacity-[69%] flex items-center'><IoIosCheckmarkCircle size={20} />Cart</button></div>
        <div>
          <div className=' relative max-w-[150px]'>
            <Image src={'/images/web/lognarrow.png'} layout="fill" objectFit="cover" className=' !static' alt={`image not fond`} />
          </div>

        </div>
        <div><button>Checkout</button></div>
        <div>
          <div className=' relative  max-w-[150px] '>
            <Image src={'/images/web/lognarrow.png'} layout="fill" objectFit="cover" className=' !static' alt={`image not fond`} />
          </div>
        </div>
        <div><button className='text-[#998F8F]'>Payment</button></div>
      </div>

      <div className=' grid grid-cols-1 gap-y-5 mt-4'>
        <div className='w-full'>
          <div className={`w-full bg-white p-5 shadow-sm border flex ${tabs === 0 ? 'hidden' : 'block'}`}>
            <h6 className='headtext font-extrabold text-[1.5rem] text-text-secondary '>Welcome Sherlock</h6>
            <button className='ml-auto underline context  text-text-secondary  font-[400] text-lg' onClick={() => settabs(0)}>Edit</button>
          </div>
          <div className={` bg-white p-4 shadow-sm ${tabs === 0 ? 'block' : 'hidden'}`}>
            <div>
              <h6 className=' headtext text-text-secondary font-[700] text-[1rem]'>Access your Account or Checkout as a Guest</h6>
            </div>


            <div className='mt-5'>
              <div className='w-full grid grid-cols-2 gap-5 font-[500] text-lg'>
                <div className=' w-full context'>
                  <label htmlFor="=firstname" className='mb-2'>Your First Name <sup className='text-[#FF2A2A] !top-[5px] text-[24px]' >*</sup> </label>
                  <div className='w-full flex border border-text-secondary shadow-lg pl-2 pr-3 py-3 rounded-lg'>
                    <div className='w-[95%] '>
                      <input type="text" id='firstname' className='w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal checkout-input' placeholder='Your First name' />
                    </div>
                    <button className='w-[5%] text-[#039C2EB0]'><FaCheck size={14} /></button>
                  </div>



                </div>
                <div className=' w-full context'>
                  <label htmlFor="lastname" className='mb-2'>Your Last Name <sup className='text-[#FF2A2A] !top-[5px] text-[24px]' >*</sup> </label>
                  <div className='w-full flex border border-text-secondary shadow-lg pl-2 pr-3 py-3 rounded-lg'>
                    <div className='w-[95%] '>
                      <input type="text" id='lastname' className='w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal checkout-input' placeholder='Your Last name' />
                    </div>
                    <button className='w-[5%] text-[#039C2EB0]'><FaCheck size={14} /></button>
                  </div>



                </div>
             <Countryinput/>
              </div>
              <div className=' w-full my-6 context'>
                <div className=' flex items-center'>
                  <div className='w-[5%]'>
                    <div className=' relative'>
                      <input type="checkbox" id='accout' className=' !top-[-9px] ' />
                    </div>
                  </div>

                  <div className='w-[95%]'>
                    <label htmlFor="accout" className=' font-[400] text-[1rem] cursor-pointer'>Automatically create an account for me</label>
                  </div>
                </div>

                <div className=' flex  items-center mt-1'>
                  <div className='w-[5%]'>
                    <div className=' relative'>
                      <input type="checkbox" id='news' className=' !top-[-9px] ' />
                    </div>
                  </div>

                  <div className='w-[95%]'>
                    <label htmlFor="news" className=' font-[400] text-[1rem] cursor-pointer'>Sign up for news, discounts, updates via whatsapp</label>
                  </div>
                </div>

              </div>

              <div className='w-full flex justify-center'>
                <button className='headtext font-[800]  text-[1.4rem] py-3 w-[40%] rounded bg-theme-footer-bg text-white' onClick={() => setismodalopen(true)}>Send OTP</button>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <div className={`w-full bg-white p-5 shadow-sm border flex ${tabs === 1 ? 'hidden' : 'block'}`}>
            <h6 className='headtext font-extrabold text-[1.5rem] text-text-secondary '>Shipping Details</h6>
            <button className='ml-auto underline context  text-text-secondary  font-[400] text-lg' onClick={() => settabs(1)}>Edit</button>
          </div>
          <div className={` bg-white p-4 shadow-sm ${tabs === 1 ? 'block' : 'hidden'}`}>
            <div className=' flex '>
              <h6 className=' headtext text-text-secondary font-[700] text-[1rem]'>Access your Account or Where do we send your items ?</h6>
              <div className=' flex items-center ms-auto'>
                <div className='w-[25px]'>
                  <div className=' relative'>
                    <input type="checkbox" id='svedaccount' className=' !top-[-8px] !w-[18px] ' />
                  </div>
                </div>

                <div className=''>
                  <label htmlFor="svedaccount" className=' font-[400] text-[1rem] cursor-pointer text-text-secondary context'>Use Saved Address
                  </label>
                </div>
              </div>
            </div>


            <form >
              <div className=' mt-5 grid grid-cols-1 gap-y-2'>
                <div className=' w-full context'>
                  <label htmlFor="add1" className='mb-2'>Address Line 1  <sup className='text-[#FF2A2A] !top-[5px] text-[24px]' >*</sup> </label>

                  <input type="text" id='add1' className='w-full border border-text-secondary shadow-sm px-4 py-3 rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]' placeholder='Flat, House, Building and other details' />
                </div>
                <div className=' w-full context'>
                  <label htmlFor="add2" className='mb-2'>Address Line 2  <sup className='text-[#FF2A2A] !top-[5px] text-[24px]' >*</sup> </label>

                  <input type="text" id='add2' className='w-full border border-text-secondary shadow-sm px-4 py-3 rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]' placeholder='Lane, Street & Landmark' />
                </div>

                <div className=' w-full grid grid-cols-3 gap-x-3'>
                  <div className=' w-full context'>
                    <label htmlFor="City" className='mb-2'>City <sup className='text-[#FF2A2A] !top-[5px] text-[24px]' >*</sup> </label>

                    <input type="text" id='City' className='w-full border border-text-secondary shadow-sm px-4 py-3 rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]' />
                  </div>


                  <div className=' w-full context'>
                    <label htmlFor="State" className='mb-2'>State  <sup className='text-[#FF2A2A] !top-[5px] text-[24px]' >*</sup> </label>

                    <input type="text" id='State' className='w-full border border-text-secondary shadow-sm px-4 py-3 rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]' />
                  </div>

                  <div className=' w-full context'>
                    <label htmlFor="Pincode" className='mb-2'>Pincode  <sup className='text-[#FF2A2A] !top-[5px] text-[24px]' >*</sup> </label>

                    <input type="text" id='Pincode' className='w-full border border-text-secondary shadow-sm px-4 py-3 rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]' />
                  </div>
                </div>
              </div>


              <div className='mt-2'>
                <div className=' flex items-center'>
                  <div className='w-[5%]'>
                    <div className=' relative'>
                      <input type="checkbox" id='billing' className=' !top-[-8px] ' />
                    </div>
                  </div>

                  <div className='w-[95%]'>
                    <label htmlFor="billing" className=' font-[400] text-[1rem] cursor-pointer'>My Billing Address is same as my shipping address</label>
                  </div>


                </div>
              </div>

              <div className='w-full flex justify-center mt-6'>
                <button className='headtext font-[800]  text-[1.4rem] py-3 w-[50%] rounded bg-theme-footer-bg text-white'>Continue to Shipping</button>
              </div>
            </form>

          </div>
        </div>


        <div className='w-full'>
          <div className={`w-full bg-white p-5 shadow-sm border flex ${tabs === 2 ? 'hidden' : 'block'}`}>
            <h6 className='headtext font-extrabold text-[1.5rem] text-text-secondary '>Shipping Fees</h6>
            <button className='ml-auto underline context  text-text-secondary  font-[400] text-lg' onClick={() => settabs(2)}>Edit</button>
          </div>
          <div className={` bg-white p-4 shadow-sm ${tabs === 2 ? 'block' : 'hidden'}`}>
            <div>
              <h6 className=' headtext text-text-secondary font-[700] text-[1rem]'>Calculated Shipping Fees</h6>
            </div>

            <div className='mt-4 context '>
              <div className='p-4  border  rounded-lg'>
                <div className='w-full flex'>
                  <span className='font-[400] text-xl'>Shipping Fees</span>
                  <span className='ml-auto text-lg text-[#039C2E] font-[500]'>Free</span>
                </div>

                <div className='w-full flex mt-2'>
                  <span className='font-[400] text-xl'>Estimated Delivery Date</span>
                  <span className='ml-auto text-lg font-[500]'>10th August, Wednesday</span>
                </div>
              </div>

              <p className='mt-8 text-center text-lg font-[400] leading-normal'>
                Congrats, You’re all set.<br></br> You can continue to payment now
              </p>
            </div>

          </div>
        </div>
      </div>



      <Modal
        visible={ismodalopen}
        effect="fadeInDown"
        onClickAway={closeModal}
      >
       <div className='w-[700px] px-5 pt-3 pb-5'>
       <div className=' flex '>
        <button className='ml-auto' onClick={() => setismodalopen(false)}><FaXmark size={40}/></button>
       </div>
         

         <div className='my-4'>
          <h6 className='context font-[900] text-[2.5rem] text-center'>Enter OTP</h6>


          <div>
            {/* otp box comes here */}
          </div>
         </div>

          <div className=" grid grid-cols-2 gap-x-4 headtext py-2 mt-6">
            <button className=" w-full  text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] ">
              Change Number
            </button>
            <button className=" w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded ">
              Confirm OTP
            </button>

          </div>
       </div>
      </Modal>
    </div>
  )
}
