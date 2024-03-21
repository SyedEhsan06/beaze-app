"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Countryinput from '../countryinput/Countryinput';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const[validationerr,setvalidationerr] = useState(false);
  const[checknum,setchecknum] = useState(false)
  const [showicon,setshowicon] = useState(false)

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`
    // console.log(firstname, lastname, phone, country)
  const handleSubmit = async (e) => {
    e.preventDefault();
   if(phone.length === 10){
    localStorage?.setItem('phone', phone);
    setchecknum(false)
    try {
      const response = await axios.post(url, {
        phone:`+91${phone}`,
        firstName,
        lastName,
      });
      if(response.data.message == 'User already exists'){
        setvalidationerr(true)
      }else{
        setvalidationerr(false)
        setResponse(response); // Update response state
      }
      
    } catch (error) {
      console.log(error);
      setError(error); // Update error state
    }
   }else{
  
    setchecknum(true)
   }
  };

  const route = useRouter();

  useEffect(() => {
    if (response) {
      route.push('/otp');
    }
  }, [response, route]);

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  const handlePhoneChange = (enteredPhone) => {
    if(enteredPhone.length >= 1){
      setshowicon(true)
     }else{
      setshowicon(false)
     }

    setPhone(enteredPhone);
  };

  return (
    <div className='h-[100vh] w-[100%] pb-4 pt-8 lg:px-10 px-2 relative mianconlogins flex  lg:block'>
      <div className='absolute top-[4%] lg:left-[1%] left-1/2 transform -translate-x-1/2 z-10  lg:transform-none lg:-translate-x-0'>
        <Link href={'/'}>
          <Image src="/images/logo.png" fill alt="logo" className='!static lg:!w-[80%] !w-[100px] ' />
        </Link>
      </div>
      <div className='lg:max-w-full max-w-[500px] mx-auto lg:mx-0 lg:flex mt-[70px] lg:mt-0'>
        <div className='w-[60%] h-[90vh] relative loginbackground lg:flex hidden items-center'>
          <div className='relative pl-10 z-20  '>
            <Image src="/images/web/signup/Rectangle1.png" fill alt="logo" className='!static' />
          </div>
          <div className='absolute top-[5%] right-[26%] z-10'>
            <div className='relative'>
              <Image src="/images/web/signup/Rectangle3.png" fill alt="logo" className='!static' />
            </div>
          </div>
          <div className='absolute bottom-[0%] right-[20%] z-30'>
            <div className='relative pl-6'>
              <Image src="/images/web/signup/Rectangle2.png" fill alt="logo" className='!static' />
            </div>
          </div>
        </div>
        <div className='lg:w-[40%] w-[100%] flex items-center lg:p-14 p-8'>
          <div className='w-full'>
            <div>
              <h4 className='text-center headtext font-[900] lg:text-[2.5rem] text-[1.7rem] text-text-secondary'>
                Create an account
              </h4>
              <p className='text-center context font-[300] lg:text-lg text-sm mt-1 lg:leading-[1rem] text-text-secondary'>
                Welcome and Buzz on in, Create an account and join us for an un-bee-lievable shopping experience
              </p>

              
            </div>
            <div className='lg:mt-12 mt-8'>
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='grid grid-cols-1 gap-y-4'>
                  <div className="w-full context">
                    <label htmlFor="fnamesignup" className="mb-2">
                      Your First Name
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                        *
                      </sup>
                    </label>
                    <div className="w-full flex border border-text-secondary items-center shadow-input rounded-lg relative overflow-hidden">
                      <div className="w-[100%] ">
                        <input
                        required
                          type="text"
                          id="fnamesignup"
                          className="w-full pl-2 border-none focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"
                          value={firstName}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>
                    {
                      firstName &&   <span className=" text-[#039C2EB0] absolute right-[14px] top-[20px]">
                        <FaCheck size={14} />
                      </span>
                    }
                    </div>
                  </div>
                  <div className="w-full context">
                    <label htmlFor="lastnamesingup" className="mb-2">
                      Your Last Name
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                        *
                      </sup>
                    </label>
                    <div className="w-full flex border border-text-secondary items-center shadow-input relative overflow-hidden rounded-lg">
                      <div className="w-[100%] ">
                        <input
                        required
                          type="text"
                          id="lastname"
                          className="pl-2 w-full border-none focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"
                          value={lastName}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                     {
                      lastName &&  <span className=" absolute right-[14px] top-[20px] text-[#039C2EB0]">
                        <FaCheck size={14} />
                      </span>
                     }
                    </div>
                  </div>
                  <Countryinput required={true} editable={true} onCountryChange={handleCountryChange} onPhoneChange={handlePhoneChange} alreadyresgiter={validationerr} checknumtendigit={checknum} iconshow = {showicon} />
                 <div className={`context w-full leading-3 mt-3 ${validationerr ? 'block' : ' hidden'}`}>
                  <p className=' text-center lg:text-[1rem] text-xs text-[#760000] font-[500]'>😩 Oops, Looks like this number is already registered</p>
                  <p className=' text-center lg:text-[1rem] text-xs underline font-[700]'><Link href='/login'>Try signing in instead</Link></p>
                 </div>

                 <div className={`context w-full leading-3 mt-3 ${checknum ? 'block' : ' hidden'}`}>
                  <p className=' text-center lg:text-[1rem] text-xs text-[#760000] font-[500]'>🤔 Uh Oh, That number does not seem right.</p>
                  <p className=' text-center lg:text-[1rem] text-xs underline font-[700]'>We’d love for you to check it again</p>
                 </div>
                </div>
                <button 
              
                type="submit" className={`  w-[100%] lg:mt-5 mt-10 py-4 headtext font-[900] text-text-secondary bg-[#FFD012] lg:text-3xl text-xl rounded-lg button-shadow
                
             
                `}>Submit</button>
              </form>
            </div>
            <div className='lg:mt-4 mt-10'>
              <p className='text-center context font-[200] lg:text-lg text-sm mt-2 leading-[1rem]'>
                Already have an account ? <br />
                <span className='font-[700] underline cursor-pointer'>
                  <Link href='/login'>Sign in here</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
