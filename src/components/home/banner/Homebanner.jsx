
import Bannercontent from './Bannercontent'


export default function Homebanner({data}) {
    return (
        <div className='w-full h-[100vh] bannerdiv relative '>
         
            <div className='flex items-center w-full justify-between flex-col h-[100%] py-10 '>
                <Bannercontent data={data} />
            </div>
 
        </div>
    )
}
