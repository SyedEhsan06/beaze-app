import Image from "next/image"

export default function Offerbanner() {
    return (
        <div className="w-full h-[200px] lg:h-[450px] relative mb-16">
            <Image src='/images/web/offerbanner.jpg' fill alt="offer banner"></Image>
        </div>
    )
}
