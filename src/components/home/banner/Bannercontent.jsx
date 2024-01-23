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
            <h1 className=" mt-[70px] mb-0 headtext font-[800] text-[100px] md:text-[150px] uppercase text-white space-x-1 text-with-shadow">Beaze</h1>

            <div className="">
              <div className="flex justify-center">
              <h5 className="bg-theme-main-color rounded-3xl mb-0 headtext font-[800] text-3xl text-gray-950  capitalize    py-2 md:px-28 px-14">
                    Shop now
                </h5>
              </div>
                <p className=" text-[#FFF9B1] context text-center my-2 text-xl">Save up to 50% in our sale from July 25 - 30</p>
            </div>


            <div className="">
                <p className="  text-white context mb-0 font-semibold text-xl">Scroll</p>
                <MdArrowCircleDown size={40} className="text-center cursor-pointer text-white" onClick={handleScrollTo620}/>
            </div>


        </>
    )
}
