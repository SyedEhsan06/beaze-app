"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMultiSubcategory, selectCategory, selectFix, selectSubcategory, toggleFix, toggleSubcategory } from "@/redux/slices/filterSlice";
import { usePathname, useRouter } from "next/navigation";
import { selectCategoryProduct } from "@/redux/slices/productSlice";
import { selectCategories } from "@/redux/slices/categorySlice";

export default function Sidemenufilterlist({
  category,
  subcategory,
  categorySelect,
  showCount,
  indexing,
  onSubcategorySelect,
  onShowMore,
  onShowLess,
}) {
  const dispatch = useDispatch();
  console.log(category);
  const selectedSubcategories = useSelector(selectSubcategory);
  console.log(selectedSubcategories);
  const currentData=useSelector(selectCategoryProduct)
  const [data, setData] = useState([]);
  useEffect(() => {
    if (currentData) {
      setData(currentData);
    }
  }
  , [currentData]);
 const allcategories = useSelector(selectCategories)
 const allsubcategories = allcategories?.categories?.filter((item) => item.subcategories.length > 0).map((item) => item.name)
  const catsFromData = data?.response?.products.map((item) => item.subcategory);
  const categories = useSelector(selectCategory);
  const cats = [...new Set(catsFromData)];
  const fixSelect = useSelector(selectFix);
  const handleCheckboxChange = (itemName) => {
    setTimeout(() => {
      dispatch(toggleSubcategory(itemName));
    }, 300);
  };
  
  useEffect(() => {
    if(allsubcategories?.length <= selectedSubcategories?.length){
      dispatch(toggleSubcategory([]));
      dispatch(addMultiSubcategory([]));
      console.log("i ran")
    }
    if(selectedSubcategories.length===0){
      dispatch(addMultiSubcategory(allsubcategories));
      
    }
  }, [dispatch,fixSelect]);
  const usepathname = usePathname();
  const router = useRouter();
  // useEffect(() => {
  //   dispatch(toggleSubcategory([])); 
  // }, [usepathname,selectSubcategory])
  // const viewAllCheckbox = () => {
  //   if (selectedSubcategories.length === subcategory.length || categorySelect.length === category.length) {
  //     dispatch(toggleSubcategory([]));
  //   } else {
  //     dispatch(toggleSubcategory(subcategory));
  //   }
  // }
  return (
    <div>
      {/* <div className="flex flex-col my-1">
        <div className="flex gap-x-4 items-center pb-2">
          <div className="relative w-[15px] h-[15px]">
            <input
              type="checkbox"
              id="viewAll"
              onChange={viewAllCheckbox}
              checked={
                selectedSubcategories.length === subcategory.length ||
                categorySelect.length === category.length
              }
            />
          </div>
          <label htmlFor="viewAll" className="text-lg cursor-pointer">
            View All
          </label>
        </div>
      </div> */}
    
      {subcategory?.slice(0, showCount).map((item, index) => (
        <div className="flex flex-col my-1" key={index}>
          <div className="flex gap-x-4 items-center pb-2">
            <div className="relative w-[15px] h-[15px]">
              <input
                type="checkbox"
                id={item.name + indexing}
                onChange={() => handleCheckboxChange(item.name)}
                checked={selectedSubcategories?.includes(item.name)  || categorySelect?.includes(item.name)}
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
