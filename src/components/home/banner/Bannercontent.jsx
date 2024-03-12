"use client";
import { addMultiCategory, addMultiSubcategory, addSearch, toggleCategory, toggleFix, toggleSubcategory } from "@/redux/slices/filterSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowCircleDown } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function Bannercontent({ data }) {
  const [subcategoryState, setSubcategories] = useState([]);
  const [categoryState, setCategories] = useState([]);
  useEffect(() => {
    if (data?.categories?.length > 0) {
      const subcategories = data?.categories
        ?.map((item) => item.subcategories)
        .flat()
        .map((item) => item.name);
      setSubcategories([...subcategories]);
      const categories = data?.categories?.map((item) => item.name);
      setCategories([...categories]);
    }
  }, [data]);
  const dispatch = useDispatch();
  useEffect(() => {


        dispatch(toggleSubcategory([]));
        dispatch(toggleCategory([]));
        dispatch(toggleFix([]));
    dispatch(addSearch(""));

        dispatch(addMultiSubcategory(subcategoryState));


    
  }, [subcategoryState, categoryState]);
  const handleScrollTo620 = () => {
    window.scrollTo({
      top: 622,
      behavior: "smooth",
    });
  };
  return (
    <>
      <h1 className=" mt-[20px] lg:mt-[30px] mb-0 headtext font-[800] text-[100px] md:text-[150px] uppercase text-white space-x-1 text-with-shadow">
        Beaze
      </h1>

      <div className="">
        <div className="flex justify-center">
          <Link href="/products">
            <button className="bg-theme-main-color rounded-3xl mb-0 headtext font-[800] text-3xl text-gray-950  capitalize    py-2 md:px-28 px-14">
              Shop now
            </button>
          </Link>
        </div>
        <p className=" text-[#FFF9B1] context text-center my-2 text-xl">
          Save up to 50% in our sale from July 25 - 30
        </p>
      </div>

      <div className="">
        <p className="  text-white context mb-0 font-semibold text-xl">
          Scroll
        </p>
        <MdArrowCircleDown
          size={40}
          className="text-center cursor-pointer text-white"
          onClick={handleScrollTo620}
        />
      </div>
    </>
  );
}
