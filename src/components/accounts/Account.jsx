"use client"
import { accounttabs } from '@/utils/dummydata'
import React, { useState } from 'react'
import Accountdetails from './Accountdetails'
import Addressdeatils from './Addressdeatils'
import Orderdeatails from './Orderdeatails'

export default function Account() {
    const [tabs, settabs] = useState(0)
    return (
        <div>
            <div className='w-full flex  gap-x-16'>
                <div className='w-[50%]'>
                    <div className=' grid grid-cols-1 gap-y-4'>
                        {
                            accounttabs.map((items, index) => (
                                <div className={`w-full bg-white cursor-pointer shadow-sm border h-[90px] flex items-center px-6 rounded-[13px] transition-all duration-150 ${tabs === index ? 'border-theme-footer-bg' : 'border-transparent'}`} key={index} onClick={() => settabs(index)}>
                                    <h5 className=' font-[800] text-2xl headtext text-text-secondary '>{items.title}</h5>
                                </div>
                            ))
                        }
                    </div>

                    <div className='mt-12'>
                        <div className='w-full flex gap-x-4'>
                            <button className='w-[50%] py-2 border headtext rounded text-text-secondary border-theme-footer-bg font-[800] text-[1.4rem]'>Get Help</button>
                            <button className='w-[50%] py-2 border headtext rounded border-transparent bg-theme-footer-bg text-white font-[800] text-[1.4rem]'>Leave a Review</button>
                        </div>
                    </div>
                </div>


                <div className='w-[50%]'>
                    <div>
                        {
                            tabs === 0 ? <Accountdetails/> : tabs === 1 ? <Addressdeatils/> : <Orderdeatails/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
