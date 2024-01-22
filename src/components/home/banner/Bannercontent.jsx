"use client"
import { MdArrowCircleDown } from "react-icons/md";

export default function Bannercontent() {

    const handleScrollTo620 = () => {
        window.scrollTo({
          top: 622,
          behavior: 'smooth',
        });
      };
    return (
        <>
            <h1 className=" mt-[70px] mb-0 headtext font-[800] text-[100px] uppercase text-white space-x-1 text-with-shadow">Beaze</h1>

            <div className="">
                <h3 className="bg-theme-main-color rounded-3xl mb-0 headtext font-[800] text-2xl text-gray-950  capitalize  space-x-1 py-2 px-20">
                    Shop now
                </h3>
                <p className=" text-[#FFF9B1] context text-sm my-2">Save up to 50% in our sale from July 25 - 30</p>
            </div>


            <div className="">
                <p className="text-sm p-1 text-white context mb-0 font-semibold">Scroll</p>
                <MdArrowCircleDown size={40} className="  cursor-pointer text-white" onClick={handleScrollTo620}/>
            </div>


        </>
    )
}
