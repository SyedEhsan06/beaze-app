import React from 'react'
import Patenmentsdetails from './Patenmentsdetails'
import Productshow from './Productshow'

export default function Checkout() {
  return (
  <div className=' w-full lg:flex gap-x-5'>
<div className='lg:w-[60%] w-[100%]'>
  <Patenmentsdetails/>
</div>
<div className='lg:w-[40%] lg:mt-0 mt-6'>
  <Productshow/>
</div>
  </div>
  )
}
