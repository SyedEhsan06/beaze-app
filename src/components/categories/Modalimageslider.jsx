import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { Pagination, Keyboard } from 'swiper/modules';

export default function ModalImageSlider({ sliderdata }) {
    const [imageindex, setimageindex] = useState(0);

    const progressbar = [
        { val: 0 },
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 4 },
    ];

    return (
        <div className='w-full'>
            <div className='w-full h-[350px] relative mb-3 rounded-[8px]'>
                <Image
                    src={sliderdata?.[imageindex]}
                    layout="fill"
                    objectFit="cover"
                    className='rounded-[8px] transition-all duration-300'
                    alt={`image not fond`}
                />
            </div>
            {/* <div className={`grid grid-cols-${sliderdata?.length} gap-2`}>
                {sliderdata?.map((items, index) => (
                    <div
                        className='w-full h-[100px] relative rounded-[5px] cursor-pointer '
                        key={index}
                        onClick={() => setimageindex(index)}
                    >
                        <Image
                            src={items}
                            layout="fill"
                            objectFit="cover"
                            alt={`${index} index image not fond`}
                            className='rounded-[5px] cursor-pointer hover:opacity-[80%] hover:shadow-sm transition-all duration-150 '
                        />
                    </div>
                ))}
            </div> */}


            <Swiper
                centeredSlides={false}
                pagination={false}
                modules={[Pagination, Keyboard]}
                keyboard={{ enabled: true }}
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: 2.2,
                        spaceBetween: 30,
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


                            <div className='  cursor-pointer   relative   h-[100px] w-full overflow-hidden rounded-[5px] group-hover:shadow-gray-950  hover:shadow transition-all duration-150 '  onClick={() => setimageindex(index)}>

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




            <div className={`w-full mt-3 h-[5px] bg-[#E9E6E0CC] bg-opacity-[80%] `}>
            <div
                        className={`h-[100%] transition-all duration-300 bg-opacity-[80%] w-full bg-[#FFB61DCC]  `}
                        
                    ></div>
            </div>
        </div>
    );
}
