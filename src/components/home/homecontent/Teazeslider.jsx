"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { Pagination,Keyboard } from 'swiper/modules';
import { teazeproduct } from '@/utils/dummydata';
import Image from 'next/image';

export default function Teazeslider() {
    return (
        <>
            {
                teazeproduct.map((items, index) => (
                    <div key={index} className='lg:px-8 px-4  mb-16 '>
                        <h4 className='text-[2rem] headtext font-[900]  mb-3 capitalize'>{items.heading}</h4>
                        <Swiper
                            centeredSlides={false}
                            pagination={false}
                            modules={[Pagination,Keyboard]}
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
                                    slidesPerView: 4.2,
                                    spaceBetween: 30,
                                }
                            }}
                            className="mySwiper"
                        >
                            {
                                items.products.map((pitems, pindex) => (
                                    <SwiperSlide key={pindex}>
                                        <div className=' w-full cursor-pointer rounded h-auto  group'>
                                            {/* <div className='w-full rounded-2xl'>
                                            {
                                                pitems.img ?  <img src={pitems.img}  className='w-[100%] rounded-2xl'></img> :  <img src='/images/web/product/notfound.png'  className='w-[100%] rounded-2xl'></img>
                                               }
                                            </div> */}


                                            <div className='  cursor-pointer   relative   h-[340px] w-full overflow-hidden rounded-[19px] group-hover:shadow-gray-950  hover:shadow transition-all duration-150 '>

                                                {
                                                    pitems.img ? <Image src={pitems.img} alt="Your Image"
                                                        layout="fill"
                                                        objectFit="cover"   ></Image> : <Image src='/images/web/product/notfound.png' alt="Your Image"
                                                            layout="fill"
                                                            objectFit="cover" ></Image>
                                                }

                                            </div>
                                            <p className="mb-0 context py-2 font-semibold capitalize text-center text-xl">{pitems.title}</p>
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
