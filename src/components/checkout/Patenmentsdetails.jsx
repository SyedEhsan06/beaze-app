"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import Countryinput from "../countryinput/Countryinput";
import Modal from "react-awesome-modal";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import Otpinput from "../otp/Otpinput";
import { selectCart } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
export default function Patenmentsdetails() {
  
  const [selectedCountry, setSelectedCountry] = useState();
  const [tabs, settabs] = useState(0);
  const [ismodalopen, setismodalopen] = useState(false);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [address_line1, setAddressLine1] = useState("");
  const [address_line2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [isBillingSame, setIsBillingSame] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isNewsLetter, setIsNewsLetter] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState({});
  //api1
  const dataFromStore = useSelector(selectCart);
  console.log(dataFromStore);
  useEffect(() => {
    setCartData(dataFromStore);
  }, []);
  const handleOtpSend = async () => {
    setismodalopen(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          phone: `+91${phone}`,
          first_name: first_name,
          last_name: last_name,
          address: {
            address_line1: address_line1,
            address_line2: address_line2,
            city: city,
            state: state,
            pincode: pincode,
          },
          cart: cartData,
          total: totalPrice,
          payment: paymentMethod,
          paymentStatus: paymentStatus,
          status: orderStatus,
          createmyaccount: isAccountCreated,
        }
      );
      console.log(response.data);
      setIsOtpSent(true);

      // Handle response data as needed
    } catch (error) {
      console.error("Error sending OTP request:", error);
      // Handle error
    }
  };
  const handleOrderPlace = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          phone: `+91${phone}`,
          first_name: first_name,
          last_name: last_name,
          address: {
            address_line1: address_line1,
            address_line2: address_line2,
            city: city,
            state: state,
            pincode: pincode,
          },
          cart: cartData,
          total: totalPrice,
          payment: paymentMethod,
          paymentStatus: paymentStatus,
          status: orderStatus,
          createmyaccount: isAccountCreated,
          otp: otp,
        }
      );
      console.log(response.data);
      setIsOrderPlaced(true);
      setOrderData(response.data);
      // Handle response data as needed
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error
    }
  };
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };
  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const closeModal = () => {
    setismodalopen(false);
  };

  return (
    <div className=" w-full">
      <div className=" flex lg:gap-x-10 gap-x-3  headtext font-[600]  items-center md:px-4 mt-4 ">
        <div>
          <button className=" font-[800] lg:text-3xl text-2xl text-[#039C2EB0] text-opacity-[69%] flex items-center">
            <IoIosCheckmarkCircle size={20} />
            Cart
          </button>
        </div>
        <div>
          <div className=" relative min-w-[20px] max-w-[150px]">
            <Image
              src={"/images/web/lognarrow.png"}
              layout="fill"
              objectFit="cover"
              className=" !static"
              alt={`image not fond`}
            />
          </div>
        </div>
        <div>
          <button className="lg:text-2xl text-xl">Checkout</button>
        </div>
        <div>
          <div className=" relative min-w-[20px]  max-w-[150px] ">
            <Image
              src={"/images/web/lognarrow.png"}
              layout="fill"
              objectFit="cover"
              className=" !static"
              alt={`image not fond`}
            />
          </div>
        </div>
        <div>
          <button className="text-[#998F8F] lg:text-2xl text-xl">
            Payment
          </button>
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:gap-y-5 gap-y-3 mt-4">
        <div className="w-full">
          <div
            className={`w-full bg-white p-5 shadow-sm border flex ${
              tabs === 0 ? "hidden" : "block"
            }`}
          >
            <h6
              className="headtext font-extrabold lg:text-[1.5rem] text-xl text-text-secondary cursor-pointer"
              onClick={() => settabs(0)}
            >
              Welcome Sherlock
            </h6>
            <button
              className="ml-auto underline context  text-text-secondary  font-[400] lg:text-lg text-sm"
              onClick={() => settabs(0)}
            >
              Edit
            </button>
          </div>
          <div
            className={` bg-white p-4 shadow-sm ${
              tabs === 0 ? "block" : "hidden"
            }`}
          >
            <div>
              <h6 className=" headtext text-text-secondary font-[700] lg:text-[1rem] text-xs">
                Access your Account or Checkout as a Guest
              </h6>
            </div>

            <div className="mt-5">
              <div className="w-full grid lg:grid-cols-2  grid-cols-1 gap-5 font-[500] lg:text-lg text-sm">
                <div className=" w-full context">
                  <label htmlFor="=firstname" className="mb-2">
                    Your First Name{" "}
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>{" "}
                  </label>
                  <div className="w-full flex border border-text-secondary shadow-lg pl-2 pr-3  rounded-lg">
                    <div className="w-[95%] ">
                      <input
                        type="text"
                        id="firstname"
                        className="w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal h-[52px] checkout-input"
                        placeholder="Your First name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <button className="w-[5%] text-[#039C2EB0]">
                      <FaCheck size={14} />
                    </button>
                  </div>
                </div>
                <div className=" w-full context">
                  <label htmlFor="lastname" className="mb-2">
                    Your Last Name{" "}
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>{" "}
                  </label>
                  <div className="w-full flex border border-text-secondary shadow-lg pl-2 pr-3  rounded-lg">
                    <div className="w-[95%] ">
                      <input
                        type="text"
                        id="lastname"
                        className="w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal checkout-input h-[52px]"
                        placeholder="Your Last name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}

                      />
                    </div>
                    <button className="w-[5%] text-[#039C2EB0]">
                      <FaCheck size={14} />
                    </button>
                  </div>
                </div>
                <Countryinput editable={true} onCountryChange={handleCountryChange} onPhoneChange={handlePhoneChange} />

              </div>
              <div className=" w-full my-6 context">
                <div className=" flex gap-2 lg:gap-0 items-center">
                  <div className="w-[5%]">
                    <div className=" relative">
                      <input
                        type="checkbox"
                        id="accout"
                        className=" !top-[-9px] "
                        value={isAccountCreated}
                        onChange={() => setIsAccountCreated(!isAccountCreated)}
                      />
                    </div>
                  </div>

                  <div className="w-[95%]">
                    <label
                      htmlFor="accout"
                      className=" font-[400] lg:text-[1rem] text-sm cursor-pointer"
                    >
                      Automatically create an account for me
                    </label>
                  </div>
                </div>

                <div className=" flex lg:gap-0 gap-2  items-center mt-1">
                  <div className="w-[5%]">
                    <div className=" relative">
                      <input
                        type="checkbox"
                        id="news"
                        className=" !top-[-9px] "
                        value={isNewsLetter}
                        onChange={() => setIsNewsLetter(!isNewsLetter)}
                      />
                    </div>
                  </div>

                  <div className="w-[95%]">
                    <label
                      htmlFor="news"
                      className=" font-[400] lg:text-[1rem] text-sm cursor-pointer w-full"
                    >
                      Sign up for news, discounts, updates via whatsapp
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button
                  className="headtext font-[800]  lg:text-[1.4rem] text-lg py-3 lg:w-[40%] w-[60%] rounded bg-theme-footer-bg text-white"
                  onClick={
                    handleOtpSend
                  }
                >
                  Send OTP
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div
            className={`w-full bg-white p-5 shadow-sm border flex ${
              tabs === 1 ? "hidden" : "block"
            }`}
          >
            <h6
              className="headtext font-extrabold lg:text-[1.5rem] text-xl text-text-secondary cursor-pointer "
              onClick={() => settabs(1)}
            >
              Shipping Details
            </h6>
            <button
              className="ml-auto underline context  text-text-secondary  font-[400] lg:text-lg text-sm"
              onClick={() => settabs(1)}
            >
              Edit
            </button>
          </div>
          <div
            className={` bg-white p-4 shadow-sm ${
              tabs === 1 ? "block" : "hidden"
            }`}
          >
            <div className=" flex flex-col lg:flex-row ">
              <h6 className=" headtext text-text-secondary font-[700] lg:text-[1rem] text-sm">
                Access your Account or Where do we send your items ?
              </h6>
              <div className=" flex items-center ms-auto text-sm lg:text-[1rem]">
                <div className="w-[25px]">
                  <div className=" relative">
                    <input
                      type="checkbox"
                      id="svedaccount"
                      className=" !top-[-8px] !w-[18px] "
                      value={isAccountCreated}
                      onChange={() => setIsAccountCreated(!isAccountCreated)}
                    />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="svedaccount"
                    className=" font-[400] lg:text-[1rem] text-sm cursor-pointer text-text-secondary context"
                  >
                    Use Saved Address
                  </label>
                </div>
              </div>
            </div>

            <form>
              <div className=" lg:mt-5 mt-2 grid grid-cols-1 gap-y-2 lg:text-[1rem] text-sm">
                <div className=" w-full context">
                  <label htmlFor="add1" className="mb-2">
                    Address Line 1{" "}
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>{" "}
                  </label>

                  <input
                    type="text"
                    id="add1"
                    className="w-full border border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]"
                    placeholder="Flat, House, Building and other details"
                    value={address_line1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                  />
                </div>
                <div className=" w-full context">
                  <label htmlFor="add2" className="mb-2">
                    Address Line 2{" "}
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                      *
                    </sup>{" "}
                  </label>

                  <input
                    type="text"
                    id="add2"
                    className="w-full border border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]"
                    placeholder="Lane, Street & Landmark"
                    value={address_line2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                  />
                </div>

                <div className=" w-full grid lg:grid-cols-3 grid-cols-2 gap-y-2 lg:gap-y-0 gap-x-3">
                  <div className=" w-full context">
                    <label htmlFor="City" className="mb-2">
                      City{" "}
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                        *
                      </sup>{" "}
                    </label>

                    <input
                      type="text"
                      id="City"
                      className="w-full border border-text-secondary shadow-sm px-4 h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className=" w-full context">
                    <label htmlFor="State" className="mb-2">
                      State{" "}
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px] ">
                        *
                      </sup>{" "}
                    </label>

                    <input
                      type="text"
                      id="State"
                      className="w-full border border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>

                  <div className=" w-full context">
                    <label htmlFor="Pincode" className="mb-2">
                      Pincode{" "}
                      <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                        *
                      </sup>{" "}
                    </label>

                    <input
                      type="text"
                      id="Pincode"
                      className="w-full border border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className=" flex gap-2 lg:gap-0 items-center">
                  <div className="w-[5%]">
                    <div className=" relative">
                      <input
                        type="checkbox"
                        id="billing"
                        className=" !top-[-8px] "
                        value={isBillingSame}
                        onChange={() => setIsBillingSame(!isBillingSame)}
                      />
                    </div>
                  </div>

                  <div className="w-[95%]">
                    <label
                      htmlFor="billing"
                      className=" font-[400] lg:text-[1rem] text-sm cursor-pointer"
                    >
                      My Billing Address is same as my shipping address
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center mt-6">
                <button className="headtext font-[800]  lg:text-[1.4rem] text-xl py-3 lg:w-[50%] w-[85%] rounded bg-theme-footer-bg text-white">
                  Continue to Shipping
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full">
          <div
            className={`w-full bg-white p-5 shadow-sm border flex ${
              tabs === 2 ? "hidden" : "block"
            }`}
          >
            <h6
              className="headtext font-extrabold lg:text-[1.5rem] text-xl text-text-secondary cursor-pointer "
              onClick={() => settabs(2)}
            >
              Shipping Fees
            </h6>
            <button
              className="ml-auto underline context  text-text-secondary  font-[400] lg:text-lg text-sm"
              onClick={() => settabs(2)}
            >
              Edit
            </button>
          </div>
          <div
            className={` bg-white p-4 shadow-sm ${
              tabs === 2 ? "block" : "hidden"
            }`}
          >
            <div>
              <h6 className=" headtext text-text-secondary font-[700] lg:text-[1rem] text-sm">
                Calculated Shipping Fees
              </h6>
            </div>

            <div className="mt-4 context ">
              <div className="p-4  border  rounded-lg">
                <div className="w-full flex">
                  <span className="font-[400] lg:text-xl text-[1rem]">
                    Shipping Fees
                  </span>
                  <span className="ml-auto lg:text-lg text-sm text-[#039C2E] font-[500]">
                    Free
                  </span>
                </div>

                <div className="w-full flex mt-2">
                  <span className="font-[400] lg:text-xl text-[1rem]">
                    Estimated Delivery Date
                  </span>
                  <span className="ml-auto lg:text-lg text-sm text-right lg:text-left font-[500]">
                    10th August, Wednesday
                  </span>
                </div>
              </div>

              <p className="mt-8 text-center lg:text-lg text-[1rem] font-[400] leading-normal">
                Congrats, You’re all set.<br></br> You can continue to payment
                now
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal visible={ismodalopen} effect="fadeInDown" onClickAway={closeModal}>
        <div className="lg:w-[700px] md:w-[500px] w-[340px] px-5 pt-3 pb-5">
          <div className=" flex ">
            <button className="ml-auto" onClick={() => setismodalopen(false)}>
              <FaXmark size={40} />
            </button>
          </div>

          <div className="lg:my-4 md:my-2 my-1">
            <h6 className="context font-[900] lg:text-[2.5rem] md:text-[2rem] text-2xl text-center lg:mb-10 md:mb-7 mb-4">
              Enter OTP
            </h6>

            <div className="w-full flex justify-center lg:mt-7 md:mt-4 mt-3">
              <Otpinput onOtpInput={handleOtpChange} />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-x-4 headtext py-2 mt-6">
            <button className=" w-full  text-[#474747] font-[300]lg:text-xl md:text-lg text-[1rem] py-2 rounded border-[0.3px] border-[#000000] ">
              Change Number
            </button>
            <button 
            onClick={handleOrderPlace}  
            className=" w-full bg-theme-footer-bg text-white font-[700] py-2 rounded lg:text-xl md:text-lg text-[1rem] ">
              Confirm OTP
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
// Path: src/components/checkout/Productshow.jsx
