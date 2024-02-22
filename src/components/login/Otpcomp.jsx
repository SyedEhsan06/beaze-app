"use client"
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Countryinput from '../countryinput/Countryinput'
import Link from 'next/link'
import { FaRegClock } from "react-icons/fa";


export default function Otpcomp() {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputRefs = Array.from({ length: 6 }, () => useRef());

  const handleInputChange = (index, event) => {
    const value = event.target.value;

    if (isNaN(value) || value === '') {
      return;
    }

    const newOTP = otp.map((digit, i) => (i === index ? value : digit));

    if (index < 5 && value !== '') {
      
      inputRefs[index + 1].current.focus();
    }

    setOTP(newOTP);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {

      inputRefs[index - 1].current.focus();

      const newOTP = [...otp];
      newOTP[index - 1] = '';
      setOTP(newOTP);
    } else if (event.key === 'Backspace' && index >= 0) {

      const newOTP = [...otp];
      newOTP[index] = '';
      setOTP(newOTP);


      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };
  return (
    <div className='h-[100vh] w-[100%] pb-4 pt-8  px-10 relative'>
      <div className='absolute top-[4%] left-[1%] z-10'>
        <Image src="/images/logo.png" fill alt="=logo" className='!static !w-[80%]' />
      </div>
      <div className=' w-full flex  '>
        <div className='w-[60%]  h-[90vh] relative optbackground flex items-center'>

        </div>
        <div className='w-[40%] flex items-center  p-14'>
          <div className='w-full'>
            <div>
              <h4 className=' text-center context font-[900] text-[2.5rem] text-text-secondary '>
                Enter OTP
              </h4>
              <p className=' text-center context font-[300] text-lg mt-2 leading-[1rem]'>
                Your code is on its way! Give it a moment, and it'll find its path to you.
              </p>
            </div>


            <div className=' mt-12'>
              <form className='w-full'>
                <div className=' w-full'>
                  <label htmlFor="fnamesignup" className="mb-2 font-[500] context">
                    Your OTP
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>
                  </label>

                  <div className=' grid grid-cols-6 gap-x-3'>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(event) => handleInputChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        maxLength={1}
                        ref={inputRefs[index]}
                        className={`border pt-4 pb-[14px] transition-all duration-150 text-center rounded-[9px] shadow-md  context font-[500] text-xl leading-normal focus:outline-none ${digit ? ' border-[#039C2E]' : 'border-theme-footer-bg '}`}
                      />
                    ))}

                  </div>

                  <div className=' mt-6 flex gap-3'>
                     <div>
                     <p className=' font-[500] text-lg context'>Haven’t received it yet ?</p>
                     </div>
                     <div>
                     <button className=' items-center flex gap-3 px-5 py-1 bg-[#DED5D5] context  rounded-[9px]  text-sm font-[500] text-[#717070]  shadow-sm '><FaRegClock/> 12s | Resend </button>
                     </div>
                  </div>
                </div>


                <button className='w-[100%] mt-7 py-4  headtext font-[900] text-text-secondary bg-theme-main-color text-3xl rounded-lg shadow'>Submit</button>
              </form>
            </div>


            <div className=' mt-12'>
              <p className=' text-text-secondary text-center context font-[200] text-lg mt-2 leading-[1rem]'>
                Want to use a different number ?<br />
                <span className='font-[700]  underline cursor-pointer' ><Link href={'/signup'}> Change it here</Link></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
