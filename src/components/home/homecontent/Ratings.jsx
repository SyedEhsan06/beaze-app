"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { reviewsdata } from '@/utils/dummydata';
import Stars from './Stars';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useRef } from 'react';

export default function Ratings() {
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    const swiperRef = useRef(null);

    return (
        <div className='bg-[#F7F6F5] py-6 px-16 relative'>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.prevEl = navigationPrevRef.current;
                }}

                className="mySwiper px-24"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    }
                }}
            >
                {
                    reviewsdata.map((items, index) => (
                        <SwiperSlide key={index}>
                            <div className=''>
                                <div className=' marker:cursor-pointer border rounded-2xl shadow-sm bg-white flex flex-col p-8 md:p-14 w-full '>
                                    <Stars rating={items.rating} />
                                    <p className=" context text-lg  md:text-xl xl:text-2xl font-semibold capitalize text-center mb-4">{items.title}</p>
                                    <p className="mb-0 context my-1  capitalize text-center text-sm md:text-lg xl:text-xl">
                                        <ReactReadMoreReadLess
                                            charLimit={180}

                                        >
                                            {items.text}
                                        </ReactReadMoreReadLess>


                                    </p>

                                </div>
                            </div>
                        </SwiperSlide>

                    ))
                }
            </Swiper>

            <div>
                <div>
                    <button onClick={() => swiperRef.current?.slidePrev()} className=' absolute top-[50%] left-3'>
                        <img src="/images/web/slider/prev.png" className='md:w-[70%] w-[50%]' alt="" />
                    </button>
                    <button onClick={() => swiperRef.current?.slideNext()} className=' absolute top-[50%] right-0'>
                        <img src="/images/web/slider/next.png" className='md:w-[70%] w-[50%]' alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}
