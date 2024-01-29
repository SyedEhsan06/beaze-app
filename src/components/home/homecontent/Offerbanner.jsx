import Image from "next/image"

export default function Offerbanner() {
    return (
        <div className="w-full  relative mb-16">
            <div className="w-gull grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="cursor-pointer relative  w-full overflow-hiddenh-[500px] md:block hidden">

                    <Image
                        src={`/images/web/offerbanimage.jpg`}
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>




                <div className="w-full flex flex-col gap-y-2 h-[500px]">
                    <div className='  cursor-pointer   relative   h-[245px] w-full overflow-hidden'>

                        <Image
                            src={`/images/web/bannerquotation.jpg`}
                            alt="Your Image"
                            layout="fill"
                            objectFit="cover"
                        />

                    </div>
                    <div className='  cursor-pointer   relative   h-[245px] w-full overflow-hidden'>

                        <Image
                            src={`/images/web/banneroffer.jpg`}
                            alt="Your Image"
                            layout="fill"
                            objectFit="cover"
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}
