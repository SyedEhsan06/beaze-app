"use client";
import { accounttabs } from "@/utils/dummydata";
import React, { useEffect, useState } from "react";
import Accountdetails from "./Accountdetails";
import Addressdeatils from "./Addressdeatils";
import Orderdeatails from "./Orderdeatails";
import axios from "axios";

export default function Account() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`;
  const fetchDataProfile = async () => {
    console.log("fetching user data");
    console.log(localStorage.getItem("token"));
    try {
      console.log(url);
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
        setUserData(res.data.user);
        setLoading(false); 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false); // Ensure setLoading is called even in case of error
    }
  };

  useEffect(() => {
    fetchDataProfile();
  }, [
    
  ]);

  const [tabs, settabs] = useState(0);
  return (
    <div>
      <div className="w-full flex  gap-x-16">
        <div className="w-[50%]">
          <div className=" grid grid-cols-1 gap-y-4">
            {accounttabs.map((items, index) => (
              <div
                className={`w-full bg-white cursor-pointer shadow-sm border h-[90px] flex items-center px-6 rounded-[13px] transition-all duration-150 ${
                  tabs === index
                    ? "border-theme-footer-bg"
                    : "border-transparent"
                }`}
                key={index}
                onClick={() => settabs(index)}
              >
                <h5 className=" font-[800] text-2xl headtext text-text-secondary ">
                  {items.title}
                </h5>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="w-full flex gap-x-4">
              <button className="w-[50%] py-2 border headtext rounded text-text-secondary border-theme-footer-bg font-[800] text-[1.4rem]">
                Get Help
              </button>
              <button className="w-[50%] py-2 border headtext rounded border-transparent bg-theme-footer-bg text-white font-[800] text-[1.4rem]">
                Leave a Review
              </button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div>
            {tabs === 0 ? (
              <Accountdetails data={userData} />
            ) : tabs === 1 ? (
              <Addressdeatils data={userData} />
            ) : (
              <Orderdeatails data={userData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
