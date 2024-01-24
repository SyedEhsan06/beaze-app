"use client"
import { fetchData } from "@/utils/apicall"
import { useEffect, useState } from "react"
import Link from "next/link"


export default function Shopmenu() {
    const[menus,setmenus] = useState([])
    
    useEffect(() => {
        handelgetshopmenu()
    },[])
    const handelgetshopmenu = async() => {
        try{
            const response = await fetchData('category')
          setmenus(response.categories)

        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="absolute bg-[#EBE9DB] pt-8 pb-12 px-40 w-full left-0 top-[100%] transition-all duration-75">
        <div className="grid grid-cols-3 gap-x-20 gap-y-10">
          {
            menus.map((items,index) => (
                <div className="bg-white p-3  rounded-[7px] transition-all duration-75  border-transparent border hover:border-theme-footer-bg" key={index}>
             <Link href={'/'}>
            <div className="flex items-center gap-x-2">
            <div className="w-4/12 rounded-[7px] ">
               <img src="/images/web/shopmenu/demo.jpg" className="rounded-[7px]" alt="" />
               </div>
               <div className="w-8/12">
                <p className=" text-lg font-[500] text-center" >{items.name}</p>
               </div>
            </div>
             </Link>
            </div>
            ))
          }
        </div>
    </div>
  )
}
