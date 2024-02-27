import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import cookieCutter from "cookie-cutter";
import Accounthead from "./Accounthead";
// import { useRouter } from "next/navigation";
export default function layout({ children }) {

  return (
    <div className="mt-16 bg-gray-50 lg:px-16 md:px-10 px-5 pt-16 pb-8 ">
      <Accounthead />
      <div className="md:mt-16 mt-5">{children}</div>
    </div>
  );
}
