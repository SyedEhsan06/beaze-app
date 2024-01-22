"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { teazeproduct } from '@/utils/dummydata';
import Image from 'next/image';

export default function Teazeslider() {
    return (
        <>
            {
                teazeproduct.map((items, index) => (
                    <div key={index} className='px-3 mb-16'>
                        <h4 className='text-2xl headtext font-[900]  mb-3 capitalize'>{items.heading}</h4>
                        <Swiper
                            centeredSlides={false}
                            pagination={false}
                            modules={[Pagination]}
                            breakpoints={{
                            0: {
                                slidesPerView: 1.3,
                                spaceBetween: 30,
                            },
                            640: {
                                slidesPerView: 2.2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4.2,
                                spaceBetween: 30,
                            }
                        }}
                            className="mySwiper"
                        >
                            {
                                items.products.map((pitems, pindex) => (
                                    <SwiperSlide key={pindex}>
                                    <div className=' w-full cursor-pointer rounded h-auto'>
                                            <div className='w-full rounded-2xl'>
                                                <img src={pitems.img}  className='rounded-2xl w-[100%] '></img>
                                            </div>
                                            <p className="mb-0 context py-2 font-semibold capitalize text-center">{pitems.title}</p>
                                        </div>
                                    </SwiperSlide>

                                ))
                            }
                        </Swiper>
                    </div>
                ))
            }
        </>
    )
}
