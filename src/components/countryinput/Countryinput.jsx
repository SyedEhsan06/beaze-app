import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { countrylist } from "@/utils/countrylist";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export default function Countryinput() {
  const [country, setcountry] = useState("+91");
  const [data, setdata] = useState(countrylist);
  const [showmneu, setshowmneu] = useState(false);
  const divRef = useRef();
  const hnadlefiltercountry = (val) => {
    if (val) {
      const lowerCaseSearch = val.toLowerCase();
      const filteredData = data.filter((country) =>
        country.name.toLowerCase().includes(lowerCaseSearch)
      );
      setdata(filteredData);
    } else {
      setdata(countrylist);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", hideOnescape, true);
    document.addEventListener("click", hideoutside, true);
  }, []);

  const hideOnescape = (e) => {
    if (e.key === "Escape") {
      setshowmneu(false);
    }
  };

  const hideoutside = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setshowmneu(false);
    }
  };

  return (
    <div className=" w-full context ">
      <label htmlFor="phoneno" className="mb-2">
        Your Phone Number{" "}
        <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">*</sup>{" "}
      </label>
      <div className="w-full flex gap-x-2 relative ">
        <div className="w-[20%]">
          <div className="w-[100%] border border-text-secondary bg-white py-3 cursor-pointer rounded-lg">
            <div className=" w-full">
              <div
                className=" w-full flex items-center"
                onClick={() => setshowmneu(!showmneu)}
              >
                <div className="w-[70%]">
                  <input
                    type="text"
                    value={country}
                    className="pl-2 font-[500] text-xl w-[100%] outline-none border-none focus:outline-none cursor-pointer "
                  />
                </div>

                <div className="w-[30%]">
                  <FaChevronDown
                    size={14}
                    className={` transition-all duration-150 ${
                      showmneu && "rotate-180"
                    }`}
                  />
                </div>
              </div>
              <div
                className={` bg-white rounded border shadow-sm pb-3 px-3 top-[105%] left-0 absolute w-[100%] transition-all duration-100 max-h-[300px] overflow-y-auto ${
                  showmneu ? "block z-50" : "hidden"
                }`}
              >
                <div
                  className=" w-full flex gap-x-2 items-center   sticky h-[20px] z-10 top-[12px] bg-white left-0"
                  ref={divRef}
                >
                  <div className="w-[85%]">
                    <input
                      type="search"
                      placeholder="Seacrh country"
                      className=" p-1 text-sm font-[400] focus:outline-none border shadow-sm rounded-sm w-full leading-normal"
                      onChange={(e) => hnadlefiltercountry(e.target.value)}
                    />
                  </div>
                  <button className="w-[25%] flex justify-center py-2 rounded-sm text-sm bg-theme-footer-bg text-white headtext ">
                    <FaSearch />
                  </button>
                </div>
                <ul className=" text-sm font-[400] headtext mt-6">
                  {data.map((items, index) => (
                    <li
                      className="w-full p-1 hover:bg-gray-400 duration-100 transition-all"
                      key={index}
                      onClick={() => setcountry(items.dial_code)}
                    >
                      {items.dial_code} : {items.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          <div className="w-full flex border border-text-secondary shadow-lg pl-2 pr-3 py-[13px] rounded-lg">
            <div className="w-[95%] ">
              <input
                type="text"
                id="phoneno"
                className="w-full border-none  focus:outline-none transition-all duration-100   relative  checkout-input"
                placeholder="Your Phone Number"
              />
            </div>
            <button className="w-[5%] text-[#039C2EB0]">
              <FaCheck size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
