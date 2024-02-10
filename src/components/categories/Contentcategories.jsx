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
import { useState, useEffect, useRef } from "react";
import Filterdatalist from "./Filterdatalist";
import Image from "next/image";
import { fetchData } from "@/utils/apicall";
import Loader from "../loader/Loader";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import Sidemenu from "./Sidemenu";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectCategoryProduct,
} from "@/redux/slices/productSlice";
import { selectSubcategory } from "@/redux/slices/filterSlice";
import Productcart from "./Productcart";
import Modal from "react-awesome-modal";
import Productmodal from "./Productmodal";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { addToCart, selectCart } from "@/redux/slices/cartSlice";
import { closeCart, selectCartOpen } from "@/redux/slices/cartOpenSlice";

export default function Contentcategories({ params }) {
  const [showsort, setshowsort] = useState(false);
  const [selectedfilter, setselectedfilter] = useState(null);
  const [checkedmenus, setcheckedmenus] = useState([]);
  const [filtercount, setfiltercount] = useState(5);
  const [filtertypes, setfiltertypes] = useState(filtertypesdata);
  const [loader, setLoader] = useState(true);
  const [sorts, setSorts] = useState(sortsData);
  // const [showsidebar, setshowsidebar] = useState(false);
  // const [showfilter, setshowfilter] = useState(false);
  // const [showfilterbar, setshowfilterbar] = useState(false);
  // const [showfilterbar2, setshowfilterbar2] = useState(false);
  const [isfilterbaropen, setisfilterbaropen] = useState(0);
  const [cartdata, setcartdata] = useState([]);
  const [showpricemenu, setshowpricemenu] = useState(false);
  const divRef = useRef();
  const [data, setData] = useState([]);
  const [ismodalopen, setismodalopen] = useState(false);
  const [productdata, setproductdata] = useState([]);
  const selectData = useSelector(selectCategoryProduct);
  const dispatch = useDispatch();
let router = useRouter();
  // console.log(selectData);
  useEffect(() => {
    let rawData = selectData.response;
    if (rawData) {
      sessionStorage?.setItem("categoryData", JSON.stringify(rawData));
      setData(rawData.products);
    }
    if (sessionStorage?.getItem("categoryData")) {
      let cachedData = JSON.parse(sessionStorage?.getItem("categoryData"));
      setLoader(false);
      setData(cachedData.products);
    }
    if (!data && !rawData && !sessionStorage?.getItem("categoryData")&& router.isReady) {
      dispatch(fetchProducts("category", "all"));
      console.log("fetching");
    }
  }, [selectData, dispatch]);

  // useEffect(() => {
  //   const handleBodyClick = (event) => {
  //     const clickedElement = event.target;
  //     if (
  //       divRef.current &&
  //       !clickedElement.classList.contains("your-specific-class")
  //     ) {
  //       let ancestor = clickedElement.parentElement;

  //       while (ancestor && ancestor !== document.body) {
  //         if (ancestor.classList.contains("your-specific-class")) {
  //           return;
  //         }
  //         ancestor = ancestor.parentElement;
  //       }

  //       setisfilterbaropen(0);
  //     }
  //   };

  //   document.body.addEventListener("click", handleBodyClick);

  //   return () => {
  //     document.body.removeEventListener("click", handleBodyClick);
  //   };
  // }, []);




useEffect(() => {
    document.addEventListener("keydown", hideOnescape, true);
    document.addEventListener("click", hideoutside, true);

  }, []);
  
  const hideOnescape = (e) => {

if(e.key === "Escape"){
setisfilterbaropen(0)
}
  }

  
  const hideoutside = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setisfilterbaropen(0)
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
    // console.log(items);
    switch (items.val) {
      case "hightolow":
        setData(data.sort((a, b) => b.price - a.price));
        break;
      case "lowtohigh":
        setData(data.sort((a, b) => a.price - b.price));
        break;
      case "best":
        // let best = data.sort((a, b) => b.features.length - a.features.length); //will use this later
        // if(best.length === 0){
        setData(data.sort((a, b) => a.quantity - b.quantity));
        // }
        // else{
        // setData(best);9
        // }
        // setData(data.sort((a, b) => b.features.length - a.features.length));
        break;
      case "new":
        setData(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        break;
      default:
        setData(data);
    }
    setshowsort(false);
  };
  const [subcategory, setSubcategory] = useState([]);
  const selectedsubCats = useSelector(selectSubcategory);
  useEffect(() => {
    if (selectedsubCats) {
      const selectedSubcategoryArray = Object.entries(selectedsubCats)
        .filter(([subcategory, isSelected]) => isSelected)
        .map(([subcategory]) => subcategory);

      setSubcategory(selectedSubcategoryArray);
    }
  }, [selectedsubCats]);

  const handleFilterSelection = (Ftitle, selectedFilters) => {
    console.log(Ftitle, selectedFilters);
    setSubcategory(selectedFilters);
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
      console.log(err);
    }
  };

  const closeModal = () => {
    setismodalopen(false);
  };
  const selectedCartData = useSelector(selectCart);

  const handeladdtocart = (obj) => {
    setisfilterbaropen(2);
    dispatch(addToCart(obj));
    if (selectedCartData.some(item => item._id === obj._id)) {
      toast.success("Added same product again", {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
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
  return (
    <div className="w-full">
      <div className="w-full flex pt-3 pb-2 gap-x-4 flex-wrap lg:flex-nowrap gap-y-2 lg:gap-y-0 ">
        <div className="lg:w-8/12 w-full flex order-2 lg:order-1  gap-2 context text-text-secondary flex-wrap ">
          {subcategory.map((item, index) => (
            <div className="flex items-center gap-2  px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm py-1">
              <FaXmark className=" cursor-pointer text-xs" />
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
              onClick={() => setshowsort(!showsort)}
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
                  onClick={() => handleSortSelection(items, index)}
                >
                  {items.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {data?.length === 0 && loader ? (
          <Loader />
        ) : (
          <div className=" grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 context">
            {data?.length == 0 ? (
              <>
                <div className="flex items-center justify-center h-screen">
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
                        onClick={() =>
                          dispatch(fetchProducts("category", "all"))
                        }
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
              </>
            ) : (
              data?.map((items, index) => (
                <div key={index} className=" group relative">
                  <div className=" flex flex-col text-[#03071E]">
                    <div className="   cursor-pointer  transition-all duration-100 relative rounded-[6px]  lg:group-hover:opacity-50 h-[200px] w-full overflow-hidden">
                      {/* <img src={`/images/web/categories/${items.img}`} alt="" className="h-[100%] w-[100%]" /> */}
                      <Image
                        // src={`/images/web/categories/${items.img}`}
                        src={`${items?.images[0]}`}
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <Link href={`/productinfo/${items._id}`}>
                      <h6 className=" font-[700]  text-[1.1rem] mt-2  leading-[1rem] overflow-hidden whitespace-nowrap text-ellipsis ">
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
              ))
            )}
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
          {filtertypes.map((items, index) => (
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
                      {items.title}
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
                  subcategory={items.subcategory}
                  showCount={filtercount}
                  indexing={index}
                  onShowMore={() => handelshowmore(index)}
                  onShowLess={() => handelshowless(index)}
                  onFilterSelection={handleFilterSelection}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center gap-x-4 py-3">
          <button className="w-4/12 border border-[#000000] text-text-secondary text-lg font-[300] py-1 rounded-[22px]">
            Reset
          </button>
          <button className="w-8/12 border bg-[#F8B43A] text-text-secondary text-lg font-[500] py-1 rounded-[22px] ">
            Apply filter
          </button>
        </div>
      </div>

      <div
        className={`your-specific-class fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm lg:w-[350px] w-[80%]  top-0 z-30 rounded-tl-[28px] border py-3 context ${
          cartOpenState? "block" : "hidden"
        }`}
        ref={divRef}
      >
        <div className="py-3 px-6 w-full flex gap-x-4 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700]">
          <FaXmark
            className=" cursor-pointer"
            onClick={
              ()=>dispatch(closeCart())
            }
          />{" "}
          Cart
        </div>
        <Productcart
          handelCartShow={
            cartOpenState
          }c
        />
      </div>

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
        <Sidemenu />
      </div>

      <Modal
        visible={ismodalopen}
        effect="fadeInDown"
        onClickAway={closeModal}
      >
        <Productmodal produtdata={productdata} modalclose={closeModal} />
      </Modal>
      <ToastContainer />
    </div>
  );
}
