"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { homesliderdata } from '@/utils/dummydata';
import Image from 'next/image';

export default function Productslider() {
    return (
        <>
            {
                homesliderdata.map((items, index) => (
                    <div key={index}>
                        <h4 className='text-2xl headtext font-[900]  mb-3 capitalize'>{items.heading}</h4>
                        <Swiper
                            slidesPerView={4.2}
                            spaceBetween={10}
                            centeredSlides={false}
                            pagination={false}
                            modules={[Pagination]}
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
