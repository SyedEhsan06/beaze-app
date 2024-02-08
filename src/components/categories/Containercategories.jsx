import React from 'react'
import Sidemenu from './Sidemenu'
import Contentcategories from './Contentcategories'

export default function Containercategories({params}) {
  
  return (
    <div className='w-full flex '>
      <div className='lg:w-[22%] bg-white shadow hidden lg:block'>
        <Sidemenu />
      </div>
      <div className='lg:w-[78%] w-[100%] lg:pt-5 pt-2 pb-9 lg:px-8 px-4 bg-gray-50'>
        <Contentcategories params={params} />
      </div>
    </div>
  )
}
