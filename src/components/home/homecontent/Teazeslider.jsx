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
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2.2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 4.2,
                                spaceBetween: 20,
                            }
                        }}
                            className="mySwiper"
                        >
                            {
                                items.products.map((pitems, pindex) => (
                                    <SwiperSlide key={pindex}>
                                        <div className='w-[240px] cursor-pointer'>
                                            <div className='w-full h-[270px] relative rounded'>
                                                <Image src={pitems.img} fill className='rounded-2xl'></Image>
                                            </div>
                                            <p className="mb-0 context my-1 font-semibold capitalize text-center">{pitems.title}</p>
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
