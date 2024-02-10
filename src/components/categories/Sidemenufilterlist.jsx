"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSubcategory } from "@/redux/slices/filterSlice";
import {
  fetchProducts,
  selectCategoryProduct,
} from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";

export default function Sidemenufilterlist({
  ucategory,
  category,
  subcategory,
  showCount,
  indexing,
  onShowMore,
  onShowLess,
  onSubcategorySelect,
  selectedSubs,
}) {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const dispatch = useDispatch();
  const prevSelectedKeys = useRef([]);
  const router = useRouter();
  const handleSubcategorySelect = (subcategoryId) => {
    const isSelected = selectedSubcategories.includes(subcategoryId);
    let updatedSelectedSubcategories = [];
    let updatedItemCheck = [];
  
    if (isSelected) {
      updatedSelectedSubcategories = selectedSubcategories.filter(
        (id) => id !== subcategoryId
      );
      updatedItemCheck = itemCheck.filter((id) => id !== subcategoryId);
    } else {
      updatedSelectedSubcategories = [...selectedSubcategories, subcategoryId];
      updatedItemCheck = [...itemCheck, subcategoryId];
    }
  
    console.log('updatedSelectedSubcategories:', updatedSelectedSubcategories);
    console.log('updatedItemCheck:', updatedItemCheck);
  
    setSelectedSubcategories(updatedSelectedSubcategories);
    setItemCheck(updatedItemCheck);
    onSubcategorySelect(category, subcategoryId);
  
    if (
      JSON.stringify(prevSelectedKeys.current) !== JSON.stringify(selectedKeys)
    ) {
      prevSelectedKeys.current = selectedKeys;
      const selectedSubcategories = Object.keys(selectedRedux).filter(
        (subcategory) => selectedRedux[subcategory]
      );
      const item = selectedSubcategories.map((subcategory) => subcategory);
      setItemCheck(item);
      const type = "type";
  
      dispatch(
        fetchProducts({
          type,
          item,
        })
      );
    }
  };
     // useEffect(() => {

    //   if (
    //     JSON.stringify(prevSelectedKeys.current) !== JSON.stringify(selectedKeys)
    //   ) {
    //     prevSelectedKeys.current = selectedKeys; // Update the previous selected keys
    //     const selectedSubcategories = Object.keys(selectedRedux).filter(
    //       (subcategory) => selectedRedux[subcategory]
    //     );
    //     console.log(
    //       selectedData.response?.products?.map((item) => item.subcategory)
    //     );
    //     const item = selectedSubcategories.map((subcategory) => subcategory);
    //     //   console.log("item", item);
    //     setItemCheck(item);
    //     console.log("side menu hit api");
    //     const type = "type";
    //     dispatch(
    //       fetchProducts({
    //         type,
    //         item,
    //       })
    //     );
    //   }
    // }, [selectedSubcategories]);
  const handleAllClick = () => {
    if (selectedSubcategories.length === subcategory.length) {
      setSelectedSubcategories([]);
    } else {
      setSelectedSubcategories(subcategory.map((item) => item._id));
    }
    onSubcategorySelect(category, "all");
  };
  const selectedData = useSelector(selectCategoryProduct);
  const selectedRedux = useSelector(selectSubcategory);
  const selectedKeys = Object.keys(selectedRedux).filter(
    (key) => selectedRedux[key]
  );
  const [selected, setSelected] = useState(selectedKeys);
  const [itemCheck, setItemCheck] = useState([]);
    // useEffect(() => {

    //   if (
    //     JSON.stringify(prevSelectedKeys.current) !== JSON.stringify(selectedKeys)
    //   ) {
    //     prevSelectedKeys.current = selectedKeys; // Update the previous selected keys
    //     const selectedSubcategories = Object.keys(selectedRedux).filter(
    //       (subcategory) => selectedRedux[subcategory]
    //     );
    //     console.log(
    //       selectedData.response?.products?.map((item) => item.subcategory)
    //     );
    //     const item = selectedSubcategories.map((subcategory) => subcategory);
    //     //   console.log("item", item);
    //     setItemCheck(item);
    //     console.log("side menu hit api");
    //     const type = "type";
    //     dispatch(
    //       fetchProducts({
    //         type,
    //         item,
    //       })
    //     );
    //   }
    // }, [selectedSubcategories]);

  return (
    <div>
      <div className="flex flex-col my-1">
        {/* <div className="flex gap-x-4 items-center pb-2">
          <div className="relative w-[15px] h-[15px]">
            <input
              type="checkbox"
              checked={
                selectedSubcategories.length === subcategory.length
              }
              onChange={
                ()=>handleCheckboxChange(category)
              }
              onClick={handleAllClick}
              id={`all_${indexing}`}
            />
          </div>
          <label
            htmlFor={`all_${indexing}`}
            checked={
                selectedSubcategories.length === subcategory.length
            }
            className="text-lg cursor-pointer"
          >
            All Items
          </label>
        </div> */}
      </div>

      {subcategory?.slice(0, showCount).map((item, index) => (
        <div className="flex flex-col my-1" key={index}>
          <div className="flex gap-x-4 items-center pb-2">
            <div className="relative w-[15px] h-[15px]">
              <input
                type="checkbox"
                checked={itemCheck.includes(item.name)}
                id={item.name + indexing}
                onChange={() => handleSubcategorySelect(item._id)}
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
