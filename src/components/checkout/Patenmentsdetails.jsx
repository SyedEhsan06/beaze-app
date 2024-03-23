"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Bars } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa";
import Countryinput from "../countryinput/Countryinput";
import Modal from "react-awesome-modal";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import Otpinput from "../otp/Otpinput";
import { selectCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import cookieCutter from "cookie-cutter";
import Productshow from "./Productshow";
import { fetchData } from "@/utils/apicall";
import { useRouter } from "next/navigation";
import { selectUser, setUser } from "@/redux/slices/userData.slice";
import Loaderfixed from "../loader/Loaderfixed";
export default function Patenmentsdetails() {
  const [selectedCountry, setSelectedCountry] = useState();
  const [tabs, settabs] = useState(0);
  const [ismodalopen, setismodalopen] = useState(false);
const dispatch = useDispatch();
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
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isAccountCreatedbilling, setIsAccountCreatedbilling] = useState(false);
  const [isNewsLetter, setIsNewsLetter] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState({});
  const[loaderotpnew,setloaderotpnew] = useState(false)
  const[checknum,setchecknum] = useState(false)
  // billing address
  const [address_line1_billing, setAddressLine1Billing] = useState("");
  const [address_line2_billing, setAddressLine2Billing] = useState("");
  const [city_billing, setCityBilling] = useState("");
  const [state_billing, setStateBilling] = useState("");
  const [pincode_billing, setPincodeBilling] = useState("");
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [token, setToken] = useState("");
  const [savedaddress, setsavedaddress] = useState([]);
  const [checkoutgreen, setcheckoutgreen] = useState(false);
  const [showicon, setshowicon] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});
  const [loaderforPayment, setLoaderforPayment] = useState(false);
  const [otpTime, setOtpTime] = useState(45);
  const[matchotp,setmatchotp] = useState(false);
  const[usedsavedaddress,setusedsavedaddress] = useState(false);
  const[usedsavedaddressbilling,setusedsavedaddressbilling] = useState(false);
  const profilelogindata = useSelector(selectUser);
  useEffect(() => {
    let cookieToken = cookieCutter.get("token");
    if (cookieToken) {
      setToken(cookieToken);
    }
  }, []);
  // console.log(orderData)
  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setUserProfileData(response.data.user);
          setFirstName(response.data.user.first_name);
          setLastName(response.data.user.last_name);
          setPhone(response.data.user.phone_number);
          dispatch(setUser(response.data.user));
          settabs(1);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [token]);


 
  //api1
  const dataFromStore = useSelector(selectCart);
  useEffect(() => {
    setCartData(dataFromStore);
    setTotalPrice(
      dataFromStore.reduce((a, b) => a + b.price * b.selectedQty, 0)
    );
  }, []);
  const handleOtpSend = async () => {
   if(phone.length === 10){
    setchecknum(false)
    setloaderotpnew(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          phone: `+91${phone}`,
          firstName: first_name,
          lastName: last_name,
        }
      );
      setOtpTime(45)
      setloaderotpnew(false)
      setismodalopen(true);
      console.log(response.data);
      setIsOtpSent(true);

      // Handle response data as needed
    } catch (error) {
      setloaderotpnew(false)
      console.error("Error sending OTP request:", error);
      // Handle error
    }
   }else{
    
    setchecknum(true)
  }
}
  const handleOtpSendWithOtp = async () => {
  setloaderotpnew(true)
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyotp`,
        {
          phone: `+91${phone}`,
          otp: otp,
        }
      );
      if(response.data.error === "Invalid OTP"){
        setmatchotp(true)
        setloaderotpnew(false)
      }else{
        setIsOtpSent(true);
        setloaderotpnew(false);
        setmatchotp(false);
        
        setismodalopen(false);
      setToken(response.data.token);
      cookieCutter.set("token", response.data.token);
      
      }
     
      // Handle response data as needed
    } catch (error) {
      setloaderotpnew(false)
      console.error("Error sending OTP request:", error);
      // Handle error
    }
  };
  const [loader, setLoader] = useState(false);
  const handleOrderPlace = async (e) => {
    e.preventDefault();
    setLoaderforPayment(true);
    setLoader(true);
    setTotalPrice(cartData.reduce((a, b) => a + b.price * b.selectedQty, 0));
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          first_name: first_name,
          last_name: last_name,
          shipping_address: {
            address_line1: address_line1,
            address_line2: address_line2,
            city: city,
            state: state,
            pincode: pincode,
          },
          billing_address: {
            address_line1: address_line1_billing,
            address_line2: address_line2_billing,
            city: city_billing,
            state: state_billing,
            pincode: pincode_billing,
          },

          cart: cartData,
          total: totalPrice,
          payment: "razorpay",
          paymentStatus: "pending",
          status: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsOrderPlaced(true);
      setLoader(false);

      setLoaderforPayment(false);
      setOrderData(response.data);
      settabs(2);
      setcheckoutgreen(true);
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
    if (phone.length) {
      setshowicon(true);
    } else {
      setshowicon(false);
    }
    setPhone(phone);
  };

  const closeModal = () => {
    setismodalopen(false);
    setIsAccountCreated(false);
    setIsAccountCreatedbilling(false);

  };

  useEffect(() => {
    if (tabs === 2 && !isBillingSame) {
      window.scrollTo({
        top: 200,
        behavior: "smooth",
      });
    }
  }, [tabs]);

  useEffect(() => {
    if (isAccountCreated) {
      setismodalopen(true);
      handelgetsavedaddress();
    }
  }, [isAccountCreated]);

  useEffect(() => {
    if (isAccountCreatedbilling) {
      setismodalopen(true);
      handelgetsavedaddress();
    }
  }, [isAccountCreatedbilling]);

  const handelgetsavedaddress = async () => {
    try {
      const resposne = await fetchData("auth/profile");
      setsavedaddress(resposne.user.address);
    } catch (err) {
      console.log(err);
    }
  };
  const router= useRouter();
  // const [paymentStatusCookie, setPaymentStatusCookie] = useState("");
  // useEffect(() => {
  //   setPaymentStatusCookie(cookieCutter.get("paymentStatus"));
  // }, [
  //   paymentStatusCookie,
  //   cookieCutter?.get("paymentStatus"),
  //   orderData?.order?._id,
  // ]);
  // // const paymentStatuss = cookieCutter.get("paymentStatus");
  // console.log(paymentStatusCookie);
  // console.log(orderData?.order?._id);
  
  // useEffect(() => {
  //   let orderToRoute = paymentStatusCookie
  //     ? paymentStatusCookie.split(" ")[0] === "success"
  //       ? paymentStatusCookie.split(" ")[1]
  //       : null
  //     : null;
  //   console.log(orderToRoute);

  //   if (orderToRoute === orderData?.order?._id) {
  //     router.push(`/invoice/orderId=${orderToRoute}`);
  //   }
  // }, [orderData, paymentStatusCookie]);

  const handelsetvalues = (items) => {
    setAddressLine1(items.address_line1);
    setAddressLine2(items.address_line2);
    setCity(items.city);
    setState(items.state);
    setPincode(items.pincode);
    setusedsavedaddress(true)
    closeModal();
  };

  const handelsetvaluesbilling = (items) => {
    setAddressLine1Billing(items.address_line1);
    setAddressLine2Billing(items.address_line2);
    setCityBilling(items.city);
    setStateBilling(items.state);
    setPincodeBilling(items.pincode);
    setusedsavedaddressbilling(true)
    closeModal();
  };
 const handelsetuseaddress = () => {
 if(usedsavedaddress){
  setAddressLine1("");
  setAddressLine2("");
  setCity("");
  setState("");
  setPincode("");
  setusedsavedaddress(false)
 }else{
  setIsAccountCreated(!isAccountCreated)
 }
 }

 const handelsetuseaddressbilling = () => {
  if(usedsavedaddressbilling){
   setAddressLine1Billing("");
   setAddressLine2Billing("");
   setCityBilling("");
   setStateBilling("");
   setPincodeBilling("");
   setusedsavedaddressbilling(false)
  }else{
   setIsAccountCreatedbilling(!isAccountCreatedbilling)
  }
  }

 
  return (
    <>
 {(loaderotpnew || loaderforPayment) && <Loaderfixed/>}

      <div className=" w-full lg:flex gap-x-5">
      <div className="lg:w-[60%] w-[100%]">
        <div className=" w-full">
          <div className=" flex lg:gap-x-10 gap-x-3  headtext font-[600]  items-center md:px-4 mt-4 ">
            <div>
              <button className=" font-[800] lg:text-3xl text-lg text-[#039C2EB0] text-opacity-[69%] flex items-center">
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
              <button
                className={`lg:text-2xl flex items-center ${
                  checkoutgreen  ? " text-[#039C2EB0] font-[800] lg:text-3xl text-lg" : "text-black"
                }`}
              >
                {checkoutgreen && <IoIosCheckmarkCircle size={20} />}
                Checkout
              </button>
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
              <button className={` lg:text-2xl text-[1rem] ${checkoutgreen ? ' text-black' : ' text-[#998F8F]'}`}>
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
                  Welcome {first_name}
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
                      <div className="w-full flex border border-text-secondary shadow-lg relative overflow-hidden   rounded-lg">
                        <div className="w-[100%] ">
                          <input
                            type="text"
                            id="firstname"
                            className="pl-2 w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal h-[52px] checkout-input"
                            placeholder="Your First name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        {first_name && (
                          <span className=" absolute right-[14px] top-[20px] text-[#039C2EB0]">
                            <FaCheck size={14} />
                          </span>
                        )}
                      </div>
                    </div>
                    <div className=" w-full context">
                      <label htmlFor="lastname" className="mb-2">
                        Your Last Name{" "}
                        <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">
                          *
                        </sup>{" "}
                      </label>
                      <div className="w-full flex border border-text-secondary shadow-lg   relative overflow-hidden rounded-lg">
                        <div className="w-[100%] ">
                          <input
                            type="text"
                            id="lastname"
                            className="pl-2 w-full border-none  focus:outline-none transition-all duration-100   relative leading-normal checkout-input h-[52px]"
                            placeholder="Your Last name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                        {last_name && (
                          <span className="absolute right-[14px] top-[20px] text-[#039C2EB0]">
                            <FaCheck size={14} />
                          </span>
                        )}
                      </div>
                    </div>
                    <Countryinput
                      editable={true}
                      onCountryChange={handleCountryChange}
                      onPhoneChange={handlePhoneChange}
                      defaultValue={phone}
                      userdata={userProfileData}
                      iconshow={showicon}
                      checknumtendigit={checknum}
                      alreadyresgiter={checknum}
                    />
                  </div>
                  {/* <div className=" w-full my-6 context">
                    <div className=" flex gap-2 lg:gap-0 items-center">
                      <div className="w-[5%]">
                        <div className=" relative">
                          <input
                            type="checkbox"
                            id="accout"
                            className=" !top-[-9px] "
                            value={isAccountCreated}
                            onChange={() =>
                              setIsAccountCreated(!isAccountCreated)
                            }
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
                  </div> */}

                  <div className="w-full flex justify-center my-6">
                    <button
                      disabled={!phone || !first_name || !last_name}
                      className="headtext font-[800]  lg:text-[1.4rem] text-lg py-3 lg:w-[40%] w-[60%] rounded bg-theme-footer-bg text-white"
                      onClick={handleOtpSend}
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
                    Where do we send your items ?
                  </h6>
                  <div className={`items-center ms-auto text-sm lg:text-[1rem] ${profilelogindata.first_name ? 'flex' : 'hidden'}`}>
                    <div className="w-[25px]">
                      <div className=" relative">
                        <input
                          type="checkbox"
                          id="svedaccount"
                          className=" !top-[-8px] !w-[18px] "
                          value={isAccountCreated}
                          checked={isAccountCreated || usedsavedaddress}
                          onChange={() =>
                           handelsetuseaddress()
                          }
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

                <form onSubmit={handleOrderPlace}>
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
                        className="w-full border outline-none border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]" required
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
                        className="w-full border  outline-none border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]" required
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
                          className="w-full border  outline-none border-text-secondary shadow-sm px-4 h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]" required
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
                          className="w-full border  outline-none border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]" required
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
                          className="w-full border  outline-none border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]" required
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
                            checked={isBillingSame}
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

                  {!isBillingSame && (
                    <div className="mb-2 mt-4">
                      <div>
                      <div className=" flex flex-col lg:flex-row ">
                  <h6 className=" headtext text-text-secondary font-[700] lg:text-[1rem] text-sm">
                  Your billing address
                  </h6>
                  <div className={`items-center ms-auto text-sm lg:text-[1rem] ${profilelogindata.first_name ? 'flex' : 'hidden'}`}>
                    <div className="w-[25px]">
                      <div className=" relative">
                        <input
                          type="checkbox"
                          id="svedaccountbilling"
                          className=" !top-[-8px] !w-[18px] "
                          value={isAccountCreatedbilling}
                          checked={isAccountCreatedbilling || usedsavedaddressbilling}
                          onChange={() =>
                           handelsetuseaddressbilling()
                          }
                        />
                      </div>
                    </div>

                    <div className="">
                      <label
                        htmlFor="svedaccountbilling"
                        className=" font-[400] lg:text-[1rem] text-sm cursor-pointer text-text-secondary context"
                      >
                        Use Saved Address
                      </label>
                    </div>
                  </div>
                </div>
                        <div className="w-full">
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
                                className="w-full outline-none border border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]"
                                placeholder="Flat, House, Building and other details"
                                value={address_line1_billing} required
                                onChange={(e) =>
                                  setAddressLine1Billing(e.target.value)
                                }
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
                                className="w-full border outline-none border-text-secondary shadow-sm px-4  rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]"
                                placeholder="Lane, Street & Landmark" required
                                value={address_line2_billing}
                                onChange={(e) =>
                                  setAddressLine2Billing(e.target.value)
                                }
                                
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
                                  className="w-full outline-none border border-text-secondary shadow-sm px-4 h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                                  value={city_billing} required
                                  onChange={(e) =>
                                    setCityBilling(e.target.value)
                                  }
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
                                  className="w-full outline-none border border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                                  value={state_billing} required
                                  onChange={(e) =>
                                    setStateBilling(e.target.value)
                                  }
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
                                  className="w-full outline-none border border-text-secondary shadow-sm px-4  h-[52px] rounded-lg   focus:outline-none transition-all duration-100   relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400]"
                                  value={pincode_billing} required
                                  onChange={(e) =>
                                    setPincodeBilling(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-full flex justify-center mt-6">
                    <button
                      
                    
                      className="headtext font-[800]  lg:text-[1.4rem] text-xl py-3 lg:w-[50%] w-[85%] rounded bg-theme-footer-bg text-white"
                    >
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
                    Congrats, You’re all set.<br></br> You can continue to
                    payment now
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Modal
            visible={ismodalopen}
            effect="fadeInDown"
            onClickAway={closeModal}
          >
            <div className="lg:w-[700px] md:w-[500px] w-[340px] px-5 pt-3 pb-5">
              <div className=" flex ">
                <button className="ml-auto" onClick={() => closeModal()}>
                  <img
                    src="/images/web/xmark.png"
                    className="w-[20px]"
                    alt=""
                  />
                </button>
              </div>
              {isAccountCreated || isAccountCreatedbilling ? (
                <div className="my-2">
                  <div className="lg:my-4 md:my-2 my-1">
                    <h6 className="context font-[900] lg:text-[2.5rem] md:text-[2rem] text-2xl text-center lg:mb-10 md:mb-7 mb-4">
                      Your Saved Address
                    </h6>

                    
                    <div className="w-full">
                     {
                      savedaddress.length >= 1 ?  <div className="w-full grid lg:grid-cols-4 md:grid-cols-3  grid-cols-2 gap-3">
                        {savedaddress.map((items, index) => (
                          <div
                            key={index}
                            className="w-full h-[50px] px-2 rounded flex justify-center items-center cursor-pointer border border-theme-footer-bg"
                            onClick={usedsavedaddressbilling ? () => handelsetvalues(items) : () => handelsetvaluesbilling(items)}
                          >
                            <span className="text-lg headtext font-[700] text-theme-footer-bg">
                              {items.address_type}
                            </span>
                          
                          </div>
                        ))}
                      </div> : <div className="w-full">
                        <h4 className=" font-semibold text-center text-lg ">Oops Looks like there is not any saved addrerss available </h4>
                      </div>
                     }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="optsection">
                  <div className="lg:my-4 md:my-2 my-1">
                    <h6 className="context font-[900] lg:text-[2.5rem] md:text-[2rem] text-2xl text-center lg:mb-10 md:mb-7 mb-4">
                      Enter OTP
                    </h6>

                    <div className="w-full flex justify-center lg:mt-7 md:mt-4 mt-3">
                      <Otpinput onOtpInput={handleOtpChange} otpTime={otpTime} setOtpTime={setOtpTime} matchotp={matchotp} />
                    </div>

                    <div className={`context w-full leading-3 mt-5 ${matchotp ? 'block' : ' hidden'}`}>
                  <p className=' text-center lg:text-[1rem] text-xs text-[#760000] font-[500]'>🤔 Uh Oh, That code does not seem right.</p>
                  <p className=' text-center lg:text-[1rem] text-xs underline font-[700]'>We’d love for you to check it again</p>
                 </div>
                  </div>

                  <div className=" grid grid-cols-2 gap-x-4 headtext py-2 mt-6">
                    <button className=" w-full  text-[#474747] font-[300]lg:text-xl md:text-lg text-[1rem] py-2 rounded border-[0.3px] border-[#000000] " onClick={() => setismodalopen(false)}>
                      Change Number
                    </button>
                    <button
                      onClick={handleOtpSendWithOtp}
                      className=" w-full bg-theme-footer-bg text-white font-[700] py-2 rounded lg:text-xl md:text-lg text-[1rem] "
                    >
                      Confirm OTP
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
      <div className="lg:w-[40%] lg:mt-0 mt-6">
        <Productshow
          cartdata={cartData}
          orderId={orderData?.order?._id}
          ischeckoutset={checkoutgreen}
        />
      </div>

      {/* {loaderforPayment ? (
        <div
          className="loader
      w-full h-screen fixed top-0 left-0 bg-white bg-opacity-60 z-50 flex justify-center items-center
      "
        >
          <Bars color="#039C2EB0" height={100} width={100} />
        </div>
      ) : null} */}
    </div>
    </>
  );
}
// Path: src/components/checkout/Productshow.jsx
