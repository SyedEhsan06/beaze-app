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
import cookieCutter from "cookie-cutter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { closeCart, openCart } from "@/redux/slices/cartOpenSlice";
import { usePathname, useRouter } from "next/navigation";
import {
  addMultiCategory,
  toggleCategoryCall,
  addMultiSubcategory,
  toggleCategory,
  toggleFix,
  toggleSubcategory,
  addSearch,
  selectSearch
} from "@/redux/slices/filterSlice";
import { selectCartOpen } from "@/redux/slices/cartOpenSlice";
import Productcart from "../categories/Productcart";
import axios from "axios";
import { selectUser, setUser, updateUser } from "@/redux/slices/userData.slice";
import { FaChevronRight } from "react-icons/fa";

export default function Header() {
  const [scrollLength, setScrollLength] = useState(0);
  const [showmenu, setshowmenu] = useState(false);
  const [showhide, setshowhide] = useState(0);
  const [showshop, setshowshop] = useState(false);
  const [shopmenudata, setshopmenudata] = useState([]);
  const [searchdata, setsearchdata] = useState([]);
  const [showsearchmobile, setshowsearchmobile] = useState(false);
  const [productpathname, setproductpathname] = useState(false);
  const inputRef = useRef(null);
const router = useRouter();
const searchSelector = useSelector(selectSearch);
const profilelogindata = useSelector(selectUser);
console.log({'profilelogindata' : profilelogindata})
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    setScrollLength(window.scrollY);
  };
  const cartOpenState = useSelector(selectCartOpen);
  const shopRef = useRef(null);
  const divRef = useRef(null);
  const cartref = useRef(null);
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

  let selectData = useSelector(selectCategories);
  useEffect(() => {
    if (selectData.length === 0) {
      dispatch(fetchCategories());
    }
    setshopmenudata(selectData.categories);
  }, [selectData]);

  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(selectData);
  }, [selectData]);
  const [categoryState, setCategories] = useState([]);
  const [subcategoryState, setSubcategories] = useState([]);
  useEffect(() => {
    if (data?.categories?.length > 0) {
      const subcategories = data?.categories
        ?.map((item) => item.subcategories)
        .flat()
        .map((item) => item.name);
      setSubcategories([...subcategories]);
      const categories = data?.categories?.map((item) => item.name);
      setCategories([...categories]);
    }
  }, [data]);
  const [renderTest, setRenderTest] = useState(false);
  const handleShopClick = (e) => {
    // e.preventDefault();
    if (e.target.classList.contains("menu-text")) {
      setshowmenu(true);
      dispatch(toggleSubcategory([]));
      dispatch(toggleCategory([]));
      dispatch(toggleFix([]));
      dispatch(addSearch(""));

      dispatch(addMultiSubcategory(subcategoryState));
      // dispatch(toggleFix(categoryState));
      // dispatch(addMultiCategory(categoryState));
    }
  };
  //   useEffect(() => {
  // dispatch(toggleSubcategory([]));
  //   dispatch(toggleCategory([]));
  //   dispatch(addMultiSubcategory(subcategoryState));
  //   // dispatch(addMultiCategory(categoryState));
  // }, [subcategoryState, categoryState,renderTest]);
  const [search, setSearch] = useState("");
  const handelsearch = (val) => {
    if (window.innerWidth < 767) {
      setshowsearchmobile(true);
    } else {
      setshowhide(4);
      setshowsearchmobile(false);
    }

    setSearch(val);
    console.log(val);
    if (val.length === 0) {
      setshowhide(0);
      setshowsearchmobile(false);
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
  }, [search,searchSelector]);
  useEffect(() => {
    if(searchSelector.length <= 0){
      setsearchdata([])
      setSearch("");
      sessionStorage.removeItem("cachedData");
      sessionStorage.removeItem("cachedSearchText");
    }
  }, [searchSelector]);
  
  console.log(searchSelector);
  const handleDispatch = () => {
    dispatch(toggleSubcategory([]));
    dispatch(toggleCategory([]));
    dispatch(toggleCategoryCall([]));
    setshowhide(0);
    if (search.length >= 1) {
      dispatch(addSearch(search));
    }
    setSearch("");
    // console.log(searchdata);
    // const subcategories = searchdata.map((item) => item.subcategory);
    // console.log(subcategories);
    // const unique = [...new Set(subcategories)];
    // const category = searchdata.map((item) => item.category);
    // const uniqueCategory = [...new Set(category)];
    // dispatch(toggleFix(subcategories));
    // let type = "search";
    // if (search.length >= 1) {
    //   unique.forEach((subcategory) => {
    //     dispatch(toggleSubcategory(subcategory));
    //   });
    // }
  };
  const [cartOpen, setCartOpen] = useState(false);
  const handleCartOpen = () => {
    setCartOpen(!cartOpen);
  };
  const cartState = useSelector(selectCartOpen);
  // console.log(cartState);
  useEffect(() => {
    if (cartOpen) {
      dispatch(openCart());
    } else {
      dispatch(closeCart());
    }
    // console.log(cartOpen);
  }, [cartOpen, dispatch]);

  // console.log(cartState);
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
    let supCount = countData.map((item) => item.p_id);
    let unique = [...new Set(supCount)];
    let count = unique.length;
    setCount(count);
  }, [countData]);
  const hideoutside = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setshowshop(false);
      setshowhide(0);
      setshowsearchmobile(false);
    }
  };

  const hideoutsidecart = (e) => {
    if (cartref.current && !cartref.current.contains(e.target)) {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", hideoutside);
    return () => {
      document.removeEventListener("mousedown", hideoutside);
    };
  }, [hideoutside]);
  useEffect(() => {
    document.addEventListener("mousedown", hideoutsidecart);
    return () => {
      document.removeEventListener("mousedown", hideoutsidecart);
    };
  }, [hideoutsidecart]);

  const handleshowmenu = () => {
    showhide === 1 ? setshowhide(0) : setshowhide(1);
  };

  useEffect(() => {
    const header = document.querySelector("header");

    if (header) {
      if (cartOpen) {
        document.body.classList.add("blurbody");
        header.classList.remove("absolute");
        header.classList.add("headerfixed");
      } else {
        document.body.classList.remove("blurbody");
        header.classList.remove("headerfixed");
        header.classList.add("absolute");
      }
    }

    return () => {
      document.body.classList.remove("blurbody");
    };
  }, [cartOpen]);

  const handelfocuonserch = () => {
    setshowhide(2);
    // inputRef.current.focus()
  };

  useEffect(() => {
    const header = document.querySelector("header");
    if (showhide !== 0) {
      document.body.classList.add("blurbody");
      header?.classList.remove("absolute");
      header?.classList.add("headerfixednotblur");
    } else {
      document.body.classList.remove("blurbody");
      header?.classList.remove("headerfixednotblur");
      header?.classList.add("absolute");
    }
    // Cleanup the class when the component unmounts
    return () => {
      document.body.classList.remove("blurbody");
    };
  }, [showhide]);
  const [userData, setUserData] = useState();
  const path = usePathname();
  // console.log(process.env.NEXT_PUBLIC_API_URL)
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`;
  const fetchDataProfile = async () => {
    // console.log("fetching user data");
    // console.log(localStorage.getItem("token"));
    try {
      // console.log(url);
      // const token = localStorage.getItem("token");
      const token = cookieCutter.get("token");
      // console.log(token);/
      if (token) {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        setUserData(res.data.user);
        dispatch(setUser(res.data.user));
      }
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // console.log(userData?.first_name)
  // useEffect(() => {
  //   fetchData();
  // }, [path, setUserData, window ? localStorage.getItem("token") : null]);
  const selectDataOfUser = useSelector(selectUser);
  useEffect(() => {
    fetchDataProfile();
    
  }, [
    path,
    // setUserData,
    dispatch
    // selectDataOfUser,
    // typeof window !== "undefined" ? localStorage.getItem("token") : null,
  ]);
  const handleRecentSearch = (e) => {
    const search = e.target.textContent;
    console.log(search);
    handelsearch(search);
    dispatch(addSearch(search));
    setshowhide(0);
    setSearch("");
    setshowsearchmobile(false);
  };

  const handleLogout = () => {
    cookieCutter.set("token", "");
    router.push("/");
    dispatch(updateUser({first_name: '',last_name: '',phone_number: '',address: [],cart: [],email: '',role: '',isVerified: false}));

};


  const pathname = usePathname();
  useEffect(() => {
    const matchResult = pathname.match(/\/productinfo/);
    const productInfoPart = matchResult ? matchResult[0] : null;
    if(productInfoPart === '/productinfo' ){
      setproductpathname(true);
    }else{
      setproductpathname(false);
    }
  
  }, [pathname, cartOpenState]);
  if (pathname === "/login" || pathname === "/signup" || pathname === "/otp") {
    return null;
  } else {
    return (
      <>
        <header
          className={`lg:h-[100px] h-[70px] showmenu lg:pt-[30px]  z-30 w-full shadow py-2 transition-all duration-150 ${
            scrollLength > 620 || productpathname
              ? "fixed top-0 left-0 bg-white border z-20 "
              : " absolute top-0 left-0 lg:bg-transparent bg-white bg-opacity-[50%] linkshdow"
          }`}
        >
          <nav className="lg:block hidden ">
            <ul className="px-3  flex items-center m-0  justify-between text-[20px] xl:[24px] ">
              <li className="px-2">
                <Link href={"/"}>
                  {" "}
                  <Image
                    src="/images/logo.png"
                    width={60}
                    height={60}
                    alt="logo"
                  />
                </Link>
              </li>
              <Link href={"/products"}>
                <li
                  ref={shopRef}
                  className={`group context menu-text showmenu   px-5 duration-75 transition-all cursor-pointer ${
                    showmenu
                      ? "bg-white  rounded-2xl font-[800]"
                      : "font-semibold"
                  }`}
                  onClick={(e) => handleShopClick(e)}
                  onMouseEnter={() => setshowmenu(true)}
                  onMouseLeave={() => setshowmenu(false)}
                >
                  Shop
                  {showmenu && (
                    <div className="absolute showmenu bg-transparent py-[20px]   w-full left-0 top-[70%] transition-all duration-75">
                      <div className=" bg-[#EBE9DB] pt-8 pb-16 px-40 ">
                        <Shopmenu
                          meudata={shopmenudata}
                          Closeref={setshowhide}
                          closevaribale={setshowshop}
                          showmenucose={setshowmenu}
                        />
                      </div>
                    </div>
                  )}
                </li>
              </Link>

              <li className="context font-semibold px-2">
                <Link href={"/"}>About </Link>{" "}
              </li>
              <li className="w-[350px] xl:w-[400px] flex  bg-white rounded shadow-sm items-center justify-center px-2 border gap-3 relative transition-all duration-150 ">
                <div
                  className="w-[8.33%] text-[#9B9494] font-bold
                cursor-pointer
                "
                >
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
                    onClick={() => setshowhide(4)}
                    value={search}
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
                  ref={divRef}
                  className={`w-full absolute border shadow-sm   text-sm bg-white top-[105%] left-0 rounded-[4px]  context ${
                    showhide === 4 ? "block " : "hidden"
                  }`}
                >
                  <div
                    className={`pt-4 ${
                      searchdata?.length >= 1 ? "block" : "hidden"
                    }`}
                  >
                    <h4 className="text-lg font-semibold px-3">Top Results</h4>

                    <div className=" max-h-[415px] overflow-y-auto">
                      {searchdata?.map((items, index) => (
                        <Link
                          href={`/productinfo/${items._id}`}
                          key={index}
                          onClick={() => {
                            setshowhide(0);
                          }}
                        >
                          <div className="py-4 px-4 flex gap-x-5  border-b-[0.5px] border-[#DBD9D9]">
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
                      <Link href={`/products`} onClick={handleDispatch}>
                        <button className=" bg-theme-footer-bg capitalize  font-[600] text-xl text-center text-white py-3 w-full rounded-bl-[4px]  rounded-br-[4px] ">
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
                          <Link href={"/products"}>
                            <div
                              onClick={(e) => handleRecentSearch(e)}
                              key={index}
                              className="px-3 py-1 bg-[#F0F0F0] text-[#00000096] font-[400] border-[0.5px] border-[#98989880] border-opacity-[50%] rounded-[4px] text-sm] capitalize cursor-pointer"
                            >
                              {items.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="pb-6">
                      <h4 className="text-lg font-semibold">
                        Popular Searches
                      </h4>
                      <div className="w-full flex pt-2  gap-3 flex-wrap items-center">
                        {popularsearches.map((items, index) => (
                          <Link href={"/products"}>
                            <div
                              onClick={(e) => handleRecentSearch(e)}
                              key={index}
                              className="px-3 py-1 bg-[#F0F0F0] text-[#00000096] font-[400] border-[0.5px] border-[#98989880] border-opacity-[50%] rounded-[4px] text-sm] capitalize cursor-pointer"
                            >
                              {items.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className=" context font-semibold px-2">
                {" "}
                {profilelogindata?.first_name ? (
                  <>
                    <Link href={"/account"}>{profilelogindata.first_name}'s account |</Link>
                    <Link href={"/"} onClick={handleLogout}> Logout </Link>
                  </>
                ) : (
                  <>
                    <Link href={"/login"}>Sign in </Link> |{" "}
                    <Link href={"/signup"}> Create an Account </Link>{" "}
                  </>
                )}
              </li>
              <li
                className="context font-semibold px-2"
                onClick={handleCartOpen}
              >
                <button className="  flex gap-3 bg-gray-950 text-white font-semibold items-center py-2 rounded px-4 uppercase">
                  <div className=" relative">
                    <FaCartShopping size={18} className=" relative" />
                    {count !== 0 && (
                      <span className=" absolute right-[-30%] top-[-50%]  bg-[#F8B43A] mb-0 text-sm text-theme-footer-bg rounded-full leading-[10px] pt-[3px] px-[3px] font-[700] ">
                        {count}
                      </span>
                    )}
                  </div>{" "}
                  cart <span className="text-[14px] font-[400]"></span>
                </button>
              </li>
            </ul>
          </nav>

          <nav className={`block lg:hidden`}>
            <ul className="px-4  flex items-center m-0  justify-between text-[24px]">
              <li className="">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    width={60}
                    height={60}
                    alt="logo"
                  />
                </Link>
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
                  <div
                    className="absolute w-[100%] z-40 bg-[#EBE9DB] left-0 top-[100%] h-[92vh] transition-all duration-75  overflow-y-auto"
                    ref={divRef}
                  >
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
                    <div className=" py-5 px-3" ref={divRef}>
                      {showshop ? (
                        <div className="w-full mb-14">
                          <Shopmenu
                            meudata={shopmenudata}
                            Closeref={setshowhide}
                            closevaribale={setshowshop}
                            showmenucose={setshowmenu}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[100%]  ">
                          <div className="">
                            <ul className=" text-3xl font-[700]">
                              <li
                                className="pb-4 cursor-pointer flex items-center"
                                // onClick={() => setshowshop(true)}
                                onClick={() => {router.push('/products'); setshowhide(0)}}
                              >
                                Shop <FaChevronRight size={16} className="ml-auto mr-3"/>
                              </li>
                              <li
                                className="pb-4"
                                onClick={() => setshowhide(0)}
                              >
                                <Link href="/">About</Link>
                              </li>
                              {userData == null ? (
                                <>
                                  <li
                                    className="pb-4"
                                    onClick={() => setshowhide(0)}
                                  >
                                    <Link href="/login">Sign in</Link>
                                  </li>
                                  <li onClick={() => setshowhide(0)}>
                                    <Link href="/signup">Create account</Link>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li
                                    className="pb-4"
                                    onClick={() => setshowhide(0)}
                                  >
                                    <Link href="/account">
                                      {userData.first_name}'s account
                                    </Link>
                                  </li>
                                </>
                              )}
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
                      onClick={handelfocuonserch}
                    />
                  )}

                  <div className=" relative">
                    <FaCartShopping
                      className=" relative"
                      onClick={handleCartOpen}
                    />
                    {count !== 0 && (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6  text-xs font-bold  text-text-secondary bg-[#FFB61D] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {count}
                      </div>
                    )}
                  </div>
                </button>
              </li>
            </ul>

            {showhide === 2 && (
              <div
                className="absolute   px-8  w-full left-0 top-[110%] transition-all duration-75"
                ref={divRef}
              >
                <input
                  type="text"
                  className="w-full context font text-[16px] focus:outline-none p-2 rounded text-[#03071E] border-2 shadow-sm "
                  placeholder="Search Tops, Jeans, Blazers, suspenders"
                  onChange={(e) => handelsearch(e.target.value)}
                  ref={inputRef}
                  value={search}
                />

                <div className="  relative">
                  <div
                    ref={divRef}
                    className={`w-[100%] absolute border shadow-sm text-sm bg-white top-[130%] left-0 rounded-[4px]  context ${
                      showsearchmobile ? "block" : "hidden"
                    }`}
                  >
                    <div
                      className={`pt-4 ${
                        searchdata.length >= 1 ? "block" : "hidden"
                      }`}
                    >
                      <h4 className="text-lg font-semibold px-3">
                        Top Results
                      </h4>

                      <div className=" max-h-[415px] overflow-y-auto">
                        {searchdata.map((items, index) => (
                          <Link
                            href={`/productinfo/${items._id}`}
                            key={index}
                            onClick={() => {
                              setshowhide(0);
                              setshowsearchmobile(false);
                            }}
                          >
                            <div className="py-4 px-4 flex gap-x-5  border-b-[0.5px] border-[#DBD9D9]">
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
                        <Link href={"/products"} onMouseDown={handleDispatch}>
                          <button className=" bg-theme-footer-bg capitalize  font-[600] text-xl text-center text-white py-3 w-full rounded-bl-[4px]  rounded-br-[4px] ">
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
                        <h4 className="text-lg font-semibold">
                          Recent Searches
                        </h4>
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
                        <h4 className="text-lg font-semibold">
                          Popular Searches
                        </h4>
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
                </div>
              </div>
            )}
          </nav>
        </header>

        <div
          className={`your-specific-class fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm lg:w-[425px] md:w-[400px] w-[80%]  top-0 z-[300] rounded-tl-[28px] border py-3 context ${
            cartOpenState ? "block" : "hidden"
          }`}
          ref={cartref}
        >
          <div className="py-3 px-6 w-full flex gap-x-7 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700] items-center cursor-pointer" onClick={() => setCartOpen(false)}>
         <div>
         <img src="/images/web/xmark.png" className="w-[18px]" alt="" />
         </div>
            Cart
          </div>
          <Productcart setCartOpen={setCartOpen} />
        </div>
      </>
    );
  }
}
