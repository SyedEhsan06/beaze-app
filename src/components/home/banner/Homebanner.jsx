import React from 'react'
import Bannercontent from './Bannercontent'
import Header from '@/components/header/Header'

export default function Homebanner() {
    return (
        <div className='w-full h-[100vh] bannerdiv relative '>

            <Header />
            <div className='flex items-center w-full justify-between flex-col h-[93%] py-10'>
                <Bannercontent />
            </div>

        </div>
    )
}
