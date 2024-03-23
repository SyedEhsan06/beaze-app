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
  toggleCategory,
  toggleColor,
  toggleMaterial,
  toggleSize,
  toggleSleeve,
  toggleSubcategory,
} from "@/redux/slices/filterSlice";
import { usePathname, useRouter } from "next/navigation";
import { selectCategoryProduct } from "@/redux/slices/productSlice";

export default function Sidemenu({ categories }) {
  const [checkedMenus, setCheckedMenus] = useState([]);
  const [filterCount, setFilterCount] = useState(5);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentData = useSelector(selectCategoryProduct);
  const usepathname = usePathname();
  const selectedSubcategories = useSelector(selectSubcategory);
  const categorySelect = useSelector(selectCategory);
  console.log(selectedSubcategories);
console.log(categorySelect);
  useEffect(() => {
    // Reset component and remove all selected items when router pathname changes
    setCheckedMenus([]);
    // dispatch(toggleSubcategory([]));
    dispatch(toggleColor([]));
    dispatch(toggleMaterial([]));
    dispatch(toggleSize([]));
    dispatch(toggleSleeve([]));

  }, [categorySelect, dispatch, currentData]); 
  const handleCheckboxChange = (items,index) => {
    console.log(items.name)
    dispatch(toggleCategory(items.name));
    const currentIndex = checkedMenus.indexOf(index);
    const newCheckedItems = [...checkedMenus];
    if (currentIndex === -1) {
      newCheckedItems.push(index);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }
    setCheckedMenus(newCheckedItems);
  };

  const isVisible = (index) => checkedMenus.includes(index);

  const handelshowmore = () => {
    setFilterCount(categories[index].subcategory.length);
  };

  const handelshowless = () => {
    setFilterCount(5);
  };

  const handleSubcategorySelect = (subcategory) => {
    dispatch(toggleSubcategory(subcategory));
  };

  let categoryToMap = categories?.filter(
    (item) => item.subcategories.length > 0
  );
  let currentCategory = currentData?.response?.products.map(
    (item) => item.category
  );
  // console.log(currentData);
  let category = [...new Set(currentCategory)];
  // console.log(category);
  

  return (
    <aside className="w-full py-0 lg:px-5 overflow-y-auto">
      {categoryToMap?.map((items, index) => (
        <div className="w-full flex flex-col gap-y-2 lg:my-7 py-5 lg:py-0 context border-b lg:border-b-0 border-theme-footer-bg  border-opacity-[40%]" key={index}>
          <div
            className="cursor-pointer"
            onClick={() => handleCheckboxChange(items,index)}
          >
            <div className="flex gap-x-4 items-center cursor-pointer lg:pl-[1.5rem] pl-[12px] lg:pr-[0px] pr-[12px]">
              <div>
                <p className="text-xl font-[500] mb-0 leading-[1.50rem]">
                  {items.name}
                </p>
              </div>
              <div className="flex items-center ms-auto lg:ms-0">
                <button className="text-xl">
                <BiSolidChevronDown
                    className={`transition-all duration-75 ${

                      categorySelect.includes(items.name) ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className={`pl-[1.5rem] lg:pl-0 ${
              isVisible(index) || categorySelect.includes(items.name)
                ? "block"
                : "hidden"
            }`}
          >
            <Sidemenufilterlist
              category={items}
              categorySelect={categorySelect}
              subcategory={items.subcategories}
              showCount={filterCount}
              indexing={index}
              currentCategory={items.name}
              onShowMore={handelshowmore}
              onShowLess={handelshowless}
              onSubcategorySelect={(subcategory) => {
                handleSubcategorySelect(subcategory);
              }}
            />
          </div>
        </div>
      ))}
    </aside>
  );
}
