import Backbutton from '@/components/checkout/Backbutton'
import React from 'react'



export default function layout({children}) {

  return (
    <div className='mt-16 bg-gray-50 px-5 pt-6 pb-8 relative'>
<Backbutton/>
<div className=' mt-6' >
{children}
</div>
    </div>
  )
}
