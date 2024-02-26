"use client";
import { FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import {
  categoryProducts,
  filtertypes,
  filtertypesdata,
  sortsData,
} from "@/utils/dummydata";
import { BiSolidChevronDown } from "react-icons/bi";
import { useState, useEffect, useRef, useCallback } from "react";
import Filterdatalist from "./Filterdatalist";
import Image from "next/image";
import { fetchData } from "@/utils/apicall";
import Loader from "../loader/Loader";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import Sidemenu from "./Sidemenu";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchProducts,
  selectCategoryProduct,
} from "@/redux/slices/productSlice";
import {
  addMultiSubcategory,
  selectCategory,
  selectCategoryCall,
  selectColor,
  selectFix,
  selectMaterial,
  selectSize,
  selectSleeve,
  selectSubcategory,
  toggleCategory,
  toggleColor,
  toggleFix,
  toggleMaterial,
  toggleSize,
  toggleSleeve,
} from "@/redux/slices/filterSlice";
import Productcart from "./Productcart";
import Modal from "react-awesome-modal";
import Productmodal from "./Productmodal";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import { addToCart, selectCart } from "@/redux/slices/cartSlice";
import { closeCart, selectCartOpen } from "@/redux/slices/cartOpenSlice";
import { selectCategories } from "@/redux/slices/categorySlice";
import { ThreeDots } from "react-loader-spinner";

