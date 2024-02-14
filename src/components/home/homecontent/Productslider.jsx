"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination, Keyboard } from "swiper/modules";
import { homesliderdata } from "@/utils/dummydata";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import Link from "next/link";

export default function Productslider({ data }) {
  const [best, setBest] = useState([]);
  const [explore, setExplore] = useState([]);

  useEffect(() => {
    if (data?.categories) {
      const bestCategory = data.categories.filter(
        (item) => item.type === "best"
      );
      const bestSubCategories = bestCategory
        .flatMap((item) =>
          item.subcategories.filter((subitem) => subitem.type === "best")
        )
        .flat();

      const exploreCategory = data.categories.filter(
        (item) => item.type === "explore"
      );
      const exploreSubCategories = exploreCategory
        .flatMap((item) =>
          item.subcategories.filter((subitem) => subitem.type === "explore")
        )
        .flat();

      setBest([...bestCategory, ...bestSubCategories]);
      setExplore([...exploreCategory, ...exploreSubCategories]);
    }
  }, [data]);
  // const router = useRouter();
  const dispatch = useDispatch();
  const handleFetch = (params) => {
    if (params.subcategories === undefined) {
      let type = "subcategory";
      let item = params.name;
      dispatch(
        fetchProducts({
          type,
          item,
        })
      );
    } else {
      let type = "category";
      let item = params.name;
      dispatch(
        fetchProducts({
          type,
          item,
        })
      );
    }
  };
  return (
    <>
      <div className="lg:px-8 px-4  mb-16">
        <h4 className="text-[2rem] headtext font-[900]  mb-3 capitalize">
          Explore & Discover
        </h4>
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
              slidesPerView: 4.2,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {explore?.map((pitems, pindex) => (
            <SwiperSlide key={pindex}>
              <Link href={`/products/${(pitems.name)
                .toLowerCase()
                .replace(/ /g, "-")
              }`}>
                <div
                  className=" w-full cursor-pointer rounded h-auto group"
                  onClick={() => handleFetch(pitems)}
                >
                  <div className="  cursor-pointer   relative   h-[340px] w-full overflow-hidden rounded-[19px] group-hover:shadow-gray-950  hover:shadow transition-all duration-150 ">
                    {pitems.img ? (
                      <Image
                        src={
                          pitems.img === "categoryimage"
                            ? "/images/web/product/notfound.png"
                            : pitems.img
                        }
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                      ></Image>
                    ) : (
                      <Image
                        src={`/images/web/product/notfound.png`}
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <p className="mb-0 context py-2 font-semibold capitalize text-center text-xl">
                    {pitems.name}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="lg:px-8 px-4  mb-16">
        <h4 className="text-[2rem] headtext font-[900]  mb-3 capitalize">
          Bestseller
        </h4>
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
              slidesPerView: 4.2,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {best?.map((pitems, pindex) => (
            <SwiperSlide key={pindex}>
              <Link href={`/products/${(pitems.name)
              .toLowerCase()
              .replace(/ /g, "-")
              }`}>
                <div
                  className=" w-full cursor-pointer rounded h-auto group"
                  onClick={() => handleFetch(pitems)}
                >
                  <div className="  cursor-pointer   relative   h-[340px] w-full overflow-hidden rounded-[19px] group-hover:shadow-gray-950  hover:shadow transition-all duration-150 ">
                    {pitems.img ? (
                      <Image
                        src={
                          pitems.img === "categoryimage"
                            ? "/images/web/product/notfound.png"
                            : pitems.img
                        }
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                      ></Image>
                    ) : (
                      <Image
                        src={`/images/web/product/notfound.png`}
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <p className="mb-0 context py-2 font-semibold capitalize text-center text-xl">
                    {pitems.name}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
