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
  const [swiperProgress, setSwiperProgress] = useState(0);

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
                modules={[Pagination, Keyboard, Autoplay]}
                keyboard={{ enabled: true }}
                // scrollbar={{ draggable: true }}
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
                onSlideChange={(swiper) => setSwiperProgress((swiper.activeIndex + 1) / swiper.slides.length * 100)}
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


            <div className="w-full mt-3 h-[5px] bg-[#E9E6E0CC] bg-opacity-[80%]">
    <div
        className="h-[100%] transition-all duration-300 bg-opacity-[80%] bg-[#FFB61DCC]"
        style={{ width: `${swiperProgress+40}%` }}
    ></div>
</div>
      
          
    </div>
  );
}
