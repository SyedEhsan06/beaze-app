import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { countrylist } from "@/utils/countrylist";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Countryinput({ onCountryChange, onPhoneChange,defaultValue ,userdata,editable,alreadyresgiter,checknumtendigit,iconshow}) {
  const [country, setCountry] = useState("+91");

  const [phone, setPhone] = useState(); // Define phone state
  // userdata?.phone_number?.replace("+91", "") || ""
  // useEffect(() => {
  //   setPhone(userdata?.phone_number?.replace("+91", "") || ""); // Set phone state to default value
  // }, [userdata,defaultValue]);
  useEffect(() => {
    setPhone(userdata?.phone_number?.replace("+91", "") || ""); // Set phone state to default value
  }, [userdata]);
 console.log(userdata)
  console.log(defaultValue)
  const [data, setData] = useState(countrylist);
  const [showMenu, setShowMenu] = useState(false);
  const[localvalidation,setlocalvalidation] = useState(0)
  const divRef = useRef();
console.log(userdata)
  const handleFilterCountry = (val) => {
    if (val) {
      const lowerCaseSearch = val.toLowerCase();
      const filteredData = countrylist.filter((country) =>
        country.name.toLowerCase().includes(lowerCaseSearch)
      );
      setData(filteredData);
    } else {
      setData(countrylist);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOutside, true);
    return () => {
      document.removeEventListener("keydown", hideOnEscape, true);
      document.removeEventListener("click", hideOutside, true);
    };
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setShowMenu(false);
    }
  };

  const hideOutside = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };


  return (
    <div className="w-full context">
      <label htmlFor="phoneno" className="mb-2">
        Your Phone Number{" "}
        <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">*</sup>{" "}
      </label>
      <div className="w-full flex gap-x-2 relative">
        <div className="w-[20%]">
          <div className="w-[100%] border border-text-secondary shadow-input bg-white h-[54px] cursor-pointer rounded-lg flex items-center">
            <div className="w-full">
              <div
                className="w-full flex items-center"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="w-[70%]">
                  <input
                    type="text"
                    value={country}
                    className="pl-2 font-[500] lg:text-xl text-[1rem] w-[100%] outline-none border-none focus:outline-none cursor-pointer"
                    onChange={(e) => {
                      setCountry(e.target.value);
                      onCountryChange(e.target.value); // Invoke callback
                    }}
                  />
                </div>

                <div className="w-[30%]">
                  <FaChevronDown
                    size={14}
                    className={`transition-all duration-150 ${
                      showMenu && "rotate-180"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`bg-white rounded border shadow-sm pb-3 px-3 top-[105%] left-0 absolute w-[100%] transition-all duration-100 max-h-[300px] overflow-y-auto ${
                  showMenu ? "block z-50" : "hidden"
                }`}
              >
                <div className="w-full flex gap-x-2 items-center sticky h-[20px] z-10 top-[12px] bg-white left-0" ref={divRef}>
                  <div className="w-[85%]">
                    <input
                      type="search"
                      placeholder="Search country"
                      className="p-1 text-sm font-[400] focus:outline-none border shadow-sm rounded-sm w-full leading-normal"
                      onChange={(e) => handleFilterCountry(e.target.value)}
                    />
                  </div>
                  <button className="w-[25%] flex justify-center py-2 rounded-sm text-sm bg-theme-footer-bg text-white headtext">
                    <FaSearch />
                  </button>
                </div>
                <ul className="text-sm font-[400] headtext mt-6">
                  {data.map((item, index) => (
                    <li
                      className="w-full p-1 hover:bg-gray-400 duration-100 transition-all"
                      key={index}
                      onClick={() => {
                        setCountry(item.dial_code);
                        setShowMenu(false); // Hide menu on selection
                        onCountryChange(item.dial_code); // Invoke callback
                      }}
                    >
                      {item.dial_code}: {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          <div className={`w-full flex border items-center relative  shadow-input  overflow-hidden rounded-lg ${alreadyresgiter ? ' border-[#FF0000]' : 'border-text-secondary'}`}>
            <div className="w-[100%] ">
              <input
                type="number"
                id="phoneno"
                className="w-full no-spinner pl-2 border-none focus:outline-none transition-all duration-100 h-[52px] relative no-spinners checkout-input"
                inputMode="numeric"
                onChange={(e) => {
                  setPhone(e.target.value); // Update phone state
                  onPhoneChange(e.target.value); // Invoke callback
               
                }}
                value={phone}
                disabled={!editable}
              />
            </div>
         {
          iconshow &&    <span className=" absolute right-[14px] top-[20px]" >
            {alreadyresgiter ? (
    <></>
  ) : (
    checknumtendigit ? (
      <FaXmark size={14} className="text-[#D00000]" />
    ) : (
      <FaCheck size={14} className="text-[#039C2EB0]" />
    )
  )}
            </span>
         }
          </div>
        </div>
      </div>
    </div>
  );
}