import "./content.css";
export default function Contentcategories({ params , categories}) {
  const [showsort, setshowsort] = useState(false);
  const [selectedfilter, setselectedfilter] = useState(null);
  const [checkedmenus, setcheckedmenus] = useState([]);
  const [filtercount, setfiltercount] = useState(5);
  const [filtertypes, setfiltertypes] = useState(filtertypesdata);
  const [loader, setLoader] = useState(true);
  const [sorts, setSorts] = useState(sortsData);
  const [isfilterbaropen, setisfilterbaropen] = useState(0);
  const [filterLoader, setFilterLoader] = useState(false);
  // const [showpricemenu, setshowpricemenu] = useState(false);
  const divRef = useRef();
  const [data, setData] = useState([]);
  const [ismodalopen, setismodalopen] = useState(false);
  const [productdata, setproductdata] = useState([]);
  const selectData = useSelector(selectCategoryProduct);
  const dispatch = useDispatch();
  const usepathname = usePathname();
  const selectReduxSubcategory = useSelector(selectSubcategory);
  const cats = useSelector(selectCategories);
  const allsubcategories = cats?.categories?.filter((item) => item.subcategories.length > 0).map((item) => item.subcategories).flat().map((item) => item.name);
  const categoryCall = useSelector(selectCategoryCall);
  const [catsState, setCatsState] = useState('');
  const fixSelect = useSelector(selectFix);

  const [subcategorySelect, setSubcategorySelect] = useState([]);
  useEffect(() => {
    setSubcategorySelect(selectReduxSubcategory);
  }, [selectReduxSubcategory]);
  console.log(categoryCall);
  useEffect(() => {
    setCatsState(categoryCall);
    console.log(catsState);
    // setLoader(true);
    setLoader(true);
    setFilterLoader(true);
    if (categoryCall  !=='' && catsState.length > 0) {
      // axios.get(`http://localhost:3000/api/products?category=${catsState}`).then((res) => {
      //   setData(res.data.products);
      //   console.log(res.data.products);
      //   setLoader(false);
      fetchData(`products?category=${catsState}`).then((res) => {
        setData([])
        setCompleteData([]);
        setFilterData([]);
        setData(res.products);
        console.log(res.products); 
    setFilterLoader(false);
    setLoader(false);
      });
    }
    else{
      setData([]);
    }
  }, [categoryCall, catsState,fixSelect]);
  let router = useRouter();
  let debounceTimeoutRef = useRef(null);
  useEffect(() => {
    const rawData = selectData?.response;
    if (rawData) {
      sessionStorage?.setItem("categoryData", JSON.stringify(rawData));
      setData(rawData.products);
    }

    // if (
    //   !data.length &&
    //   !selectData &&
    //   !sessionStorage?.getItem("categoryData")
    // ) {
    //   // Fetch all products if no data is available
      
    // }
  }, [dispatch, selectData]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const fetchProductsBySubcategory = async () => {
      try {
        console.log("Fetching products by subcategory...");
        // Set filterLoader to true at the beginning of the fetch operation
        setFilterLoader(true);
        // Filter out empty arrays from subcategorySelect
        const nonEmptySubcategories = subcategorySelect.filter(
          (subcategory) => subcategory.length > 0
        );

        if (nonEmptySubcategories.length > 0) {
          const selectedSubcategories = nonEmptySubcategories
            .flat()
            .filter((subcategory) => subcategory !== "undefined");

          const response = await fetchData(
            `products?type=${selectedSubcategories?.join(",")}`
          );

          if (response && response.products && response.products.length > 0) {
            const existingProductIds = data.map((product) => product._id);
            const uniqueProducts = response.products.filter(
              (product) => !existingProductIds.includes(product._id)
            );
            setFilterData(uniqueProducts);
          } else {
            setFilterData([]);
          }
        } else {
          setFilterData([]);
        }

        // Set filterLoader to false after the filter data has been updated
        setFilterLoader(false);
      } catch (error) {
        console.error("Error fetching products by subcategory:", error);
        // Set filterLoader to false in case of error
        setFilterLoader(false);
      }
    };

    if (
      subcategorySelect &&
      subcategorySelect.length > 0 &&
      subcategorySelect !== undefined
    ) {
      fetchProductsBySubcategory();
    } else {
      setFilterData([]); // Reset filterData when no subcategories selected
      setLoader(false);
      // dispatch(addMultiSubcategory(allsubcategories))
      
    }
  }, [subcategorySelect, dispatch,catsState,categoryCall,fixSelect]);
  // useEffect(() => {
  //   if(subcategorySelect?.length === 0 && catsState.length == 0){
  //     dispatch(addMultiSubcategory(allsubcategories));
  //     dispatch(toggleCategory([]));
  //     dispatch(toggleFix([]));
  //   }
  // }, [subcategorySelect,dispatch]);
  const [completeData, setCompleteData] = useState([]);
  useEffect(() => {
    const mergedData = [...data, ...filterData];
    const uniqueData = Array.from(
      new Set(mergedData.map((item) => item._id))
    ).map((id) => mergedData.find((item) => item._id === id));

    setCompleteData(uniqueData);
    sessionStorage?.setItem("categoryData", JSON.stringify(data));
  }, [data, filterData, usepathname]);

  useEffect(() => {
    if (selectData?.length < 1) {
      let rawData = sessionStorage?.getItem("categoryData");
      if (rawData) {
        setData(JSON.parse(rawData));
      }
    }
  }, []);
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  useEffect(() => {
    document.addEventListener("keydown", hideOnescape, true);
    document.addEventListener("click", hideoutside, true);
  }, []);

  const hideOnescape = (e) => {
    if (e.key === "Escape") {
      setisfilterbaropen(0);
    }
  };

  const hideoutside = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setisfilterbaropen(0);
    }
  };

  const handleButtonClick = () => {
    setisfilterbaropen(0);
  };

  const handleCheckboxChange = (index) => {
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
    const lengths = filtertypes[index].subcategory.length;
    setfiltercount(lengths);
  };

  const handelshowless = (index) => {
    setfiltercount(5);
  };

  const handleSortSelection = (items, index) => {
    setselectedfilter(index);
    if (selectedfilter === index) {
      setselectedfilter(null);
    }
    switch (items.val) {
      case "hightolow":
        setCompleteData(completeData.sort((a, b) => b.price - a.price));
        break;
      case "lowtohigh":
        setCompleteData(completeData.sort((a, b) => a.price - b.price));
        break;
      case "best":
        // let best = completeData.sort((a, b) => b.features.length - a.features.length); //will use this later
        // if(best.length === 0){
        setCompleteData(completeData.sort((a, b) => a.quantity - b.quantity));
        // }
        // else{
        // setCompleteData(best);9
        // }
        // setCompleteData(completeData.sort((a, b) => b.features.length - a.features.length));
        break;
      case "new":
        setCompleteData(
          completeData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        break;
      default:
        setCompleteData(completeData);
    }
    setshowsort(false);
  };
  const [subcategory, toggleSubcategory] = useState([]);
  const selectedsubCats = useSelector(selectSubcategory);

  const handleFilterSelection = (Ftitle, selectedFilters) => {
    toggleSubcategory(selectedFilters);
  };

  const handelpeoductinfo = async (id) => {
    setLoader(true);
    try {
      const response = await fetchData(`products/${id}`);
      setproductdata(response.products);
      setLoader(false);
      setismodalopen(true);
    } catch (err) {
      setLoader(false);
    }
  };

  const closeModal = () => {
    setismodalopen(false);
  };
  const selectedCartData = useSelector(selectCart);

  const handeladdtocart = (pdata) => {
    const obj = {
      _id : pdata._id,
      productId : pdata.productId,
      title : pdata.title,
      images : pdata.images,
      quantity : pdata.quantity,
      pquantity : 1,
      color : pdata.attributes && Array.isArray(pdata.attributes[0]?.value) && pdata.attributes[0].value[0],
      size : pdata.attributes && Array.isArray(pdata.attributes[1]?.value) && pdata.attributes[1].value[0],
      price : pdata.price
    }

    dispatch(addToCart(obj));
    if (selectedCartData.some((item) => item._id === obj._id)) {
      toast.success("Added same product again", {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Added to cart", {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    localStorage.setItem("cart", JSON.stringify(selectedCartData));
  };
  const cartOpenState = useSelector(selectCartOpen);

  useEffect(() => {
    const header = document.querySelector("header");
    if (isfilterbaropen !== 0 ||  ismodalopen) {
      document.body.classList.add("blurbody");
      header.classList.remove("absolute");
      header.classList.add("headerfixed");
    } else {
      document.body.classList.remove("blurbody");
      header.classList.remove("headerfixed");
      header.classList.add("absolute");
    }

    // Cleanup the class when the component unmounts
    return () => {
      document.body.classList.remove("blurbody");
    };
  }, [isfilterbaropen,ismodalopen]);
  const [category, setCategory] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  let currentCategory = completeData?.map((item) => item.category);
  let uniqueCategory = [...new Set(currentCategory)];
  useEffect(() => {
    if (cats && completeData) {
      try {
        // Extract unique category names from completeData
        let currentCategory = completeData.map((item) => item.category);
        let uniqueCategory = [...new Set(currentCategory)];

        // Filter categories from Redux state that match uniqueCategory
        const filteredCategories = cats.categories.filter((cat) =>
          uniqueCategory.includes(cat.name)
        );

        // Extract subfilters and common filters from filteredCategories
        const allSubfilters = filteredCategories.flatMap((cat) =>
          cat.subcategories.flatMap((subcat) => subcat.subfilters)
        );
        const allCommonFilters = filteredCategories.flatMap(
          (cat) => cat.commonfilters
        );
        const mergedFilters = [...allSubfilters, ...allCommonFilters];
        const uniqueFilters = mergedFilters.reduce((acc, filter) => {
          const existingFilter = acc.find((f) => f.name === filter.name);
          if (existingFilter) {
            existingFilter.options = [
              ...new Set([...existingFilter.options, ...filter.options]),
            ];
          } else {
            acc.push({
              name: filter.name,
              options: [...new Set(filter.options)],
            });
          }
          return acc;
        }, []);

        // Update state with the merged filters
        setCategory(filteredCategories);
        setAllFilters(uniqueFilters);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [cats, completeData]);

  //handle filter selection
  const colorFilter = useSelector(selectColor);
  const sizeFilter = useSelector(selectSize);
  const materialFilter = useSelector(selectMaterial);
  const sleeveFilter = useSelector(selectSleeve);
  const [filterEmpty, setFilterEmpty] = useState(false);
  const [rightFilteredProducts, setRightFilteredProducts] = useState([]);
  const [allFiltersCount, setAllFiltersCount] = useState([]);
  useEffect(() => {
    // Filter products when any filter changes
    if (
      colorFilter.length === 0 &&
      sizeFilter.length === 0 &&
      materialFilter.length === 0 &&
      sleeveFilter.length === 0
    ) {
      setCompleteData([...filterData, ...data]);
      setFilterEmpty(true);
      setAllFiltersCount([]);
    }
    if (
      colorFilter.length > 0 ||
      sizeFilter.length > 0 ||
      materialFilter.length > 0 ||
      sleeveFilter.length > 0
    ) {
      setFilterEmpty(false);
      setAllFiltersCount([
        ...colorFilter,
        ...sizeFilter,
        ...materialFilter,
        ...sleeveFilter,
      ]);
      let comdata = [...filterData, ...data];
      const filtered = comdata.filter((product) => {
        const colorMatch =
          colorFilter?.length === 0 ||
          colorFilter.some((filter) =>
            product.attributes
              ?.find((attr) => attr.name === "Colors")
              ?.value.includes(filter)
          );
        const sizeMatch =
          sizeFilter?.length === 0 ||
          sizeFilter.some((filter) =>
            product.attributes
              ?.find((attr) => attr.name === "Sizes")
              ?.value.includes(filter)
          );
        const materialMatch =
          materialFilter?.length === 0 ||
          materialFilter.some(
            (filter) =>
              product.attributes.find((attr) => attr.name === "Material") &&
              product.attributes.find((attr) => attr.name === "Material")
                .value === filter
          );
        // const sleeveMatch = sleeveFilter.length === 0 || sleeveFilter.includes(product.attributes.find(attr => attr.name === 'Sleeve')?.value);

        return colorMatch && sizeMatch && materialMatch;
      });

      if (filtered.length > 0) {
        setRightFilteredProducts(filtered);
      } else {
        setRightFilteredProducts([]);
      }
    }
  }, [colorFilter, sizeFilter, materialFilter, sleeveFilter]);
  const [showCard, setShowCard] = useState(false);
  const handleResetfilter = () => {
    setShowCard(false);
    dispatch(toggleColor([]));
    dispatch(toggleMaterial([]));
    dispatch(toggleSize([]));
    dispatch(toggleSleeve([]));
    setFilterEmpty(true);
    setAllFiltersCount([]);
    setCompleteData([...filterData, ...data]);
  };

  const handleApplyfilter = () => {
    setShowCard(true);
    setCompleteData(rightFilteredProducts);
  };
  const handleRemoveFilter = useCallback((item, index) => {
    if (colorFilter.includes(item)) {
      dispatch(toggleColor(item));
    }
    if (sizeFilter.includes(item)) {
      dispatch(toggleSize(item));
    }
    if (materialFilter.includes(item)) {
      dispatch(toggleMaterial(item));
    }
    if (sleeveFilter.includes(item)) {
      dispatch(toggleSleeve(item));
    }
    // setCompleteData(rightFilteredProducts);
    handleApplyfilter();
  }, [colorFilter, sizeFilter, materialFilter, sleeveFilter, dispatch, handleApplyfilter]);
  // console.log(allsubcategories);
  const categoryState = useSelector(selectCategory);
// useEffect(() => {
// if(subcategorySelect?.length ===0 && completeData?.length === 0 && allsubcategories?.length > 0){
//   // dispatch(toggleSubcategory([]));
//   console.log("i am here");
//   dispatch(addMultiSubcategory(allsubcategories));
//   // dispatch(addProduct(completeData));
// }
// console.log(subcategorySelect);
// console.log(completeData);
// }, [subcategorySelect]);
// useEffect(() => {
//   if(completeData?.length >12){
//     localStorage.setItem("categoryData", JSON.stringify(completeData));
//   }
//   if(localStorage.getItem("categoryData")){
//     console.log(localStorage.getItem("categoryData"));

//   }
// }
// , [completeData]);
console.log(completeData);
console.log(subcategorySelect);
console.log(data);
console.log(filterData);
const handleFetchAllData = () => {
  // dispatch(toggleSubcategory([]));
  dispatch(addMultiSubcategory([]));
  
  dispatch(toggleCategory([]));
  dispatch(toggleFix([]));
  dispatch(addMultiSubcategory(allsubcategories));
  dispatch(toggleFix(allsubcategories));
};

// useEffect(() => {
//     if(subcategorySelect?.length===0){
      
//     }
// }, [])

// const [allData, setAllData] = useState([]);

// useEffect(() => {
//   if (!dataFetched && subcategorySelect?.length === 0 && completeData?.length === 0 && allsubcategories?.length > 0) {
//     handleFetchAllData();
//     setDataFetched(true);
//   }
// }, [completeData, subcategorySelect, dataFetched]);

// useEffect(() => {
//     if ( completeData?.length === 0 && allsubcategories?.length > 0) {
//       handleFetchAllData();
//     }
//   }, [completeData,subcategorySelect]);
// useEffect(() => {
//   if (subcategorySelect?.length === 0 && completeData?.length === 0 && allsubcategories?.length > 0) {
//     axios.get(`http://localhost:3000/api/products``
//   }
// }
// , [completeData,subcategorySelect]);
// useEffect(() => {
//   if(!filterLoader && filterData.length==0 && completeData?.length === 0 && subcategorySelect.length==0 && catsState?.length == 0  && categoryCall=='' ){
//     console.log("i am here");
    
//       handleFetchAllData();
//   }
//   console.log(
//     loader,
//     filterLoader,
//     filterData.length,
//     completeData?.length,
//     catsState?.length,
//     subcategorySelect,
//     subcategorySelect?.length,
//     categoryCall
//   )
// }, [
//   loader,subcategorySelect?.length==0,completeData?.length==0
// ]);
const[allData,setAllData] = useState([]);
useEffect(() => {
  if(completeData?.length > 0 &&subcategorySelect?.length === 0){
    console.log(localStorage.getItem("categoryData"));    
    setAllData(JSON.parse(localStorage.getItem("categoryData")));
  }
}
, [completeData,subcategorySelect]);
  return (
    <div className="w-full">
      <div className="w-full flex pt-3 pb-2 gap-x-4 flex-wrap lg:flex-nowrap gap-y-2 lg:gap-y-0 ">
        <div className="lg:w-8/12 w-full flex order-2 lg:order-1  gap-2 context text-text-secondary flex-wrap ">
          {!filterEmpty &&
            showCard &&
            allFiltersCount.map((item, index) => (
              <div className="flex items-center gap-2  px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm py-1">
                <FaXmark
                  onClick={(e) => {
                    handleRemoveFilter(item, index);
                  }}
                  className=" cursor-pointer text-xs"
                />
                {item.length > 10 ? item.slice(0, 15) + "..." : item}
              </div>
            ))}
        </div>
        <div className="lg:w-4/12 lg:order-2 order-1 w-full flex gap-3 context  lg:justify-between relative items-center ">
          <div className="lg:hidden ">
            <button
              className=" p-3 rounded-full bg-white shadow-sm border flex items-center gap-x-1"
              onClick={() => setisfilterbaropen(3)}
            >
              <FaBars size={20} />{" "}
              <span className=" text-xs mt-1">Categories</span>
            </button>
          </div>
          <div className="ml-auto lg:ml-0">
            <button
              className=" cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border md:px-4 px-2 bg-white text-opacity-[78%]"
              onClick={() => setisfilterbaropen(1)}
            >
              <HiBars3 />
              <span className="mt-[2px]"> More filters</span>
            </button>
          </div>

          <div>
            <button
              className=" cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border md:px-4 px-2 bg-white text-opacity-[78%] "
              onClick={() =>
                setshowsort(!showsort)
              }
            >
              <FaAngleDown
                className={`transition-all duration-75 ${
                  showsort && "rotate-[180deg]"
                }`}
              />{" "}
              Sort
            </button>
          </div>

          <div
            ref={divRef}
            className={`top-[110%] w-[200px] border  right-0 bg-white shadow rounded-lg absolute z-20 ${
              showsort ? "block" : "hidden"
            }`}
          >
            <ul className="text-sm font-[400] cursor-pointer ">
              {sorts.map((items, index) => (
                <li
                  className={`py-2 border-b px-4 ${
                    selectedfilter === index && " text-white bg-theme-footer-bg"
                  }`}
                  key={index}
                  onClick={() => {
                    handleSortSelection(items, index);
                  }}
                >
                  {items.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {filterLoader ? (
        <ThreeDots
          color="#F8B43A"
          radius={20}
          height={120}
          width={120}
          wrapperClass="product"
        />
      ) : null}
       <div className="w-full">
      {/* Loader */}
      {loader && completeData.length === 0 && (
        <div className="flex items-center justify-center absolute top-1/2 left-1/2 h-screen">
          <Loader />
        </div>
      )}

      {/* "No products found" section */}
      {!loader && !filterLoader && completeData.length === 0 && allData.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <img
              src="/images/web/product/notfound.png"
              alt="Not Found"
              className="w-64 h-48 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              No products found
            </h1>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleFetchAllData}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Fetch All Data
              </button>
              <Link
                href={"/"}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of products */}
      {(completeData.length > 0 || subcategorySelect.length > 0) && (
        <div
          className={`${
            filterLoader ? "blur-md transition-all ease-linear" : ""
          } grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 context`}
        >
          {completeData.map((items, index) => (
            <div key={index} className="group relative">
              {/* Product content */}
              <div className=" flex flex-col text-[#03071E]">
                <div className="   cursor-pointer  transition-all duration-100 relative rounded-[6px]  lg:group-hover:opacity-50 h-[200px] 2xl:h-[250px] w-full overflow-hidden">
                  <Image
                    src={`${items?.images[0]}`}
                    alt="Your Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Link href={`/productinfo/${items._id}`}>
                  <h6 className=" font-[700]  text-[1.1rem] 2xl:text-[1.5rem] pt-2  leading-[1rem] overflow-hidden whitespace-nowrap text-ellipsis ">
                    {items.title}
                  </h6>
                </Link>
                <p className="py-1 text-[1rem] font-[400]">
                  Rs {items.price}
                </p>
                <button
                  className=" transition-all duration-100 w-full md:py-2 py-1 text-center bg-theme-footer-bg rounded text-white text-lg font-[400]  lg:hover:bg-opacity-[80%]"
                  onClick={() => handeladdtocart(items)}
                >
                  Add to Cart
                </button>
              </div>
              <button
                className="w-[70%] transition-all duration-100 cursor-pointer rounded-xl absolute left-[50%] translate-x-[-50%] lg:hidden lg:group-hover:block top-[50%] lg:z-10 z-[1] bg-button-secondary px-5  text-text-secondary text-[1rem]  text-center  lg:hover:shadow-gray-950  hover:shadow"
                onClick={() => handelpeoductinfo(items._id)}
              >
                Quick buy
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show "No products found" when no completeData and subcategorySelect length > 0 */}
      {!loader && !filterLoader && completeData.length === 0 && subcategorySelect.length > 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <img
              src="/images/web/product/notfound.png"
              alt="Not Found"
              className="w-64 h-48 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              No products found
            </h1>
          </div>
        </div>
      )}

      {/* Render allData */}
      {completeData.length==0 &&!loader &&!filterLoader && allData.length > 0 && (
        <div
          className={`${
            filterLoader ? "blur-md transition-all ease-linear" : ""
          } grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 context`}
        >
          {allData.map((items, index) => (
            <div key={index} className="group relative">
              {/* Product content */}
              <div className=" flex flex-col text-[#03071E]">
                <div className="   cursor-pointer  transition-all duration-100 relative rounded-[6px]  lg:group-hover:opacity-50 h-[200px] 2xl:h-[250px] w-full overflow-hidden">
                  <Image
                    src={`${items?.images[0]}`}
                    alt="Your Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Link href={`/productinfo/${items._id}`}>
                  <h6 className=" font-[700]  text-[1.1rem] 2xl:text-[1.5rem] pt-2  leading-[1rem] overflow-hidden whitespace-nowrap text-ellipsis ">
                    {items.title}
                  </h6>
                </Link>
                <p className="py-1 text-[1rem] font-[400]">
                  Rs {items.price}
                </p>
                <button
                  className=" transition-all duration-100 w-full md:py-2 py-1 text-center bg-theme-footer-bg rounded text-white text-lg font-[400]  lg:hover:bg-opacity-[80%]"
                  onClick={() => handeladdtocart(items)}
                >
                  Add to Cart
                </button>
              </div>
              <button
                className="w-[70%] transition-all duration-100 cursor-pointer rounded-xl absolute left-[50%] translate-x-[-50%] lg:hidden lg:group-hover:block top-[50%] lg:z-10 z-[1] bg-button-secondary px-5  text-text-secondary text-[1rem]  text-center  lg:hover:shadow-gray-950  hover:shadow"
                onClick={() => handelpeoductinfo(items._id)}
              >
                Quick buy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

      <div
        className={`your-specific-class fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm lg:w-[350px] w-[80%] p-4 top-0 z-30 rounded-tl-[28px] border py-3 px-4  context ${
          isfilterbaropen === 1 ? "block" : "hidden"
        }`}
        ref={divRef}
      >
        <div className="py-3 px-3 w-full flex gap-x-4 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700]">
          <FaXmark
            className=" cursor-pointer"
            onClick={() => setisfilterbaropen(0)}
          />{" "}
          Filters
        </div>

        <div className="" onClick={() => setisfilterbaropen(1)}>
          {allFilters?.map((items, index) => (
            <div
              className="w-full flex flex-col  gap-y-2 py-4  border-b border-theme-footer-bg  border-opacity-[40%] context px-3"
              key={index}
            >
              <div
                className=" cursor-pointer"
                onClick={() => handleCheckboxChange(index)}
              >
                <div className=" flex  items-center cursor-pointer">
                  <div>
                    <p className=" text-xl font-[600] mb-0 w-full ">
                      {items.name}
                    </p>
                  </div>

                  <button className="text-xl ml-auto">
                    <BiSolidChevronDown
                      className={` transition-all duration-75 ${
                        isVisible(index) && " rotate-180"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className={` ${isVisible(index) ? "block" : "hidden"}`}>
                <Filterdatalist
                  subcategory={items.options}
                  showCount={filtercount}
                  indexing={index}
                  Ftitle={items.name}
                  refresh={isVisible}
                  onShowMore={() => handelshowmore(index)}
                  onShowLess={() => handelshowless(index)}
                  onFilterSelection={handleFilterSelection}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center gap-x-4 py-3">
          <button
            onClick={handleResetfilter}
            className="w-4/12 border border-[#000000] text-text-secondary text-lg font-[300] py-1 rounded-[22px]"
          >
            Reset
          </button>
          <button
            onClick={filterEmpty ? handleResetfilter : handleApplyfilter}
            className="w-8/12 border bg-[#F8B43A] text-text-secondary text-lg font-[500] py-1 rounded-[22px] "
          >
            Apply filter
          </button>
        </div>
      </div>

      {/* <div
        className={`your-specific-class fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm lg:w-[350px] w-[80%]  top-0 z-30 rounded-tl-[28px] border py-3 context ${
          cartOpenState ? "block" : "hidden"
        }`}
        ref={divRef}
      >
        <div className="py-3 px-6 w-full flex gap-x-4 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700]">
          <FaXmark
            className=" cursor-pointer"
            onClick={() => dispatch(closeCart())}
          />{" "}
          Cart
        </div>
        <Productcart handelCartShow={cartOpenState} />
      </div> */}

      <div
        className={`your-specific-class fixed overflow-y-auto left-0 h-[100vh] bg-white shadow-sm lg:hidden w-[80%] p-4 top-0 z-30 rounded-tr-[28px] border py-3 px-3  context ${
          isfilterbaropen === 3 ? "block" : "hidden"
        }`}
        ref={divRef}
      >
        <div className="flex">
          <button
            className="p-3 shadow-sm rounded-full ml-auto mr-2 bg-theme-footer-bg text-white"
            onClick={() => setisfilterbaropen(0)}
          >
            <FaXmark size={20} />
          </button>
        </div>
        <Sidemenu categories={categories} />
      </div>

      <Modal
        visible={ismodalopen}
        effect="fadeInDown"
        width="80%"
        onClickAway={closeModal}
      >
        <Productmodal produtdata={productdata} modalclose={closeModal} ismodalopen={ismodalopen} />
      </Modal>
      <ToastContainer />
    </div>
  );
}
