import { featuresdata } from "@/utils/dummydata"

export default function Features() {
    return (
        <div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 items-center px-2 mb-16">
                {
                    featuresdata.map((items, index) => (
                        <div className=" w-full flex justify-center flex-col items-center" key={index}>
                            <div className="rounded-[50%] p-16 md:p-24  bg-[#D9D9D9]"></div>
                            <p className="mb-0 context my-1 font-semibold capitalize">{items.name}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
