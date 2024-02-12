import { selectSubcategory, setSubcategory } from "@/redux/slices/filterSlice";
import { selectCategoryProduct } from "@/redux/slices/productSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidemenufilterlist({
  subcategory,
  showCount,
  indexing,
  onSubcategorySelect,
  onShowMore,
  onShowLess,
}) {
  const dispatch = useDispatch();

  const handleCheckboxChange = (itemname) => {
    onSubcategorySelect(itemname)
  };
  const checkedRedux = useSelector(selectSubcategory);
  
  // console.log(checkedRedux);
  const currentData = useSelector(selectCategoryProduct);
  console.log(currentData);
  const subcategories = currentData?.response?.products?.map((item) => item.subcategory);
  console.log(subcategories);
  const filterSubcategory = useSelector(selectSubcategory);
  let selectedSubcategories = Object.keys(filterSubcategory).filter(
    (key) => filterSubcategory[key] === true && key !== "undefined"
  );

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
                checked={item.checked} // New line: Determine if the checkbox should be checked
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
