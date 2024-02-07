"use client";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    handelgetshopmenudata();
  }, []);

  const handleScroll = () => {
    setScrollLength(window.scrollY);
  };

  const handelshowmenu = () => {
    showhide === 1 ? setshowhide(0) : setshowhide(1);
  };
  const handelgetshopmenudata = async () => {
    try {
      const response = await fetchData("category");
      setshopmenudata(response.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.addEventListener("click", function (event) {
      if (!event.target.className.includes("showmenu")) {
        setshowmenu(false);
      }
    });
  }, []);

//   const handelsearch = (val) => {
//     if (val.length >= 3) {
//       setshowhide(4);
//     const fetchdata = async () => {
//         try {
//             console.log(val);
//             const response = await fetchData(`products?search=${val}`);
//             setsearchdata(response.products);
//             console.log(response);
//         } catch (err) {
//             console.log(err);
//         }
//     };
    
//     } else {
//       setshowhide(0);
//       setsearchdata([]);
//     }
//   };
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
          sessionStorage.setItem("cachedData", JSON.stringify(response.products));
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
      if (search.length >= 3) {
        fetchdata();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);
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
            className={`context showmenu   px-5 duration-75 transition-all cursor-pointer ${
              showmenu ? "bg-white  rounded-2xl font-[800]" : "font-semibold"
            }`}
            onClick={() => setshowmenu(!showmenu)}
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
                    <div
                      className="py-4 px-4 flex gap-x-5  border-b-[0.5px] border-[#DBD9D9]"
                      key={index}
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
                  ))}

                 
                </div>

                <div className="w-full">
                    <button className=" bg-theme-footer-bg capitalize  font-[600] text-xl text-center text-white py-3 w-full rounded-bl-[4px]  rounded-br-[4px] ">
                      View All Results
                    </button>
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
            <button className="flex gap-3 bg-gray-950 text-white font-semibold items-center py-1 rounded px-4 uppercase">
              <FaCartShopping size={18} /> cart
            </button>
          </li>
        </ul>

        {showmenu && (
          <div className="absolute showmenu bg-[#EBE9DB] pt-8 pb-16 px-40 w-full left-0 top-[100%] transition-all duration-75">
            <Shopmenu meudata={shopmenudata} />
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
              <div className="absolute w-[80%]  bg-[#EBE9DB] left-0 top-[100%] h-[92vh] transition-all duration-75  overflow-y-auto">
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
                    <div className="w-full">
                      <Shopmenu meudata={shopmenudata} />
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