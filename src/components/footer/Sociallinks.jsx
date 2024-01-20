import { sociallinks } from '@/utils/dummydata'
import Link from 'next/link'

export default function Sociallinks() {
    return (
        <div className=' py-8  bg-white border'>
            <h4 className='text-2xl headtext font-[900] text-center mb-5'>Follow us</h4>
            <div className=' flex justify-center  w-full lg:gap-x-28 gap-x-5'>
                {
                    sociallinks.map((items, index) => (
                        <button className='p-2 rounded-xl bg-gray-950 text-white text-2xl' key={index}><Link href={'/'}>{items.icon}</Link></button>
                    ))
                }
            </div>
        </div>
    )
}
