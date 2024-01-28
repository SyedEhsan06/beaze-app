import React from 'react'
import Sidemenu from './Sidemenu'
import Contentcategories from './Contentcategories'

export default function Containercategories() {
  return (
    <div className='w-full flex '>
      <div className='w-3/12 bg-white shadow'>
        <Sidemenu />
      </div>
      <div className='w-9/12 p-4 bg-gray-50'>
        <Contentcategories />
      </div>
    </div>
  )
}
