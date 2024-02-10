"use client";
import React, { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import Sidemenufilterlist from "./Sidemenufilterlist";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/categorySlice";
import {
  selectCategory,
  selectSubcategory,
  setSubcategory,
} from "@/redux/slices/filterSlice";
import { selectCategoryProduct } from "@/redux/slices/productSlice";
import { typeOf } from "react-read-more-read-less";

export default function Sidemenu() {
  const [checkedmenus, setcheckedmenus] = useState([]);
  const [filtercount, setfiltercount] = useState(5);
  const rawData = useSelector(selectCategories);
  const [categoriesdata, setCategoriesdata] = useState([]);
  const dispatch = useDispatch();
  const Subcategories = useSelector(selectSubcategory);

  useEffect(() => {
    if (rawData) {
      setCategoriesdata(rawData.categories);
      // setSelectedSubcategories([]);
      setSelectedSubcategories([]);
    } else {
      dispatch(fetchCategories());
      // setSelectedSubcategories([]);
    }
  }, [rawData]);

  const handleCheckboxChange = (index) => {
    // console.log("index", index);
    const currentIndex = checkedmenus.indexOf(index);
    const newCheckedItems = [...checkedmenus];

    if (currentIndex === -1) {
      newCheckedItems.push(index);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setcheckedmenus(newCheckedItems);
  };

  const isVisible = (index) => checkedmenus.includes(index);

  const handelshowmore = (index) => {
    const lengths = categoriesdata[index].subcategory.length;
    setfiltercount(lengths);
  };

  const handelshowless = (index) => {
    setfiltercount(5);
  };
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const handleSubcategorySelect = (categoryName, subcategoryId) => {
    const selectedCategory = categoryName;
    const selectedSubcategory = categoriesdata
      .find((category) => category.name === categoryName)
      .subcategories.find((subcat) => subcat._id === subcategoryId)?.name;
    setSelectedSubcategories([...selectedSubcategories, selectedSubcategory]);
    dispatch(setSubcategory(selectedSubcategory));
  };
  const [uniqueCategory, setUniqueCategory] = useState([]);
  let selectedData = useSelector(selectCategoryProduct);
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);

  useEffect(() => {
    // console.log("selectedData");
    let currentCategory;
    if (
      sessionStorage?.getItem("categoryData") &&
      typeof window !== "undefined"
      
    ) {
      currentCategory = JSON.parse(sessionStorage?.getItem("categoryData"));
      let cats = currentCategory?.products?.map((product) => product.category);
      let uniqueCategory = [...new Set(cats)];
      setUniqueCategory(uniqueCategory);
      const indexes = uniqueCategory.map((categoryName) =>
        categoriesdata?.findIndex((category) => category.name === categoryName)
      );
      setcheckedmenus(indexes.filter((index) => index !== -1));
    } else {
      setcheckedmenus([]);
    }
    setSelectedSubcategories([]);
    dispatch(setSubcategory());
<<<<<<< HEAD
  }, [categoriesdata, typeof window !== "undefined"?sessionStorage?.getItem("categoryData"): null]);
  
=======
  }, [dispatch,categoriesdata,typeof window !== "undefined"?sessionStorage?.getItem("categoryData"): null, ]);

>>>>>>> 9805484b015f3b6099e2ad93e7a34ed5e9907d7b
  return (
    <aside className="w-full  py-0  px-5 overflow-y-auto">
      {categoriesdata?.map((items, index) => (
        <div className="w-full flex flex-col  gap-y-2 my-7 context" key={index}>
          <div
            className=" cursor-pointer"
            onClick={() => handleCheckboxChange(index)}
          >
            <div className=" flex gap-x-4 items-center cursor-pointer pl-[1.5rem]">
              <div>
                <p className=" text-xl font-[500] mb-0 leading-[1.50rem]">
                  {items.name}
                </p>
              </div>
              <div className="flex items-center">
                <button className="text-xl">
                  <BiSolidChevronDown
                    className={` transition-all duration-75 ${
                      isVisible(index) && " rotate-180"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={`${isVisible(index) ? "block" : "hidden"}`}>
            <Sidemenufilterlist
              category={items.name}
              subcategory={items.subcategories}
              showCount={filtercount}
              indexing={index}
              onShowMore={() => handelshowmore(index)}
              onShowLess={() => handelshowless(index)}
              onSubcategorySelect={handleSubcategorySelect}
              selectedSubs ={selectedSubcategories}
              ucategory={uniqueCategory}
            />
          </div>
        </div>
      ))}
    </aside>
  );
}
