
import Link from "next/link"


export default function Shopmenu({meudata}) {
  
  
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-4 gap-x-5 gap-y-3">
          {
            meudata.map((items,index) => (
                <div className="bg-white p-1  rounded-[7px] transition-all duration-75  border-transparent border hover:border-theme-footer-bg" key={index}>
             <Link href={'/'}>
            <div className="flex items-center gap-x-2">
            <div className="w-3/12 rounded-[7px] ">
              {items.img ?  <img src={`/images/web/shopmenu/${items.img}.jpg`} className="rounded-[7px]" alt="" /> :  <img src="/images/web/product/notfound.png" className="rounded-[7px]" alt="" />}
               </div>
               <div className="w-9/12">
                <p className=" text-lg font-[500] text-center" >{items.name}</p>
               </div>
            </div>
             </Link>
            </div>
            ))
          }
        </div>
  )
}
