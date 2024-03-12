import Productinfo from '@/components/product/Productinfo'
import React from 'react'

export default function page({params}) {
    
  return (
    <div className='mt-16 lg:mt-[100px]'>
        <Productinfo pid= {params}/>
    </div>
  )
}
