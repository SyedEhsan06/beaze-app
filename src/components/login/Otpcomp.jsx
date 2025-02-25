"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import cookieCutter from "cookie-cutter";
import Countryinput from "../countryinput/Countryinput";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Otpcomp() {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = Array.from({ length: 6 }, () => useRef());
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [otpTime, setOtpTime] = useState(45);
  const [resend, setResend] = useState(false);
  const router = useRouter();
  const[wrongotp,setwrongotp] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setOtpTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (otpTime === 0) {
      setResend(true);
    }
  }, [otpTime]);

  const handleInputChange = (index, event) => {
    const value = event.target.value;

    if (isNaN(value) || value === "") {
      return;
    }

    const newOTP = otp.map((digit, i) => (i === index ? value : digit));

    if (index < 5 && value !== "") {
      inputRefs[index + 1].current.focus();
    }

    setOTP(newOTP);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs[index - 1].current.focus();

      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
    } else if (event.key === "Backspace" && index >= 0) {
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);

      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    let phone = localStorage.getItem("phone");
    phone = `+91${phone}`;

    const otpValue = otp.join("");
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyotp`, {
        otp: otpValue,
        phone: phone,
      })
      .then((res) => {
      
        if (res.data.error) {
          setError(res.data.error);
          setwrongotp(true)

        }
        // setwrongotp(true)
        localStorage.setItem("token", res.data.token);
        cookieCutter.set("token", res.data.token, {
          expires: 1,
        });
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      toast.success("OTP Verified Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
    if (error) {
      toast.error("Invalid OTP", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setTimeout(() => {
      //   setOTP(["", "", "", "", "", ""]);
      // }, 1000);
    }
  }, [token, error]);

  const handleResendOTP = () => {
    setResend(false);
    setOtpTime(45); // Reset the timer
    // Add logic to resend OTP
    let phone = localStorage.getItem("phone");
    phone = `+91${phone}`;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sendotp`;
    const sendOtp = async () => {
      await axios
        .post(url, { phone: phone })
        .then((res) => {

        })
        .catch((err) => {
          console.log(err);
        });
    };
    sendOtp();
  };

  return (
    <div className="h-[100vh] w-[100%] pb-4 pt-8 lg:px-10 px-2 relative flex items-center lg:block mianconlogins ">
      <div className="absolute lg:top-[4%] top-[6%] lg:left-[1%] left-1/2 transform -translate-x-1/2 z-10 lg:transform-none lg:-translate-x-0">
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            fill
            alt="=logo"
            className="!static lg:!w-[80%] !w-[100px]"
          />
        </Link>
      </div>
      <div className="lg:max-w-full max-w-[500px] mx-auto lg:mx-0 flex mt-4 lg:mt-0 ">
        <div className="w-[60%] h-[90vh] relative optbackground lg:flex items-center hidden"></div>
        <div className="lg:w-[40%] w-[100%] flex items-center lg:p-14 p-8">
          <div className="w-full">
            <div>
              <h4 className="text-center context font-[900] lg:text-[2.5rem] text-[1.7rem]">
                Enter OTP
              </h4>
              <p className="text-center context font-[300] lg:text-lg text-sm lg:mt-2 mt-1 lg:leading-[1rem]">
                Your code is on its way! Give it a moment, and it'll find its
                path to you.
              </p>
            </div>

            <div className="mt-12">
              <form onSubmit={handleOtpVerify} className="w-full">
                <div className="w-full">
                  <label
                    htmlFor="fnamesignup"
                    className="mb-2 font-[500] context"
                  >
                    Your OTP
                    <sup className="text-[#FF2A2A] !top-[5px] text-[24px]">*</sup>
                  </label>

                  <div className="grid grid-cols-6 gap-x-3 z-[100]">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(event) => handleInputChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        maxLength={1}
                        ref={inputRefs[index]}
                        className={`border lg:h-[60px] md:h-[50px] h-[40px] transition-all duration-150 text-center rounded-[9px] shadow-input context font-[500] text-xl leading-normal focus:outline-none ${
                          digit && !wrongotp  ? " border-[#039C2E]" : wrongotp ? 'border-[#D00000]' :  "border-theme-footer-bg " 
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3 items-center">
                    <div>
                      <p className="font-[500] lg:text-lg text-sm context">
                        Haven’t received it yet ?
                      </p>
                    </div>
                    <div>
                      {resend ? (
                        <button
                          onClick={handleResendOTP}
                          className="items-center flex gap-3 px-8 h-[30px] leading-normal bg-theme-footer-bg context rounded-[9px] lg:text-sm text-xs font-[500] text-[#F9DC5C] shadow-input "
                        >
                           Resend 
                        </button>
                      ) : (
                        <button
                          disabled
                          className="items-center flex gap-3 px-5 h-[30px] leading-normal bg-[#DED5D5] context rounded-[9px] lg:text-sm text-xs font-[500] text-[#717070] shadow-input "
                        >
                          <FaRegClock /> <span className=" leading-none">{otpTime} Resend</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`context w-full leading-3 mt-5 ${wrongotp ? 'block' : ' hidden'}`}>
                  <p className=' text-center lg:text-[1rem] text-xs text-[#760000] font-[500]'>🤔 Uh Oh, That code does not seem right.</p>
                  <p className=' text-center lg:text-[1rem] text-xs underline font-[700]'>We’d love for you to check it again</p>
                 </div>

                <button className="w-[100%] mt-7 py-4 headtext font-[900] text-text-secondary bg-[#FFD012] lg:text-3xl text-xl rounded-lg button-shadow">
                  Submit
                </button>
              </form>
            </div>

            <div className="mt-12">
              <p className="text-center context font-[200] lg:text-lg text-sm mt-2 leading-[1rem]">
                Want to use a different number ?<br />
                <span className="font-[700] underline cursor-pointer">
                  <Link href={"/signup"}> Change it here</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
