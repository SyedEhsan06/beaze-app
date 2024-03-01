import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { Pagination, Keyboard,Scrollbar,Autoplay } from 'swiper/modules';
import 'swiper/css/scrollbar';



export default function Productmobile({ sliderdata,setopemodal }) {
  const [imageindex, setimageindex] = useState(0);

  const progressbar = [
    { val: 0 },
    { val: 1 },
    { val: 2 },
    { val: 3 },
    { val: 4 },
  ];

  return (
    <div className="w-full">
      <div className="w-full h-[390px] relative mb-3 rounded-[8px] ">
        <Image
          src={sliderdata?.[imageindex]}
          layout="fill"
          objectFit="cover"
          alt="mobilesiderimage"
          className="rounded-[8px] transition-all duration-300"
        />
      </div>
      <Swiper
                centeredSlides={false}
                pagination={false}
                modules={[Pagination, Keyboard, Scrollbar, Autoplay]}
                keyboard={{ enabled: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                            delay: 2500,
                        }}
                
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


                            <div className='  cursor-pointer   relative   h-[100px] w-full overflow-hidden rounded-[5px] group-hover:shadow-gray-950  hover:shadow transition-all duration-150 '  onClick={() => {setimageindex(index); window.innerWidth < 767 && setopemodal(true)}}>

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
  );
}
