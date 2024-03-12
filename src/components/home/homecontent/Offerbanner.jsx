import Image from "next/image"

export default function Offerbanner() {
    return (
        <div className="w-full  relative mb-16">
            <div className="w-full flex gap-2">
                <div className="cursor-pointer relative  md:w-[60%]   overflow-hiddenh-[660px] md:block hidden">

                    <Image
                        src={`/images/web/offerbanimage.jpg`}
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>




                <div className="md:w-[40%] w-[100%] flex flex-col gap-y-3 h-[660px]">
                    <div className='  cursor-pointer   relative   h-[322px] w-full overflow-hidden'>

                        <Image
                            src={`/images/web/bannerquotation.jpg`}
                            alt="Your Image"
                            layout="fill"
                            objectFit="cover"
                        />

                    </div>
                    <div className='  cursor-pointer   relative   h-[322px] w-full overflow-hidden'>

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
