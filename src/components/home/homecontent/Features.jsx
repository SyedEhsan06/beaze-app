import { featuresdata } from "@/utils/dummydata"

export default function Features() {
    return (
        <div className="lg:px-8 px-4">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8  lg:gap-28 items-center  mb-16">
                {
                    featuresdata.map((items, index) => (
                        <div className=" w-full flex justify-center flex-col items-center " key={index}>
               <div className="w-full  bg-[#D9D9D9]  rounded-[50%]">
             <div className="w-[100%] ">
             <img src={items.icon} alt=""  className="w-[100%] " />
             </div>
               </div>
                          
                            <p className="mb-0 context mt-8 font-semibold capitalize md:text-xl text-lg">{items.name}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
