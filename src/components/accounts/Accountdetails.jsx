"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Countryinput from "../countryinput/Countryinput";
import { FaXmark } from "react-icons/fa6";
import Modal from "react-awesome-modal";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userData.slice";

export default function Accountdetails({ data }) {
  const [initalData, setInitalData] = useState(data);
  useEffect(() => {
    setInitalData(data);
  }, [data]);
  console.log(initalData);
  const [ismodalopen, setismodalopen] = useState(false);
  const [newFirstName, setNewFirstName] = useState(initalData?.first_name);
  const [newLastName, setNewLastName] = useState(initalData?.last_name);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState(initalData?.phone_number);
  useEffect(() => {
    setNewFirstName(initalData?.first_name);
    setNewLastName(initalData?.last_name);
    setCountryCode("+91");
    setPhoneNumber(initalData?.phone_number);
  }, [initalData]);
  const [otp, setOtp] = useState("");
  const [isEditabel, setIsEditabel] = useState(false);
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const dispatch = useDispatch();
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`;
  const [token, setToken] = useState("");
  const closeModal = () => {
    setismodalopen(false);
    setError("");
    setIsOtpSent(false);
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [typeof window !== "undefined" && localStorage.getItem("token")]);
  const handleUpdateWithoutOtp = async () => {
    setismodalopen(true);
    console.log("Updating user details without OTP");
    try {
      await axios.put(
        url,
        {
          first_name: newFirstName,
          last_name: newLastName,
          // country_code: countryCode,
          phone_number: `+91${phoneNumber}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsOtpSent(true);
      // console.log("Updated user:", updatedUser);
      setError("");
    } catch (error) {
      console.error("Error updating account details:", error);
      setError("Failed to update account details. Please try again.");
    }
  };
  console.log(phoneNumber);
  const handleUpdateWithOtp = async () => {
    try {
      const response = await axios.put(
        url,
        {
          first_name: newFirstName,
          last_name: newLastName,
          // country_code: countryCode,
          phone_number: `+91${phoneNumber}`,
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data.user;
      console.log("Updated user:", updatedUser);
        dispatch(setUser(updatedUser));
      setismodalopen(false);
      setError("");
    } catch (error) {
      console.error("Error updating account details with OTP:", error);
      setError("Failed to update account details with OTP. Please try again.");
    }
  };

  const handleCountryChange = (code) => {
    setCountryCode(code);
  };

  const handlePhoneChange = (number) => {
    setPhoneNumber(number);
  };
  const editDetails = () => {
    setIsEditabel(true);
    // setismodalopen(true);
  };
  const candleBtn = () => {
    setIsEditabel(false);
  };
  return (
    <div className="w-full bg-white rounded-[13px] px-10 py-8 shadow">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-y-4 text-lg font-[500]">
          <div className="w-full context">
            <label htmlFor="fnamesignup" className="mb-2">
              Your First Name
            </label>
            <div className="w-full flex border border-text-secondary shadow-input pl-2 pr-3 rounded-lg">
              <div className="w-[100%] ">
                <input
                  type="text"
                  id="fnamesignup"
                  className="w-full border-none focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  disabled={!isEditabel}
                />
              </div>
            </div>
          </div>
          <div className="w-full context">
            <label htmlFor="lastnamesingup" className="mb-2">
              Your Last Name
            </label>
            <div className="w-full flex border border-text-secondary shadow-input pl-2 pr-3 rounded-lg">
              <div className="w-[100%] ">
                <input
                  type="text"
                  id="lastname"
                  className="w-full border-none focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  disabled={!isEditabel}
                />
              </div>
            </div>
          </div>
          <Countryinput
            userdata={data}
            editable={isEditabel}
            onCountryChange={handleCountryChange}
            onPhoneChange={handlePhoneChange}
          />
        </div>
        <div className="mt-14">
          {!isEditabel ? (
            <>
              <button
                className="w-[50%] headtext py-1 bg-[#F8B43A] font-[400] text-theme-footer-bg text-[1.4rem] rounded-[21.5px]"
                onClick={editDetails}
              >
                Edit Details
              </button>
            </>
          ) : (
            <>
              <button
                className="w-[50%] headtext py-1 bg-[#F8B43A] font-[400] text-theme-footer-bg text-[1.4rem] rounded-[21.5px]"
                onClick={candleBtn}
              >
                Cancel
              </button>
            </>
          )}
        </div>
        <div>
          <button
            onClick={handleUpdateWithoutOtp}
            className="w-[50%] headtext py-1 bg-[#F8B43A] font-[400] text-theme-footer-bg text-[1.4rem] rounded-[21.5px]"
          >
            Save
          </button>
        </div>
      </div>
      <Modal visible={ismodalopen} effect="fadeInDown" onClickAway={closeModal}>
        <div className="w-[700px] px-5 pt-3 pb-5">
          <div className="flex ">
            <button className="ml-auto" onClick={closeModal}>
              <FaXmark size={40} />
            </button>
          </div>
          <div className="my-4">
            <h6 className="context font-[900] text-[2.5rem] text-center">
              Enter OTP
            </h6>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border-none focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="grid grid-cols-2 gap-x-4 headtext py-2 mt-6">
            {!isOtpSent ? (
              <button
                className="w-full text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] "
                onClick={handleUpdateWithOtp}
              >
                Update Details
              </button>
            ) : (
              <>
                <button
                  className="w-full text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] "
                  onClick={closeModal}
                >
                  Change Number
                </button>
                <button
                  className="w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded "
                  onClick={handleUpdateWithOtp}
                >
                  Confirm OTP
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
