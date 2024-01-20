"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { reviewsdata } from '@/utils/dummydata';
import Stars from './Stars';

export default function Ratings() {
    return (
        <div className='bg-[#F7F6F5] py-6 px-7'>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            }
                        }}
            >
                {
                    reviewsdata.map((items, index) => (
                        <SwiperSlide key={index}>
                            <div className='px-10'>
                                <div className=' marker:cursor-pointer border rounded-2xl shadow-sm bg-white flex flex-col h-[450px] lg:h-[300px] p-10 w-full '>
                                    <Stars rating={items.rating} />
                                    <p className=" context text-lg font-semibold capitalize text-center mb-4">{items.title}</p>
                                    <p className="mb-0 context my-1  capitalize text-center text-sm">{items.text}</p>

                                </div>
                            </div>
                        </SwiperSlide>

                    ))
                }
            </Swiper>
        </div>
    )
}
