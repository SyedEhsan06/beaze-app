"use client"
import React, { useState, useRef,useEffect } from 'react'
import Image from 'next/image'
import Countryinput from '../countryinput/Countryinput'
import Link from 'next/link'
import { FaRegClock } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function Otpcomp() {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputRefs = Array.from({ length: 6 }, () => useRef());
const [token, setToken] = useState('');
const [error, setError] = useState('');
const [response, setResponse] = useState('');
const router= useRouter();

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
  const url = "http://localhost:3000/api/auth/verifyotp";
  const handleOtpVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    axios.post(url, { otp: otpValue,phone:localStorage.getItem('phone') })
      .then((res) => {
        console.log(res.data);
        if(res.data.error){
          setError(res.data.error);
        }
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
useEffect(() => {
  if(token){
    toast.success('OTP Verified Successfully',{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }
  if(error){
    toast.error('Invalid OTP',{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      setOTP(['', '', '', '', '', '']);
    }
    , 1000);
  }
}
, [token,error]);
  return (
    <div className='h-[100vh] w-[100%] pb-4 pt-8  lg:px-10 px-2 relative  flex items-center lg:block'>
      <div className='absolute lg:top-[4%] top-[6%] lg:left-[1%]  left-1/2 transform -translate-x-1/2 z-10 lg:transform-none lg:-translate-x-0">'>
        <Link href={'/'}>
          <Image src="/images/logo.png" fill alt="=logo" className='!static lg:!w-[80%] !w-[100px]' />
        </Link>
      </div>
      <div className='lg:max-w-full max-w-[500px] mx-auto lg:mx-0 flex  mt-4 lg:mt-0 '>
        <div className='w-[60%]  h-[90vh] relative optbackground lg:flex items-center hidden'>

        </div>
        <div className='lg:w-[40%] w-[100%] flex items-center  lg:p-14 p-8'>
          <div className='w-full'>
            <div>
              <h4 className=' text-center context font-[900] lg:text-[2.5rem] text-[1.7rem]'>
                Enter OTP
              </h4>
              <p className=' text-center context font-[300] lg:text-lg text-sm lg:mt-2 mt-1 lg:leading-[1rem]'>
                Your code is on its way! Give it a moment, and it'll find its path to you.
              </p>
            </div>


            <div className=' mt-12'>
              <form
                onSubmit={handleOtpVerify}
              className='w-full'>
                <div className=' w-full'>
                  <label htmlFor="fnamesignup" className="mb-2 font-[500] context">
                    Your OTP
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>
                  </label>

                  <div className=' grid grid-cols-6 gap-x-3 z-[100]'>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(event) => handleInputChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        maxLength={1}
                        ref={inputRefs[index]}
                        className={`border h-[60px]  transition-all duration-150 text-center rounded-[9px] shadow-input  context font-[500] text-xl leading-normal focus:outline-none ${digit ? ' border-[#039C2E]' : 'border-theme-footer-bg '}`}
                      />
                    ))}

                  </div>

                  <div className=' mt-6 flex gap-3 items-center'>
                     <div>
                     <p className=' font-[500] lg:text-lg text-sm  context'>Haven’t received it yet ?</p>
                     </div>
                     <div>
                     <button className=' items-center flex gap-3 px-5 py-1 bg-[#DED5D5] context  rounded-[9px]  lg:text-sm text-xs font-[500] text-[#717070]  shadow-input '><FaRegClock/> 12s | Resend </button>
                     </div>
                  </div>
                </div>


                <button className='w-[100%] mt-7 py-4  headtext font-[900] text-text-secondary bg-[#FFD012] lg:text-3xl text-xl rounded-lg button-shadow'>Submit</button>
              </form>
            </div>


            <div className=' mt-12'>
              <p className='  text-center context font-[200] lg:text-lg  text-sm mt-2 leading-[1rem]'>
                Want to use a different number ?<br />
                <span className='font-[700]  underline cursor-pointer' ><Link href={'/signup'}> Change it here</Link></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
