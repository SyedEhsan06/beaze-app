"use client"
import Account from '@/components/accounts/Account'
import React from 'react'
import Accounthead from '../../components/accounts/Accounthead'

export default function page() {
  return (
    <>
    <div className="lg:mt-[100px] mt-16 bg-gray-50 lg:px-16 md:px-10 px-5 md:pt-16 pt-12 pb-8 ">
      <Accounthead />
      <div className="md:mt-12 mt-5"><Account/></div>
      </div>
    </>
  )
}
