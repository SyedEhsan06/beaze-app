"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSubcategory, toggleSubcategory } from "@/redux/slices/filterSlice";
import { usePathname, useRouter } from "next/navigation";
import { selectCategoryProduct } from "@/redux/slices/productSlice";

export default function Sidemenufilterlist({
  subcategory,
  showCount,
  indexing,
  onSubcategorySelect,
  onShowMore,
  onShowLess,
}) {
  const dispatch = useDispatch();
  const selectedSubcategories = useSelector(selectSubcategory);

  const handleCheckboxChange = (itemName) => {
    dispatch(toggleSubcategory(itemName));
  };
  const usepathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    dispatch(toggleSubcategory([])); 
  }, [usepathname]);
  const currentData=useSelector(selectCategoryProduct)
  const [data, setData] = useState([]);
  useEffect(() => {
    if (currentData) {
      setData(currentData);
    }
  }
  , [currentData]);
  const catsFromData = data?.response?.products.map((item) => item.subcategory);
  const cats = [...new Set(catsFromData)];
  console.log('cats',cats)
  return (
    <div>
      {subcategory?.slice(0, showCount).map((item, index) => (
        <div className="flex flex-col my-1" key={index}>
          <div className="flex gap-x-4 items-center pb-2">
            <div className="relative w-[15px] h-[15px]">
              <input
                type="checkbox"
                id={item.name + indexing}
                onChange={() => handleCheckboxChange(item.name)}
                checked={selectedSubcategories.includes(item.name) || cats.includes(item.name)}
              />
            </div>
            <label
              htmlFor={item.name + indexing}
              className="text-lg cursor-pointer"
            >
              {item.name}
            </label>
          </div>
        </div>
      ))}

      {showCount === 5 && subcategory.length >= 5 ? (
        <button
          onClick={onShowMore}
          className="text-sm text-[#FFB61D] font-[500] underline"
        >
          View More
        </button>
      ) : showCount > 5 ? (
        <button
          onClick={onShowLess}
          className="text-sm text-[#FFB61D] font-[500] underline"
        >
          View Less
        </button>
      ) : null}
    </div>
  );
}
