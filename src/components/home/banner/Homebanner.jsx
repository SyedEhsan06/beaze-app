
import Bannercontent from './Bannercontent'


export default function Homebanner() {
    return (
        <div className='w-full h-[100vh] bannerdiv relative '>
         
            <div className='flex items-center w-full justify-between flex-col h-[100%] py-10 '>
                <Bannercontent />
            </div>
 
        </div>
    )
}
