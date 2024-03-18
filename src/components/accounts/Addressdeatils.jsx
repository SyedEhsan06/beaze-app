"use client";
import { setUser, updateUser } from "@/redux/slices/userData.slice";
import { Addressdetails } from "@/utils/dummydata";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-awesome-modal";
import { 
  FaDeleteLeft
 } from "react-icons/fa6";
import { useDispatch } from "react-redux";


export default function Addressdeatils({ data }) {
  const [bars, setbars] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const[userAddress,setUserAddress]=useState([]);
  useEffect(() => {
    setUserAddress(data?.address);
  }, [data]);
  const [AddressLine1, setAddressLine1] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Pincode, setPincode] = useState("");
  const [phone, setphone] = useState("");
  const [ismodalopen, setismodalopen] = useState(false);
  const [addressType, setAddressType] = useState("");
  console.log(data);
  useEffect(() => {
    if (data) {
      setAddressLine1(data?.address?.address_line1);
      setAddressLine2(data?.address?.address_line2);
      setCity(data?.address?.city);
      setState(data?.address?.state);
      setPincode(data?.address?.pincode);
      setAddressType(data?.address?.address_type);
      // setphone(data?.phone_number);
    }
  }, [data]);
  const handelopenadddeatis = (id) => {
    bars === id ? setbars(0) : setbars(id);
  };
  console.log(data);
  // console.log(data);
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`;
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSubmit = async() => {
    console.log("submit");
    
    const address = {
      address_line1: AddressLine1,
      address_line2: AddressLine2,
      city: City,
      state: State,
      pincode: Pincode,
      operation: "edit",
      addressId: (Date.now() * Math.random(1000, 9999) + Date.now()).toString().slice(0, 10),
      address_type: "other",
    };
    await axios.put(url, { address }, config).then((res) => {
      console.log(res);
    });
  };
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleAddAddress =  async() => {
    console.log("add");
    setismodalopen(false);
    setLoader(true);
    // console.log(AddressLine1, AddressLine2, City, State, Pincode);
    await axios.put(
        url,
        {
  
            address_line1: AddressLine1,
            address_line2: AddressLine2,
            city: City,
            state: State,
            pincode: Pincode,
            operation: "add",
            addressId: (Date.now() * Math.random(1000, 9999) + Date.now()).toString().slice(0, 10),
            address_type: addressType,
          
        },
        config
      )
      .then((res) => {
        dispatch(updateUser(res.data));
        console.log(res);
        setLoader(false);
        setAddressLine1("");
        setAddressLine2("");
        setCity("");
        setState("");
        setPincode("");
        setUserAddress(res.data.address);
      });
  };
  const handleDeleteAddress = async(id) => {
    console.log("delete");
    await axios.put(
      url,
      {
        operation: "delete",
        addressId: id,
      },
      config
    ).then((res) => {
      console.log(res);
      dispatch(updateUser(res.data));
      setUserAddress(res.data.address);

    });
  };
    
  const closeModal = () => {
    setismodalopen(false);
   
  };
  // console.log(data)
  return (
    <>
      <div className="w-full">
      <div className=" grid grid-cols-1 gap-y-4 text-lg font-[500]">
        {userAddress?.map((items, index) => (
          <div
            className={`w-full relative bg-white cursor-pointer shadow-sm  lg:px-10 md:px-8 px-5 lg:py-5 md:py-4 py-3 rounded-[13px] transition-all duration-150 `}
            key={
              items?._id
            }
          >
            <div
              className="w-full flex items-center"
              onClick={() => handelopenadddeatis(items.addressId)}
            >
              <h5 className=" font-[600] md:text-xl text-lg headtext text-text-secondary ">
                {items.address_type}
              </h5>

              <div className="ml-auto">
                <img
                
                  src={
                    bars === items.addressId
                      ? "/images/web/subicon.png"
                      : "/images/web/addicon.png"
                  }
                  alt=""
                  className="w-[15px]"
                />
              </div>
            </div>

            <div className={`${items.addressId === bars ? "block" : "hidden"}`}>
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
                    value={
                      items?.address_line1
                    }
                    onChange={(e) => setAddressLine1(e.target.value)}
                    disabled={!isEdit}
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
                    value={
                      items?.address_line2
                    }
                    // onChange={(e) => setAddressLine2(e.target.value)}
                    disabled={!isEdit}
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
                      value={
                        items?.city
                      }
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!isEdit}
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
                      value={
                        items?.state
                      }
                      onChange={(e) => setState(e.target.value)}
                      disabled={!isEdit}
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
                      value={
                        items?.pincode
                      }
                      onChange={(e) => setPincode(e.target.value)}
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:mt-12 md:mt-10 mt-8 flex gap-x-10">
                <button
                  className=" border border-theme-footer-bg w-[50%]  font-[600] lg:text-xl md:text-lg text-[1rem] headtext rounded-[21.5px] text-theme-footer-bg py-2  text-center"
                  onClick={() => setbars(0)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className=" bg-[#F8B43A] w-[50%]  font-[600] lg:text-xl md:text-lg text-[1rem] headtext rounded-[21.5px] text-theme-footer-bg py-2  text-center border border-transparent"
                >
                  Save Details
                </button>
              </div>
            </div>
            <button className=" absolute right-1 top-[-8px] border text-sm p-1 bg-white shadow rounded-full" onClick={
                  () => handleDeleteAddress(items._id)
                }><FaDeleteLeft className="text-red-500" />
                </button>
          </div>
        ))}
      </div>

      <div className="lg:mt-10 md:mt-8 mt-6 ">
        <button
          // onClick={handleAddAddress}
          onClick={() => setismodalopen(true)}
          className=" bg-[#F8B43A] w-[40%]  font-[600] g:text-xl md:text-lg text-[1rem] headtext rounded-[21.5px] text-theme-footer-bg py-2  text-center"
        >
          {
          userAddress?.length > 0 ? "Add New Address" : "Add Address"
          }
        </button>
      </div>
    </div>

    <Modal visible={ismodalopen} effect="fadeInDown" onClickAway={closeModal}>
        <div className="lg:w-[800px] md:w-[600px] w-[340px] px-5 pt-3 pb-5">
          <div className="flex">
            <button className="ml-auto" onClick={closeModal}>
            <img src="/images/web/xmark.png" className="w-[20px]" alt="" />
            </button>
          </div>
          <h6 className="context font-[900] lg:text-[2.5rem] md:text-[2rem] text-2xl text-center mb-4">
              Edit Address
            </h6>

         <div className="w-full mt-3">
         <div className=" lg:mt-5 mt-2 grid grid-cols-1 gap-y-2 lg:text-[1rem] text-sm">
         <div className="w-full context">
          <label htmlFor="addressType" className="mb-2">
            Address Type{" "}
            <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">*</sup>{" "}
          </label>
          <input
            type="text"
            id="addressType"
            className="w-full border border-text-secondary shadow-sm px-4 rounded-lg focus:outline-none transition-all duration-100 relative leading-normal checkout-input placeholder:text-[#AAA5A5] placeholder:font-[400] h-[52px]"
            placeholder="Home Work Other"
            value={addressType}
            required
            onChange={(e) => setAddressType(e.target.value)}
          />
        </div>
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
                    value={AddressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    required
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
                    value={AddressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    required
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
                      value={City}
                      onChange={(e) => setCity(e.target.value)}
                      required
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
                      value={State}
                      onChange={(e) => setState(e.target.value)}
                      required
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
                      value={Pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
         </div>

         <div className=" grid grid-cols-2 gap-x-4 headtext py-2 mt-6">
            <button className=" w-full  text-[#474747] font-[300] md:text-lg text-[1rem] py-2 rounded border-[0.3px] border-[#000000] " onClick={closeModal}>
             cancel
            </button>
            <button
            onClick={handleAddAddress}
            className=" w-full bg-theme-footer-bg text-white font-[700] md:text-lg text-[1rem] py-2 rounded ">
             Save Details
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
