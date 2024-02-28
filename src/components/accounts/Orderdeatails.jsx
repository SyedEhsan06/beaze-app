"use client";
import { Addressdetails, orderdetailsdummy } from '@/utils/dummydata'
import axios from 'axios';
import React, { useState } from 'react'
import cookieCutter from 'cookie-cutter'
export default function Orderdeatails() {
  const [bars, setbars] = useState(0)
  const [data, setdata] = useState()
  const token = cookieCutter.get('token')
  useEffect(() => {
  const fetchdata = async () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setdata(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  fetchdata()
  }, [])

  const handelopenadddeatis = (id) => {
    bars === id ? setbars(0) : setbars(id)
  }
  return (
    <div className='w-full'>
    <div className=' grid grid-cols-1 gap-y-4 text-lg font-[500]'>
      {
        orderdetailsdummy.map((items, index) => (
          <div className={`w-full bg-white cursor-pointer shadow-sm  lg:px-10 md:px-8 px-6 lg:py-5 md:py-4 py-3 rounded-[13px] transition-all duration-150 `} key={index}>
            <div className='w-full flex items-center' onClick={() => handelopenadddeatis(items.id)}>
              <h5 className=' font-[600] text-lg headtext text-text-secondary '>{items.date}</h5>

              <div className='ml-auto'>
                <img src={bars === items.id ? '/images/web/subicon.png' : '/images/web/addicon.png'} alt="" className='w-[15px]' />
              </div>
            </div>



            <div className={`${items.id === bars ? 'block' : 'hidden'}`}>
            <div className='w-full  px-3 py-7 context flex gap-x-6 text-text-secondary font-[500] lg:text-lg md:text-[1rem] text-sm'>
           <div className='w-[50%]'>
          <div>
          <h5 className='lg:text-2xl md:text-xl text-lg mb-2'>Order #7834546</h5>
          <p className='mb-2'>5th August, 2023</p>
          <p className='mb-2' >Order Total : Rs. 5413</p>
          </div>

          <div className='mt-4'>
            <span className=' border-b border-text-secondary font-[700]'>Order Details</span>
            <p className='my-2 leading-normal'>Black Lace Top * 1 <br /> Size : M, Colour: Black Black </p>
            <p className='my-2 leading-normal'>Black Lace Top * 1 <br /> Size : M, Colour: Black Black </p>
            <p className='my-2 leading-normal'>Black Lace Top * 1 <br /> Size : M, Colour: Black Black </p>
            <p className='my-2 leading-normal'>Black Lace Top * 1 <br /> Size : M, Colour: Black Black </p>
          </div>
           </div>

           <div className='w-[50%]'>
            <div className='w-full'>
              <p className='my-2 leading-normal'> Shipped to : <br /><br /> 22B Baker Street <br /> Maharashtra India</p>
            </div>
           </div>
            </div>
            </div>
            

          </div>
        ))
      }
    </div>



  </div>
  )
}
