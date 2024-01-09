import { MdArrowCircleDown } from "react-icons/md";

export default function Bannercontent() {
    return (
        <>
            <h1 className=" pt-5 pb-10 mb-0 headtext font-[800] text-[100px] uppercase text-white space-x-1 text-with-shadow">Beaze</h1>

            <div className=" pt-14">
                <h3 className="bg-[#FFEA00] rounded-3xl mb-0 headtext font-[800] text-2xl text-gray-950  capitalize  space-x-1 py-2 px-20">
                    Shop now
                </h3>
                <p className="mb-0 text-[#FFF9B1] context text-sm py-2">Save up to 50% in our sale from July 25 - 30</p>
            </div>


            <div className=" pt-24 ">
                <p className="text-sm p-1 text-white context mb-0 font-semibold">Scroll</p>
                <MdArrowCircleDown size={40} className="  cursor-pointer text-white" />
            </div>


        </>
    )
}
