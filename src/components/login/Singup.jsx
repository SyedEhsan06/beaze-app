"use client"
import React from 'react'
import Image from 'next/image'
import Countryinput from '../countryinput/Countryinput'
import { FaCheck } from 'react-icons/fa'
import Link from 'next/link'

export default function Singup() {
  return (
    <div className='h-[100vh] w-[100%] pb-4 pt-8  px-10 relative'>
<div className='absolute top-[4%] left-[1%] z-10'>
<Image src="/images/logo.png" fill  alt="=logo" className='!static !w-[80%]' />
</div>
        <div className=' w-full flex  '>
        <div className='w-[60%]  h-[90vh] relative loginbackground flex items-center'>
        <div className=' relative pl-10 z-20'>
        <Image src="/images/web/signup/Rectangle1.png" fill  alt="=logo" className='!static ' />
        </div>
        <div className='absolute top-[5%]  right-[32%] z-10'>
        <div className=' relative '>
        <Image src="/images/web/signup/Rectangle3.png" fill  alt="=logo" className='!static ' />
        </div>
        </div>

        <div className='absolute bottom-[5%]  right-[25%] z-30'>
        <div className=' relative pl-6'>
        <Image src="/images/web/signup/Rectangle2.png" fill  alt="=logo" className='!static ' />
        </div>
        </div>
        </div>
        <div className='w-[40%] flex items-center  p-14'>
          <div className='w-full'>
           <div>
           <h4 className=' text-center headtext font-[900] text-[2.5rem] text-text-secondary '>
           Create an account
            </h4>
            <p className=' text-center context font-[300] text-lg mt-2 leading-[1rem]'>
            Welcome and Buzz on in, Create an account and join us for an un-bee-lievable shopping experience
            </p>
           </div>


           <div className=' mt-12'>
            <form  className='w-full'>
              <div className=' grid grid-cols-1 gap-y-4'>
              <div className=" w-full context">
                  <label htmlFor="fnamesignup" className="mb-2">
                  Your First Name
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>
                  </label>
                  <div className="w-full flex border border-text-secondary shadow-sm-lg pl-2 pr-3 py-[13px] rounded-lg">
                    <div className="w-[95%] ">
                      <input
                        type="text"
                        id="fnamesignup"
                        className="w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal checkout-input"
                        placeholder="Your First Name"
                      />
                    </div>
                    <button className="w-[5%] text-[#039C2EB0]">
                      <FaCheck size={14} />
                    </button>
                  </div>
                </div>
              <div className=" w-full context">
                  <label htmlFor="lastnamesingup" className="mb-2">
                    Your Last Name
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>
                  </label>
                  <div className="w-full flex border border-text-secondary shadow-sm-lg pl-2 pr-3 py-[13px] rounded-lg">
                    <div className="w-[95%] ">
                      <input
                        type="text"
                        id="lastname"
                        className="w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal checkout-input"
                        placeholder="lastnamesingup"
                      />
                    </div>
                    <button className="w-[5%] text-[#039C2EB0]">
                      <FaCheck size={14} />
                    </button>
                  </div>
                </div>
            <Countryinput/>
              </div>


          <button className='w-[100%] mt-8 py-4  headtext font-[900] text-text-secondary bg-theme-main-color text-3xl rounded-lg shadow'>Submit</button>
            </form>
           </div>


           <div className=' mt-4'>
           <p className=' text-text-secondary text-center context font-[200] text-lg mt-2 leading-[1rem]'>
           Already have an account ? <br />
           <span className='font-[700]  underline cursor-pointer' ><Link href='/login'> Sign in here</Link></span>
            </p>
           </div>
          </div>
        </div>
        </div>
    </div>
  )
}
