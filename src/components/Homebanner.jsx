import React from 'react'
import Header from './Header'
import Bannercontent from './Bannercontent'

export default function Homebanner() {
    return (
        <div className='w-full h-[100vh] bannerdiv relative '>
            <Header />

            <div className='flex items-center w-full justify-center flex-col'>
                <Bannercontent />
            </div>

        </div>
    )
}
