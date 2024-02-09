"use client";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import Shopmenu from "./Shopmenu";
import { FaXmark, FaChevronLeft } from "react-icons/fa6";
import { fetchData } from "@/utils/apicall";
import {
  popularsearches,
  recentsearch,
  searchdatadummy,
} from "@/utils/dummydata";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { closeCart, openCart } from "@/redux/slices/cartOpenSlice";

export default function Header() {
  const [scrollLength, setScrollLength] = useState(0);
  const [showmenu, setshowmenu] = useState(false);
  const [showhide, setshowhide] = useState(0);
  const [showshop, setshowshop] = useState(false);
  const [shopmenudata, setshopmenudata] = useState([]);
  const [searchdata, setsearchdata] = useState([]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
    
  const handleScroll = () => {
    setScrollLength(window.scrollY);
  };
  const shopRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (shopRef.current && !shopRef.current.contains(event.target)) {
            setshowmenu(false);
        }
    };

    if (window.innerWidth < 768) {
        document.addEventListener("click", handleClickOutside);
    } else {
        document.addEventListener("click", handleClickOutside);
    }

    return () => {
        if (window.innerWidth < 768) {
            document.removeEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
    };
}, [shopRef]);


  const handelshowmenu = () => {
    showhide === 1 ? setshowhide(0) : setshowhide(1);
  };
  const dispatch = useDispatch();
  let selectData = useSelector(selectCategories);
  useEffect(() => {
    if (selectData.length === 0) {
      dispatch(fetchCategories());
    }
    setshopmenudata(selectData.categories);
  }, [selectData]);

  const [search, setSearch] = useState("");
  const handelsearch = (val) => {
    setshowhide(4);
    setSearch(val);
    if (val.length == 0) {
      setshowhide(0);
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const cachedData = sessionStorage.getItem("cachedData");
        const cachedSearchText = sessionStorage.getItem("cachedSearchText");

        if (search !== cachedSearchText) {
          const response = await fetchData(`products?search=${search}`);
          sessionStorage.setItem(
            "cachedData",
            JSON.stringify(response.products)
          );
          sessionStorage.setItem("cachedSearchText", search);
          setsearchdata(response.products);
        } else {
          if (cachedData) {
            setsearchdata(JSON.parse(cachedData));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    const timeoutId = setTimeout(() => {
      if (search.length >= 1) {
        fetchdata();
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);
  const handleDispatch = () => {
    setshowhide(0);
    let type = "search";
    if(search.length >= 1){
      dispatch(
        fetchProducts({
          type,
          item: search,
        })
      );
    }
  };
  const [cartOpen, setCartOpen] = useState(false);
  const handleCartOpen = () => {
    setCartOpen(!cartOpen);
    dispatch(openCart());
    if (cartOpen) {
      dispatch(closeCart());
    }
  };
  const [count, setCount] = useState(0);
  // let countData = useSelector((state) => state.cart.cart)
  // if(countData.length >= 1){
  //   //unique data
  //   let supCount = countData.map((item) => item._id);
  //   let unique = [...new Set(supCount)];
  //   let count = unique.length;
  //   setCount(count);
  // }
  const countData = useSelector((state) => state.cart.cart);
  useEffect(() => {
    console.log(countData);
      let supCount = countData.map((item) => item._id);
      let unique = [...new Set(supCount)];
      let count = unique.length;
      setCount(count);
    
  }, [countData]);
  return (
    <header
      className={`h-[70px] showmenu  z-10 w-full shadow py-2 transition-all duration-150 ${
        scrollLength > 620
          ? "fixed top-0 left-0 bg-white border z-20 "
          : " absolute top-0 left-0  bg-white bg-opacity-[50%] linkshdow"
      }`}
    >
      <nav className="lg:block hidden">
        <ul className="px-3  flex items-center m-0  justify-between text-[20px] xl:[24px] ">
          <li className="px-2">
            <Link href={"/"}>
              {" "}
              <Image src="/images/logo.png" width={60} height={60} alt="logo" />
            </Link>
          </li>
          <li
          ref={shopRef}
            className={`group context showmenu   px-5 duration-75 transition-all cursor-pointer ${
              showmenu ? "bg-white  rounded-2xl font-[800]" : "font-semibold"
            }`}
            onClick={() => setshowmenu(!showmenu)}
            onMouseEnter={() => setshowmenu(true)}
          
          >
            Shop
          </li>

          <li className="context font-semibold px-2">
            <Link href={"/"}>About </Link>{" "}
          </li>
          <li className="w-[350px] xl:w-[400px] flex  bg-white rounded shadow-sm items-center justify-center px-2 border gap-3 relative transition-all duration-150 ">
            <div className="w-[8.33%] text-[#9B9494] font-bold">
              <button className="px-2">
                <IoSearch size={20} />
              </button>
            </div>
            <div
              className={`w-10/12 transition-all duration-150 ${
                showhide == 4 ? "w-10/12" : "w-11/12"
              }`}
            >
              <input
                type="text"
                className="w-full context font text-[16px] focus:outline-none py-[8px] text-[#03071E] "
                placeholder="Search Tops, Jeans, Blazers, suspenders"
                onChange={(e) => handelsearch(e.target.value)}
              />
            </div>

            <div
              className={`w-1/12 text-[#9B9494] font-bold transition-all duration-150 ${
                showhide == 4 ? "w-1/12" : "hidden"
              }`}
            >
              <button
                className="px-2 text-[#2A0141]"
                onClick={() => setshowhide(0)}
              >
                <FaXmark size={20} />
              </button>
            </div>

            <div
              className={`w-full absolute border shadow-sm text-sm bg-white top-[105%] left-0 rounded-[4px]  context ${
                showhide == 4 ? "block" : "hidden"
              }`}
            >
              <div
                className={`pt-4 ${
                  searchdata.length >= 1 ? "block" : "hidden"
                }`}
              >
                <h4 className="text-lg font-semibold px-3">Top Results</h4>

                <div className=" max-h-[415px] overflow-y-auto">
                  {searchdata.map((items, index) => (
                   <Link href={`/productinfo/${items._id}`} key={index}
                    onClick={
                      () => {
                        setshowhide(0);
                      }
                    }
                  >
                     <div
                      className="py-4 px-4 flex gap-x-5  border-b-[0.5px] border-[#DBD9D9]"        
                    >
                      <div className="w-4/12  relative   h-[105px]  overflow-hidden rounded-[8px]">
                        <Image
                          src={
                            items.images
                              ? items.images[0]
                              : "/images/web/product/notfound.png"
                          }
                          alt="Your Image"
                          layout="fill"
                          objectFit="cover"
                        ></Image>
                      </div>
                      <div className="w-8/12 flex flex-col py-2 ">
                        <h5 className=" text-lg font-[400] leading-[1rem]">
                          {items.title}
                        </h5>
                        <p className=" text-sm font-[300] mt-2 ">
                          {" "}
                          Rs {items.price}
                        </p>
                        <p className=" text-xs font-[200] mt-auto">
                          {items.desc}
                        </p>
                      </div>
                    </div>
                    </Link>
                  ))}

                 
                </div>

                <div className="w-full">
                    <Link href={'/products'}

                      onMouseDown={handleDispatch}>
                    <button
                    className=" bg-theme-footer-bg capitalize  font-[600] text-xl text-center text-white py-3 w-full rounded-bl-[4px]  rounded-br-[4px] ">
                      View All Results
                    </button>
                      </Link>
                  </div>
              </div>
              <div
                className={`px-3 py-4 ${
                  searchdata.length >= 1 ? "hidden" : "block"
                }`}
              >
                <div className="pb-6">
                  <h4 className="text-lg font-semibold">Recent Searches</h4>
                  <div className="w-full flex pt-2  gap-3 flex-wrap items-center">
                    {recentsearch.map((items, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-[#F0F0F0] text-[#00000096] font-[400] border-[0.5px] border-[#98989880] border-opacity-[50%] rounded-[4px] text-sm] capitalize cursor-pointer"
                      >
                        {items.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pb-6">
                  <h4 className="text-lg font-semibold">Popular Searches</h4>
                  <div className="w-full flex pt-2  gap-3 flex-wrap items-center">
                    {popularsearches.map((items, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-[#F0F0F0] text-[#00000096] font-[400] border-[0.5px] border-[#98989880] border-opacity-[50%] rounded-[4px] text-sm] capitalize cursor-pointer"
                      >
                        {items.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className=" context font-semibold px-2">
            {" "}
            <Link href={"/"}>Sign in </Link> |{" "}
            <Link href={"/"}> Create an Account </Link>{" "}
          </li>
          <li className="context font-semibold px-2">
            <button
            onClick={handleCartOpen
            }
            className="flex gap-3 bg-gray-950 text-white font-semibold items-center py-1 rounded px-4 uppercase">
              <FaCartShopping size={18} /> cart <span className="text-[14px] font-[400]">{count}</span>
            </button>
          </li>
        </ul>

        {showmenu && (
          <div  className="absolute showmenu bg-[#EBE9DB] pt-8 pb-16 px-40 w-full left-0 top-[100%] transition-all duration-75">
            <Shopmenu meudata={shopmenudata} Closeref={shopRef} />
          </div>
        )}
      </nav>

      <nav className={`block lg:hidden`}>
        <ul className="px-4  flex items-center m-0  justify-between text-[24px]">
          <li className="">
            <Image src="/images/logo.png" width={60} height={60} alt="logo" />
          </li>
          <li className="context font-semibold flex items-center">
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={handelshowmenu}
            >
              Menu{" "}
              <IoIosArrowDown
                className={`mt-[2px] transition-all duration-75 ${
                  showhide === 1 && " rotate-[180deg]"
                }`}
                size={18}
              />
            </div>
            {showhide === 1 && (
              <div className="absolute w-[80%] z-40 bg-[#EBE9DB] left-0 top-[100%] h-[92vh] transition-all duration-75  overflow-y-auto">
                <div className="w-full flex">
                  {showshop && (
                    <button className="text-white text-2xl p-2 bg-gray-950">
                      <FaChevronLeft
                        size={22}
                        onClick={() => setshowshop(false)}
                      />
                    </button>
                  )}
                  <button
                    className=" ml-auto text-white text-2xl p-2 bg-gray-950"
                    onClick={() => setshowhide(0)}
                  >
                    <FaXmark />
                  </button>
                </div>
                <div className=" py-5 px-3">
                  {showshop ? (
                    <div className="w-full" >
                      <Shopmenu meudata={shopmenudata}  Closeref={shopRef}/>
                    </div>
                  ) : (
                    <div className="w-full h-[100%]  ">
                      <div className="">
                        <ul className=" text-3xl font-[700]">
                          <li
                            className="pb-4 cursor-pointer"
                            onClick={() => setshowshop(true)}
                          >
                            Shop
                          </li>
                          <li className="pb-4">
                            <Link href="/">About</Link>
                          </li>
                          <li className="pb-4">
                            <Link href="/">Sing in</Link>
                          </li>
                          <li>
                            <Link href="/">Create account</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>

          <li className="context font-semibold">
            <button className="flex items-center gap-x-6 justify-center cursor-pointer">
              {showhide == 2 ? (
                <FaXmark
                  className=" cursor-pointer"
                  onClick={() => setshowhide(0)}
                />
              ) : (
                <IoSearch
                  className=" cursor-pointer"
                  onClick={() => setshowhide(2)}
                />
              )}
              <FaCartShopping />
            </button>
          </li>
        </ul>

        {showhide === 2 && (
          <div className="absolute   px-8  w-full left-0 top-[110%] transition-all duration-75">
            <input
              type="text"
              className="w-full context font text-[16px] focus:outline-none p-2 rounded text-[#03071E] "
              placeholder="Search Tops, Jeans, Blazers, suspenders"
            />
          </div>
        )}
      </nav>
    </header>
  );
}