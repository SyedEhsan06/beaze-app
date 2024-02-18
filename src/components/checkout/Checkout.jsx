import React from 'react'
import Patenmentsdetails from './Patenmentsdetails'
import Productshow from './Productshow'

export default function Checkout() {
  return (
  <div className=' w-full flex gap-x-5'>
<div className='w-[60%]'>
  <Patenmentsdetails/>
</div>
<div className='w-[40%]'>
  <Productshow/>
</div>
  </div>
  )
}
