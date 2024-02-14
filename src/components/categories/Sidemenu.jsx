import React, { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import Sidemenufilterlist from "./Sidemenufilterlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategories } from "@/redux/slices/categorySlice";
import { selectSubcategory, toggleSubcategory } from "@/redux/slices/filterSlice";
import { usePathname, useRouter } from "next/navigation";
import { selectCategoryProduct } from "@/redux/slices/productSlice";

export default function Sidemenu({ categories }) {
  const [checkedMenus, setCheckedMenus] = useState([]);
  const [filterCount, setFilterCount] = useState(5);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentData= useSelector(selectCategoryProduct);
  const usepathname = usePathname();
  useEffect(() => {
    // Reset component and remove all selected items when router pathname changes
    setCheckedMenus([]);
    dispatch(toggleSubcategory([]));
    // console.log("usepathname", usepathname);
  }, [usepathname,dispatch,currentData]);
  const handleCheckboxChange = (index) => {
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
  let categoryToMap = categories?.filter((item) => item.subcategories.length > 0);
  return (
    <aside className="w-full py-0 px-5 overflow-y-auto">
      {categoryToMap?.map((items, index) => (
        <div className="w-full flex flex-col gap-y-2 my-7 context" key={index}>
          <div className="cursor-pointer" onClick={() => handleCheckboxChange(index)}>
            <div className="flex gap-x-4 items-center cursor-pointer pl-[1.5rem]">
              <div>
                <p className="text-xl font-[500] mb-0 leading-[1.50rem]">{items.name}</p>
              </div>
              <div className="flex items-center">
                <button className="text-xl">
                  <BiSolidChevronDown className={`transition-all duration-75 ${isVisible(index) && "rotate-180"}`} />
                </button>
              </div>
            </div>
          </div>
          <div className={`${isVisible(index) ? "block" : "hidden"}`}>
            <Sidemenufilterlist
              category={items.name}
              subcategory={items.subcategories}
              showCount={filterCount}
              indexing={index}
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
