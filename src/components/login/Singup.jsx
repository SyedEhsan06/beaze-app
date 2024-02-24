"use client"
import React from 'react'
import Image from 'next/image'
import Countryinput from '../countryinput/Countryinput'
import { FaCheck } from 'react-icons/fa'
import Link from 'next/link'

export default function Singup() {
  return (
    <div className='h-[100vh] w-[100%] pb-4 pt-8  lg:px-10 px-2 relative mianconlogins'>
      <div className='absolute top-[4%] lg:left-[1%]  left-1/2 transform -translate-x-1/2 z-10 lg:transform-none lg:-translate-x-0">'>
        <Link href={'/'}>
          <Image src="/images/logo.png" fill alt="=logo" className='!static lg:!w-[80%] !w-[100px]' />
        </Link>
      </div>
      <div className='lg:max-w-full max-w-[500px] mx-auto lg:mx-0 lg:flex mt-[70px] lg:mt-0'>
        <div className='w-[60%]  h-[90vh] relative loginbackground lg:flex hidden items-center'>
          <div className=' relative pl-10 z-20'>
            <Image src="/images/web/signup/Rectangle1.png" fill alt="=logo" className='!static ' />
          </div>
          <div className='absolute top-[5%]  right-[32%] z-10'>
            <div className=' relative '>
              <Image src="/images/web/signup/Rectangle3.png" fill alt="=logo" className='!static ' />
            </div>
          </div>

          <div className='absolute bottom-[5%]  right-[25%] z-30'>
            <div className=' relative pl-6'>
              <Image src="/images/web/signup/Rectangle2.png" fill alt="=logo" className='!static ' />
            </div>
          </div>
        </div>
        <div className='lg:w-[40%] w-[100%] flex items-center  lg:p-14 p-8'>
          <div className='w-full'>
            <div>
              <h4 className=' text-center headtext font-[900] lg:text-[2.5rem] text-[1.7rem] text-text-secondary '>
                Create an account
              </h4>
              <p className=' text-center context font-[300] lg:text-lg text-sm mt-1 lg:leading-[1rem] text-text-secondary'>
                Welcome and Buzz on in, Create an account and join us for an un-bee-lievable shopping experience
              </p>
            </div>


            <div className=' lg:mt-12 mt-8'>
              <form className='w-full'>
                <div className=' grid grid-cols-1 gap-y-4'>
                  <div className=" w-full context">
                    <label htmlFor="fnamesignup" className="mb-2">
                      Your First Name
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                        *
                      </sup>
                    </label>
                    <div className="w-full flex border border-text-secondary shadow-input pl-2 pr-3  rounded-lg">
                      <div className="w-[95%] ">
                        <input
                          type="text"
                          id="fnamesignup"
                          className="w-full border-none  focus:outline-none transition-all duration-100  h-[52px]  relative leading-normal checkout-input"

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
                    <div className="w-full flex border border-text-secondary shadow-input pl-2 pr-3 rounded-lg">
                      <div className="w-[95%] ">
                        <input
                          type="text"
                          id="lastname"
                          className="w-full border-none  focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"

                        />
                      </div>
                      <button className="w-[5%] text-[#039C2EB0]">
                        <FaCheck size={14} />
                      </button>
                    </div>
                  </div>
                  <Countryinput />
                </div>


                <button className='w-[100%] lg:mt-5 mt-10 py-4  headtext font-[900] text-text-secondary bg-[#FFD012] lg:text-3xl text-xl rounded-lg button-shadow'>Submit</button>
              </form>
            </div>


            <div className=' lg:mt-4 mt-10'>
              <p className=' text-center context font-[200] lg:text-lg text-sm  mt-2 leading-[1rem]'>
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
