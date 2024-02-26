"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Countryinput from "../countryinput/Countryinput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();
  console.log(
    phone,
    country
  )
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage?.setItem('phone', phone);
    try {
      const response = await axios.post(url, {
        phone,
      });
      console.log(response);
      setResponse(response);
    } catch (error) {
      console.log(error);
      setError(error); 
    }
  };
  useEffect(() => {
    if(response?.data?.error === "Internal Server Error"){
      toast.error("Try agin later", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    if (response?.data?.message === "OTP sent for verification") {
      toast.success("OTP sent for verification", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
     setTimeout(() => {
      router.push("/otp");
     }, 1000);
    }
    if (response?.data?.message === "User not found") {
      toast.error("User not found. Please create an account.",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    if (error) {
      console.log(error);
    }
  }, [response, router]);
  const handlePhoneChange = (number) => {
    setPhone(number);
  }
  const handleCountryChange = (code) => {
    setCountry(code);
  }

  return (
    <div className="h-[100vh] w-[100%] pb-4 pt-8  lg:px-10 px-2 relative mianconlogins flex items-center lg:block">
      {/* <ToastContainer /> */}
      <div className='absolute lg:top-[4%] top-[10%] lg:left-[1%]  left-1/2 transform -translate-x-1/2 z-10 lg:transform-none lg:-translate-x-0">'>
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            fill
            alt="=logo"
            className="!static lg:!w-[80%] !w-[100px]"
          />
        </Link>
      </div>
      <div className="lg:max-w-full max-w-[500px] mx-auto lg:mx-0  lg:flex  lg:mt-0">
        <div className="w-[60%]  h-[90vh] relative loginbackground lg:flex hidden items-center">
          <div className=" relative pl-10 z-20">
            <Image
              src="/images/web/login/Rectangle1.png"
              fill
              alt="=logo"
              className="!static "
            />
          </div>
          <div className="absolute top-[5%]  right-[32%] z-10">
            <div className=" relative ">
              <Image
                src="/images/web/login/Rectangle3.png"
                fill
                alt="=logo"
                className="!static "
              />
            </div>
          </div>

          <div className="absolute bottom-[5%]  right-[25%] z-30">
            <div className=" relative pl-6">
              <Image
                src="/images/web/login/Rectangle2.png"
                fill
                alt="=logo"
                className="!static "
              />
            </div>
          </div>
        </div>
        <div className="lg:w-[40%] w-[100%] flex items-center  lg:p-14 p-8">
          <div className="w-full">
            <div>
              <h4 className=" text-center headtext font-[900] lg:text-[2.5rem] text-[1.7rem]">
                Sign In
              </h4>
              <p className=" text-center context font-[300] lg:text-lg text-sm mt-2 lg:leading-[1rem]">
                Welcome back, busy bee! Log in now to continue your bee-autiful
                shopping journey with us
              </p>
            </div>

            <div className=" mt-12">
              <form className="w-full"
                onSubmit={handleSubmit}
              >
              <Countryinput editable={true} onCountryChange={handleCountryChange} onPhoneChange={handlePhoneChange} />

                <button className="w-[100%] mt-7 py-4  headtext font-[900] text-text-secondary bg-[#FFD012] lg:text-3xl text-xl  rounded-lg button-shadow  ">
                  Submit
                </button>
              </form>
            </div>

            <div className=" mt-12">
              <p className=" text-text-secondary text-center context font-[200] lg:text-lg text-sm  mt-2 leading-[1rem]">
                Don’t have an account <br />
                <span className="font-[700]  underline cursor-pointer">
                  <Link href={"/signup"}>Create an account here</Link>
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
