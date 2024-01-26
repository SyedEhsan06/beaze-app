import Image from "next/image"

export default function Offerbanner() {
    return (
        <div className="w-full  relative mb-16">
            <img src='/images/web/offerbanner.jpg' className="w-[100%] hidden md:block" alt="offer banner"></img>
            <img src='/images/web/offerbannersm.png' className="w-[100%] md:hidden" alt="offer banner"></img>
        </div>
    )
}
