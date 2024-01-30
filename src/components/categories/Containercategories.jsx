import React from 'react'
import Sidemenu from './Sidemenu'
import Contentcategories from './Contentcategories'

export default function Containercategories({params}) {
  
  return (
    <div className='w-full flex '>
      <div className='w-[22%] bg-white shadow'>
        <Sidemenu />
      </div>
      <div className='w-[78%] pt-5 pb-9 px-8 bg-gray-50'>
        <Contentcategories params={params} />
      </div>
    </div>
  )
}
