import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { Pagination, Keyboard } from 'swiper/modules';

export default function ModalImageSlider({ sliderdata,showonphone,imageindex,setimageindex }) {
  
const [showfullimage,setshowfullimage] = useState(true)

    const progressbar = [
        { val: 0 },
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 4 },
    ];

    return (
        <div className='w-full'>
            <div className='w-full h-[350px] relative mb-3 rounded-[8px] lg:block hidden'>
                <Image
                    src={sliderdata?.[imageindex]}
                    layout="fill"
                    objectFit="cover"
                    className='rounded-[8px] transition-all duration-300'
                    alt={`image not fond`}
                />
            </div>
        


          <div className='mt-5 md:mt-0'>
          <Swiper
                centeredSlides={false}
                pagination={false}
                modules={[Pagination, Keyboard]}
                keyboard={{ enabled: true }}
                breakpoints={{
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    }
                }}
                className="mySwiper"
            >
                {
                    sliderdata?.map((items, index) => (
                        <SwiperSlide key={index}>


                            <div className='  cursor-pointer   relative   h-[100px] w-full overflow-hidden rounded-[5px] group-hover:shadow-gray-950  hover:shadow transition-all duration-150 '  onClick={() => {setimageindex(index); window.innerWidth < 767 && showonphone(true)}}>

                                {
                                    items ? <Image src={items} alt="Your Image"
                                        layout="fill"
                                        objectFit="cover"   ></Image> : <Image src='/images/web/product/notfound.png' alt="Your Image"
                                            layout="fill"
                                            objectFit="cover" ></Image>
                                }

                            </div>
                        </SwiperSlide>

                    ))
                }
            </Swiper>

          </div>



            <div className={`w-full mt-3 h-[5px] bg-[#E9E6E0CC] bg-opacity-[80%] `}>
            <div
                        className={`h-[100%] transition-all duration-300 bg-opacity-[80%]  bg-[#FFB61DCC] w-[40%]  `}
                        
                    ></div>
            </div>
        </div>
    );
}
