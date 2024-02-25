import { Addressdetails, orderdetailsdummy } from '@/utils/dummydata'
import React, { useState } from 'react'

export default function Orderdeatails() {
  const [bars, setbars] = useState(0)


  const handelopenadddeatis = (id) => {
    bars === id ? setbars(0) : setbars(id)
  }
  return (
    <div className='w-full'>
    <div className=' grid grid-cols-1 gap-y-4 text-lg font-[500]'>
      {
        orderdetailsdummy.map((items, index) => (
          <div className={`w-full bg-white cursor-pointer shadow-sm  px-10 py-5 rounded-[13px] transition-all duration-150 `} key={index}>
            <div className='w-full flex items-center' onClick={() => handelopenadddeatis(items.id)}>
              <h5 className=' font-[600] text-lg headtext text-text-secondary '>{items.date}</h5>

              <div className='ml-auto'>
                <img src={bars === items.id ? '/images/web/subicon.png' : '/images/web/addicon.png'} alt="" className='w-[15px]' />
              </div>
            </div>



            <div className={`${items.id === bars ? 'block' : 'hidden'}`}>
           
            </div>
            

          </div>
        ))
      }
    </div>



  </div>
  )
}
