"use client";
import React from "react";
import Rectangle1Image from "../../../public/images/web/login/Rectangle 1.png";
import Rectangle2Image from "../../../public/images/web/login/Rectangle 2.png";
import Rectangle3Image from "../../../public/images/web/login/Rectangle 3.png";
import BackgroundImage from "../../../public/images/web/login/BG 2.png";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import Countryinput from "@/components/countryinput/Countryinput";

const Login = () => {
  return (
    <div className="main h-screen w-screen overflow-hidden bg-white">
      <div className="container h-full w-full flex">
        <div className="left h-full w-2/3 relative">
          <div className="superImg h-[95%] m-6  relative">
            <Image
              src={BackgroundImage}
              alt="Background Image"
              objectFit="cover"
              layout="absolute"
              className="z-0"
            />
            <Image
              src={logo}
              alt="logo"
              objectFit="cover"
              layout="absolute"
              className="z-40 absolute top-0 left-0"
              width={100}
              height={100}
            />
            <Image
              src={Rectangle1Image}
              alt="Rectangle 1 Image"
              objectFit="cover"
              className="absolute top-[21%] left-[11%] z-20"
              width={330}
              height={445}
            />
            <Image
              src={Rectangle2Image}
              alt="Rectangle 2 Image"
              objectFit="cover"
              className="absolute bottom-0 left-[45%] z-30"
              width={300}
              height={400}
            />
            <Image
              src={Rectangle3Image}
              alt="Rectangle 3 Image"
              objectFit="cover"
              className="absolute z-10 top-[4%] left-[45%]"
              width={300}
              height={411}
            />
          </div>
        </div>
        <div className="right h-full w-1/3">
          <div className="flex h-full w-full flex-col">
            <div className="topRight h-1/3 w-full">
              <div className="textHead">
                <h1 className="text-4xl font-bold text-black text-center mt-20">
                  Sign In
                </h1>
              </div>
              <div className="textDesc">
                <p className="text-lg font-normal text-black text-center mt-5">
                  Welcome back, busy bee! Log in now to continue your
                  bee-autiful shopping journey with us
                </p>
              </div>
            </div>
            <div className="middleRight h-1/3 w-[90%] flex flex-col items-center justify-center ">
              <Countryinput />
              <button
                className="headtext font-[800]  text-[1.4rem] py-3 mt-5 w-[100%] bg-[#FFD012] text-slate-900"
                onClick={() => setismodalopen(true)}
              >
                Submit
              </button>
            </div>
            <div className="bottomRight h-1/3 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
{
  /* <Image
src={Rectangle1Image}
alt="Rectangle 1 Image"
objectFit="cover"
className="absolute top-0 left-0"
width={420}
height={558}
/>
<Image
src={Rectangle2Image}
alt="Rectangle 2 Image"
objectFit="cover"
className="absolute bottom-0 right-0"
width={386}
height={484}
/>
<Image
src={Rectangle3Image}
alt="Rectangle 3 Image"
objectFit="cover"
className="absolute top-0 right-0"
width={319}
height={436}
/> */
}
